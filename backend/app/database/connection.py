"""
Database connection module.
Uses SQLAlchemy to connect directly to Supabase PostgreSQL.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.config import settings


# ── Engine ──────────────────────────────────────────────────────
engine = create_engine(
    settings.DATABASE_URL,
    # Supabase uses connection pooling — keep pool_pre_ping for resilience
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

# ── Session factory ──────────────────────────────────────────────
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# ── Base class for ORM models ────────────────────────────────────
class Base(DeclarativeBase):
    pass


# ── Dependency: yield a DB session ──────────────────────────────
def get_db():
    """FastAPI dependency that provides a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
