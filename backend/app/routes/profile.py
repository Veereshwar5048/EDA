"""
Profile routes.

GET /api/auth/profile — return the authenticated user's profile (no password hash)
"""

from fastapi import APIRouter, Depends

from app.models.user import User
from app.schemas.user import UserResponse
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Profile"])


@router.get(
    "/profile",
    response_model=UserResponse,
    summary="Get the current user's profile",
)
def get_profile(current_user: User = Depends(get_current_user)):
    """
    Return the authenticated user's profile.
    Requires a valid Bearer JWT token.
    Password hash is never included in the response.
    """
    return UserResponse.model_validate(current_user)
