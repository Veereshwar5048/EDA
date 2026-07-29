"""
SQLAlchemy ORM model for the `users` table.
Password hashes are stored here — plain-text passwords are NEVER persisted.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, DateTime, text
from sqlalchemy.dialects.postgresql import UUID

from app.database.connection import Base


class User(Base):
    """ORM representation of the `users` table in Supabase PostgreSQL."""

    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
    )
    full_name = Column(String(255), nullable=False)
    college = Column(String(255), nullable=False)
    department = Column(String(255), nullable=False)
    year = Column(String(20), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)  # bcrypt hash — never plain text
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        server_default=text("NOW()"),
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email!r}>"
