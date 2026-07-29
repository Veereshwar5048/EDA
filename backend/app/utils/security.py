"""
Password hashing utilities using bcrypt via passlib.
NEVER store or log plain-text passwords.
"""

from passlib.context import CryptContext

# bcrypt is the chosen hashing algorithm — work factor ~12 rounds
_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain_password: str) -> str:
    """
    Hash a plain-text password using bcrypt.

    Returns a bcrypt hash string safe to store in the database.
    """
    return _pwd_context.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain-text password against a stored bcrypt hash.

    Returns True if the password matches, False otherwise.
    """
    return _pwd_context.verify(plain_password, hashed_password)
