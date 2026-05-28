# Dermalytix

AI-powered skin analysis for Pakistani users — backend (FastAPI) + frontend (Next.js 14).

## Project layout

```
Dermalytix/
├── ALL NOTEBOOKS/          # Source Jupyter notebooks
├── backend/                # FastAPI API
├── frontend/               # Next.js 14 UI
```

## Notebooks (`ALL NOTEBOOKS/`)

| Notebook | Purpose |
|----------|---------|
| `cleaning and splitting (1).ipynb` | Dataset clean, dedupe, blur filter, train/val/test split |
| `IMAGE MODEL TRAINING.ipynb` | EfficientNetB0, 7 classes, saves `dermalytix_best.pth` |
| `recommendation_engine (1).ipynb` | Pakistani product pools, severity, `merge_routines` |
| `fastapi_backend (1).ipynb` | API routes, JWT, SQLite |

## Model weights (blocker until added)

Copy from Colab/Drive to:

`backend/models/dermalytix_best_v2.pth`

Training notebook path: `DERMALYTIX_MODEL/dermalytix_best.pth`

Without weights, `/health` works but `/analyze` returns 503.

## Backend

```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

API default: `https://sandy-predator-perpetual.ngrok-free.dev`  
Override: `NEXT_PUBLIC_API_URL=http://localhost:8000`

## Pages

- `/` Landing
- `/register`, `/login`
- `/dashboard`, `/analysis/new`, `/analysis/results/[id]`, `/history`, `/analysis/mobile`
