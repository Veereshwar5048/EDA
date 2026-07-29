"""
Pydantic schemas for request/response validation.
The `password_hash` field is deliberately excluded from all response schemas.
"""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, field_validator


# ── Request Schemas ───────────────────────────────────────────────

class UserRegister(BaseModel):
    """Payload for POST /api/auth/register"""
    full_name: str
    college: str
    department: str
    year: str
    email: EmailStr
    password: str

    @field_validator("full_name", "college", "department")
    @classmethod
    def strip_and_validate(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Field cannot be empty")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        errors = []
        if len(v) < 8:
            errors.append("at least 8 characters")
        if not any(c.isupper() for c in v):
            errors.append("an uppercase letter")
        if not any(c.islower() for c in v):
            errors.append("a lowercase letter")
        if not any(c.isdigit() for c in v):
            errors.append("a number")
        if not any(not c.isalnum() for c in v):
            errors.append("a special character")
        if errors:
            raise ValueError(f"Password must contain: {', '.join(errors)}")
        return v


# ── Response Schemas ──────────────────────────────────────────────

class UserResponse(BaseModel):
    """Safe user representation — never includes password_hash."""
    id: UUID
    full_name: str
    college: str
    department: str
    year: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


class RegisterResponse(BaseModel):
    message: str
    user: UserResponse


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
