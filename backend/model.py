import io
import os
from typing import Any, Dict, List, Optional

import gdown

MODEL_PATH = "models/dermalytix_best_v2.pth"
GDRIVE_ID  = "1m9fuxZwTUDZ9fKw6xRwwM1DAzmxhWD5j"


def download_model():
    """Download model weights from Google Drive if not already present."""
    if not os.path.exists(MODEL_PATH):
        os.makedirs("models", exist_ok=True)
        print("Downloading model weights from Google Drive...")
        gdown.download(
            f"https://drive.google.com/uc?id={GDRIVE_ID}",
            MODEL_PATH,
            quiet=False,
        )
        print("Model downloaded successfully!")

NUM_CLASSES = 7
CLASS_NAMES = [
    "Acne",
    "Dark circles",
    "dark spots",
    "dry",
    "normal",
    "oily",
    "wrinkles:FINE LINES",
]
CONFIDENCE_THRESHOLD = 0.50
TOP_N_CONDITIONS = 3

LABEL_MAP = {
    "Acne": {
        "display": "Acne / Pimples / Breakouts",
        "description": "Active acne lesions including papules, pustules or comedones",
        "icon": "🔴",
    },
    "Dark circles": {
        "display": "Dark Circles / Periorbital Hyperpigmentation",
        "description": "Darkening of the skin under and around the eyes",
        "icon": "👁️",
    },
    "dark spots": {
        "display": "Dark Spots / Hyperpigmentation / Post-Acne Marks",
        "description": "Uneven skin tone, dark patches or marks left after acne or sun damage",
        "icon": "🟤",
    },
    "dry": {
        "display": "Dry Skin / Dehydrated Skin",
        "description": "Skin lacking moisture, may feel tight, flaky or rough",
        "icon": "🏜️",
    },
    "normal": {
        "display": "Normal / Balanced Skin",
        "description": "Well-balanced skin with no major concerns",
        "icon": "✨",
    },
    "oily": {
        "display": "Oily Skin / Seborrhoea",
        "description": "Excess sebum production causing shine and enlarged pores",
        "icon": "💧",
    },
    "wrinkles:FINE LINES": {
        "display": "Wrinkles / Fine Lines / Ageing Skin",
        "description": "Signs of ageing including fine lines, wrinkles and loss of elasticity",
        "icon": "〰️",
    },
}

skin_model = None
_model_loaded = False
_device_str = "cpu"


def _torch_deps():
    """Import torch/torchvision only when needed (keeps /register /login fast)."""
    import torch
    import torch.nn as nn
    import torch.nn.functional as F
    from torchvision import models, transforms

    return torch, nn, F, models, transforms


def build_model(num_classes: int = NUM_CLASSES):
    torch, nn, _F, models, _transforms = _torch_deps()
    model = models.efficientnet_b0(weights=None)
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3),
        nn.Linear(in_features, 256),
        nn.ReLU(),
        nn.Dropout(p=0.2),
        nn.Linear(256, num_classes),
    )
    return model, torch


def get_display_label(raw_class: str) -> Dict[str, str]:
    return LABEL_MAP.get(
        raw_class,
        {"display": raw_class, "description": "", "icon": "🔍"},
    )


def load_model(model_path: Optional[str] = None) -> bool:
    global skin_model, _model_loaded, _device_str

    # Auto-download weights from Google Drive if missing
    download_model()

    path = model_path or os.getenv("MODEL_PATH", MODEL_PATH)
    if not os.path.isfile(path):
        alt = [
            "./models/dermalytix_best.pth",
            "./models/dermalytix_best_v2.pth",
            MODEL_PATH,
        ]
        path = next((p for p in alt if os.path.isfile(p)), path)

    if not os.path.isfile(path):
        _model_loaded = False
        skin_model = None
        return False

    try:
        torch, _nn, _F, _models, _transforms = _torch_deps()
        _device_str = "cuda" if torch.cuda.is_available() else "cpu"
        device = torch.device(_device_str)
        checkpoint = torch.load(path, map_location=device)
        skin_model, _ = build_model(NUM_CLASSES)
        state = checkpoint.get("model_state_dict", checkpoint)
        skin_model.load_state_dict(state)
        skin_model = skin_model.to(device)
        skin_model.eval()
        _model_loaded = True
        return True
    except Exception:
        _model_loaded = False
        skin_model = None
        return False


def predict_image(
    image_bytes: bytes, top_n: int = TOP_N_CONDITIONS
) -> List[Dict[str, Any]]:
    if not _model_loaded or skin_model is None:
        raise RuntimeError(
            "Model weights not loaded. Place dermalytix_best_v2.pth in backend/models/"
        )

    torch, _nn, F, _models, transforms = _torch_deps()
    device = torch.device(_device_str)
    img_transform = transforms.Compose(
        [
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ]
    )

    from PIL import Image

    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = img_transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        output = skin_model(tensor)
        probs = F.softmax(output, dim=1)[0]

    top_probs, top_idxs = probs.topk(top_n)
    predictions = []
    for prob, idx in zip(top_probs, top_idxs):
        condition = CLASS_NAMES[idx.item()]
        confidence = prob.item()
        if confidence >= CONFIDENCE_THRESHOLD:
            label = get_display_label(condition)
            predictions.append(
                {
                    "condition": condition,
                    "display": label["display"],
                    "description": label["description"],
                    "icon": label["icon"],
                    "confidence": round(confidence, 3),
                }
            )
    return predictions


def model_status() -> Dict[str, Any]:
    return {
        "loaded": _model_loaded,
        "device": _device_str,
        "classes": NUM_CLASSES,
        "class_names": CLASS_NAMES,
    }
