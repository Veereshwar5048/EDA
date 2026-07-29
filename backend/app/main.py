"""
FastAPI application entry point.

Run with:
    uvicorn app.main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.connection import engine, Base
from app.routes import auth, profile, events

# ── Create tables (if not already exists) ────────────────────────
# In production use Alembic migrations instead.
# Base.metadata.create_all(bind=engine)
# NOTE: With Supabase, tables are created via the SQL script.
#       Uncomment the line above only for local SQLite dev.


def create_app() -> FastAPI:
    """Factory function that builds and configures the FastAPI app."""

    app = FastAPI(
        title=f"{settings.EVENT_NAME} — Backend API",
        description="Authentication and event data API for the XYZ ML Prediction Challenge.",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # ── CORS ─────────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            settings.FRONTEND_URL,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Routers ──────────────────────────────────────────────────
    app.include_router(auth.router)
    app.include_router(profile.router)
    app.include_router(events.router)

    # ── Health check ─────────────────────────────────────────────
    @app.get("/health", tags=["Health"])
    def health_check():
        return {"status": "ok", "event": settings.EVENT_NAME}

    return app


app = create_app()
