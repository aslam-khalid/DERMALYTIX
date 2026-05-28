# Dermalytix Backend

FastAPI backend ported from `ALL NOTEBOOKS/fastapi_backend (1).ipynb`.

## Model weights (required for `/analyze`)

Copy your trained checkpoint from Colab/Drive to:

```
backend/models/dermalytix_best_v2.pth
```

Training notebook saves `dermalytix_best.pth` under `DERMALYTIX_MODEL/` — either filename works if you update `MODEL_PATH` in `.env`.

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

| Method | Path | Auth |
|--------|------|------|
| GET | `/health` | No |
| POST | `/register` | JSON body |
| POST | `/login` | form: `username` (email), `password` |
| POST | `/analyze` | Bearer + multipart |
| GET | `/history/{user_id}` | Bearer |

## Classes (7)

Acne, Dark circles, dark spots, dry, normal, oily, wrinkles:FINE LINES
