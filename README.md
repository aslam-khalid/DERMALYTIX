# 🧴 Dermalytix — AI-Powered Skin Analysis System

> Precision dermatology powered by AI, built for Pakistani users.

[![Live App](https://img.shields.io/badge/Live%20App-Vercel-black?style=for-the-badge&logo=vercel)](https://dermalytix.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Railway-purple?style=for-the-badge&logo=railway)](https://dermalytix-production.up.railway.app/docs)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/aslam-khalid/DERMALYTIX)

---

## 🌐 Live Application
| Service | URL |
|---|---|
| Frontend | https://dermalytix.vercel.app |
| Backend API | https://dermalytix-production.up.railway.app |
| API Docs | https://dermalytix-production.up.railway.app/docs |

---

## 📌 About
Dermalytix is an AI-powered web application that analyzes skin 
conditions from photos and provides personalized skincare routines 
using Pakistani products. Built for users who face barriers to 
accessing dermatology consultations in Pakistan.

---

## ✨ Features
- 🔍 AI skin condition detection (7 conditions)
- 📊 Confidence score + severity level (mild/moderate/severe)
- 🧴 Personalized morning + evening skincare routines
- 🇵🇰 Pakistani product recommendations (locally available)
- 📋 Patient questionnaire before analysis
- 🕒 Analysis history tracking
- 🔐 JWT authentication
- 📱 Fully responsive (mobile + desktop)

---

## 🤖 AI Model
| Property | Details |
|---|---|
| Architecture | EfficientNetB0 (pretrained ImageNet) |
| Overall Accuracy | 91.9% |
| Classes | 7 skin conditions |
| Training Images | 5,126 |
| Val/Test Images | 469 each |
| Framework | PyTorch |

### Detected Conditions
| Condition | F1 Score |
|---|---|
| Acne | 98.7% |
| Dark Circles | 92.5% |
| Dark Spots | 92.3% |
| Wrinkles / Fine Lines | 94.8% |
| Dry Skin | 85.4% |
| Normal Skin | 78.6% |
| Oily Skin | 69.6% |

---

## 🗂️ Dataset
| Stage | Images |
|---|---|
| Original | 4,386 |
| After Cleaning | 3,135 |
| After Augmentation | 6,064 |
| Per Class (balanced) | 800 |

**Download Dataset:**
https://drive.google.com/drive/folders/13ggRg8Wi3Whej7Dc38jaseVk9prKCb-1

**Download Model Weights:**
https://drive.google.com/file/d/1m9fuxZwTUDZ9fKw6xRwwM1DAzmxhWD5j

---

## 🏗️ System Architecture
User → Next.js Frontend → FastAPI Backend → EfficientNetB0 Model
→ Recommendation Engine
→ PostgreSQL Database
---

## 🛠️ Tech Stack
### Frontend
- Next.js 14
- Tailwind CSS
- Inter Font
- Recharts

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT Authentication
- PyTorch
- EfficientNetB0

### Deployment
- Frontend → Vercel
- Backend → Railway
- Database → PostgreSQL (Railway)
- Model → Google Drive (auto-download)

---

## 📁 Repository Structure
DERMALYTIX/
├── frontend/          # Next.js 14 application
│   ├── app/           # Pages and routing
│   ├── components/    # Reusable UI components
│   └── lib/           # API client and utilities
├── backend/           # FastAPI application
│   ├── main.py        # Routes and endpoints
│   ├── model.py       # EfficientNetB0 inference
│   ├── recommendation.py  # Pakistani product engine
│   ├── database.py    # PostgreSQL setup
│   ├── auth.py        # JWT authentication
│   └── schemas.py     # Pydantic models
├── All NOTEBOOKS/     # Jupyter notebooks
│   ├── 01_cleaning_augmentation_splitting.ipynb
│   ├── 02_model_training.ipynb
│   ├── 03_recommendation_engine.ipynb
│   └── 04_fastapi_backend.ipynb
└── README.md
---

## 🚀 API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Check API status |
| POST | /register | Create account |
| POST | /login | Get JWT token |
| POST | /analyze | Upload image + get results |
| GET | /history/{user_id} | Get past analyses |

---

## ⚙️ Run Locally

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
```bash
# backend/.env
DATABASE_URL=postgresql://postgres:password@localhost:5432/dermalytix
SECRET_KEY=your-secret-key

# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```
---

## ⚠️ Disclaimer
Dermalytix is not a medical diagnosis tool. Results are 
AI-generated suggestions only. Always consult a qualified 
dermatologist for professional advice.
