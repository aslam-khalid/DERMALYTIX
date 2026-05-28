import json
import os
import uuid
from pathlib import Path

from dotenv import load_dotenv
from fastapi import (
    Depends,
    FastAPI,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from auth import create_token, get_current_user, hash_password, verify_password
from database import AnalysisSession, User, get_db, init_db
from model import (
    NUM_CLASSES,
    get_display_label,
    load_model,
    model_status,
    predict_image,
)
from recommendation import merge_routines_normalized
from schemas import RegisterRequest

load_dotenv()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)

app = FastAPI(
    title="Dermalytix API",
    description="AI-powered skin analysis for Pakistani users",
    version="1.0.0",
)

_default_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]
_cors = os.getenv("CORS_ORIGINS", "").strip()
origins = (
    _default_origins
    if not _cors or _cors == "*"
    else [o.strip() for o in _cors.split(",") if o.strip()]
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory=UPLOAD_DIR), name="images")


@app.on_event("startup")
def on_startup():
    init_db()
    # Load model in background so auth + history are responsive immediately.
    # (Model weights can be large; torch import/load can be slow on some machines.)
    try:
        import threading

        threading.Thread(target=load_model, daemon=True).start()
    except Exception:
        # If threading/model load fails, keep API running; /analyze will report model status.
        pass


@app.get("/health")
def health():
    status = model_status()
    return {
        "status": "running",
        "model": "EfficientNetB0",
        "classes": NUM_CLASSES,
        "version": "1.0.0",
        "model_loaded": status["loaded"],
    }


@app.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=req.name,
        email=req.email,
        password=hash_password(req.password),
        age=req.age,
        gender=req.gender,
        skin_type=req.skin_type,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_token({"sub": user.email})
    return {
        "message": "Account created successfully",
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id,
        "name": user.name,
    }


@app.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form.username).first()
    if not user or not verify_password(form.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token({"sub": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id,
        "name": user.name,
    }


@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    name: str = Form(...),
    age: int = Form(...),
    gender: str = Form(...),
    skin_type: str = Form(...),
    main_concern: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if image.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(
            status_code=400, detail="Only JPEG, PNG, WebP images allowed"
        )

    image_bytes = await image.read()
    if len(image_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image too large. Max 10MB")

    filename = f"{uuid.uuid4()}.jpg"
    save_path = os.path.join(UPLOAD_DIR, filename)
    with open(save_path, "wb") as f:
        f.write(image_bytes)
    image_url = f"/images/{filename}"

    try:
        predictions = predict_image(image_bytes)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e)) from e

    if not predictions:
        return {
            "session_id": None,
            "is_uncertain": True,
            "message": "No condition detected with enough confidence. Please consult a dermatologist.",
            "predictions": [],
            "routine": None,
            "see_doctor": False,
            "disclaimer": "⚠️ Not a medical diagnosis. Results are AI-generated suggestions only. Please consult a dermatologist for professional advice.",
        }

    recommendation = merge_routines_normalized(
        [{"condition": p["condition"], "confidence": p["confidence"]} for p in predictions],
        skin_type=skin_type,
    )

    primary = predictions[0]
    label_info = get_display_label(primary["condition"])
    routine = recommendation.get("routine") or {}
    see_doctor = routine.get("see_doctor", False) if routine else False

    severity = "mild"
    if recommendation.get("conditions"):
        severity = recommendation["conditions"][0].get("severity", "mild")

    session = AnalysisSession(
        user_id=current_user.id,
        image_url=image_url,
        condition=primary["condition"],
        display_label=label_info["display"],
        confidence=primary["confidence"],
        severity=severity,
        skin_type=skin_type,
        routine=json.dumps(recommendation),
        see_doctor=see_doctor,
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    return {
        "session_id": session.id,
        "user": {
            "name": name,
            "age": age,
            "gender": gender,
            "skin_type": skin_type,
            "main_concern": main_concern,
        },
        "predictions": predictions,
        "primary": {
            "condition": primary["condition"],
            "display_label": label_info["display"],
            "description": label_info["description"],
            "icon": label_info["icon"],
            "confidence": primary["confidence"],
            "severity": severity,
        },
        "routine": routine,
        "conditions": recommendation.get("conditions", []),
        "is_uncertain": recommendation.get("is_uncertain", False),
        "see_doctor": see_doctor,
        "saved_to_history": True,
        "image_url": image_url,
        "disclaimer": "⚠️ Not a medical diagnosis. Results are AI-generated suggestions only. Please consult a dermatologist for professional advice.",
    }


@app.get("/history/{user_id}")
def get_history(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Access denied")

    sessions = (
        db.query(AnalysisSession)
        .filter(AnalysisSession.user_id == user_id)
        .order_by(AnalysisSession.created_at.desc())
        .all()
    )

    return {
        "user_id": user_id,
        "total": len(sessions),
        "history": [
            {
                "session_id": s.id,
                "condition": s.condition,
                "display_label": s.display_label,
                "confidence": s.confidence,
                "severity": s.severity,
                "skin_type": s.skin_type,
                "see_doctor": s.see_doctor,
                "image_url": s.image_url,
                "created_at": s.created_at.strftime("%Y-%m-%d %H:%M"),
                "routine": json.loads(s.routine) if s.routine else None,
            }
            for s in sessions
        ],
    }
