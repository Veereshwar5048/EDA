"""
Event routes.

GET  /api/events/problem-statements — public list of problem statements
GET  /api/downloads/dataset         — download dataset file (protected)
GET  /api/downloads/rulebook        — download rulebook PDF (protected)
"""

import os
from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse

from app.models.user import User
from app.utils.auth import get_current_user

router = APIRouter(tags=["Events"])

# ── Static file paths — swap these files to update downloads ──────
STATIC_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "static")
DATASET_PATH = os.path.join(STATIC_DIR, "dataset.csv")
RULEBOOK_PATH = os.path.join(STATIC_DIR, "rulebook.pdf")

# ── Problem statements (mirrors frontend config) ──────────────────
PROBLEM_STATEMENTS = [
    {
        "id": 1,
        "title": "House Price Prediction",
        "category": "Regression",
        "difficulty": "Beginner",
        "description": "Predict residential property prices using structured tabular data including location, amenities, and historical trends.",
        "tags": ["Regression", "Feature Engineering", "XGBoost"],
    },
    {
        "id": 2,
        "title": "Customer Churn Prediction",
        "category": "Classification",
        "difficulty": "Intermediate",
        "description": "Build a binary classifier to identify customers likely to discontinue service, enabling proactive retention strategies.",
        "tags": ["Classification", "Imbalanced Data", "SHAP"],
    },
    {
        "id": 3,
        "title": "Fraud Detection",
        "category": "Anomaly Detection",
        "difficulty": "Advanced",
        "description": "Identify fraudulent financial transactions in a highly imbalanced dataset with strict precision requirements.",
        "tags": ["Anomaly Detection", "Ensemble", "SMOTE"],
    },
    {
        "id": 4,
        "title": "Sales Forecasting",
        "category": "Time Series",
        "difficulty": "Intermediate",
        "description": "Forecast multi-step ahead retail sales across product categories using temporal patterns and external regressors.",
        "tags": ["Time Series", "LSTM", "Prophet"],
    },
]


@router.get(
    "/api/events/problem-statements",
    summary="List all problem statements",
)
def get_problem_statements():
    """Return the list of competition problem statements (public)."""
    return {"problem_statements": PROBLEM_STATEMENTS}


@router.get(
    "/api/downloads/dataset",
    summary="Download the competition dataset",
    response_class=FileResponse,
)
def download_dataset(current_user: User = Depends(get_current_user)):
    """
    Serve the dataset file.
    Requires authentication — only registered participants can download.
    Replace `static/dataset.csv` with the real dataset file.
    """
    return FileResponse(
        path=DATASET_PATH,
        filename="xyz_dataset.csv",
        media_type="text/csv",
    )


@router.get(
    "/api/downloads/rulebook",
    summary="Download the rulebook PDF",
    response_class=FileResponse,
)
def download_rulebook(current_user: User = Depends(get_current_user)):
    """
    Serve the rulebook PDF.
    Requires authentication.
    Replace `static/rulebook.pdf` with the real PDF.
    """
    return FileResponse(
        path=RULEBOOK_PATH,
        filename="xyz_rulebook.pdf",
        media_type="application/pdf",
    )
