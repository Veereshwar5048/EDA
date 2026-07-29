"""
Authentication routes: register, login.

POST /api/auth/register  — create a new user (bcrypt password hash)
POST /api/auth/login     — verify credentials, return JWT
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database.connection import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserResponse, RegisterResponse, LoginResponse
from app.utils.security import hash_password, verify_password
from app.utils.auth import create_access_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new participant",
)
def register(payload: UserRegister, db: Session = Depends(get_db)):
    """
    Register a new user.

    - Validates all fields via Pydantic (including password strength).
    - Hashes the password with bcrypt before storing.
    - Returns 409 if the email is already taken.
    """
    # Check duplicate email
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    # Hash password — NEVER store plain text
    hashed = hash_password(payload.password)

    new_user = User(
        full_name=payload.full_name,
        college=payload.college,
        department=payload.department,
        year=payload.year,
        email=payload.email,
        password_hash=hashed,
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    return RegisterResponse(
        message="Registration successful. You can now sign in.",
        user=UserResponse.model_validate(new_user),
    )


@router.post(
    "/login",
    response_model=LoginResponse,
    summary="Sign in and receive a JWT access token",
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Authenticate a user.

    Expects OAuth2 form data (username = email, password).
    Returns a Bearer JWT token on success.
    """
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": user.email})

    return LoginResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )
