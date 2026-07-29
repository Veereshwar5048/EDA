"""
Application settings loaded from environment variables via pydantic-settings.
All sensitive values (DB URL, JWT secret) must be set in .env — never hard-coded.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── Database ──────────────────────────────────────────────
    DATABASE_URL: str  # Supabase PostgreSQL connection string

    # ── JWT ───────────────────────────────────────────────────
    SECRET_KEY: str  # Strong random secret (openssl rand -hex 32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # ── CORS ──────────────────────────────────────────────────
    FRONTEND_URL: str = "http://localhost:5173"

    # ── Event name (mirrors frontend config) ──────────────────
    EVENT_NAME: str = "XYZ"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


# Singleton — import this everywhere instead of instantiating again
settings = Settings()  # type: ignore[call-arg]
