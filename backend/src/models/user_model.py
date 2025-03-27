"""User Database Model"""
import uuid
from sqlalchemy import Column, String, Boolean, DateTime #TIMESTAMP, text
import sqlalchemy.sql.functions as funct
from sqlalchemy.dialects.postgresql import UUID
from src.utils.database import Base

class User(Base):
    """Handles the User model data of the application"""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True),
                primary_key=True,
                nullable=False,
                index=True,
                default=uuid.uuid4
    )
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default = funct.now())
    updated_at = Column(DateTime(timezone=True), onupdate = funct.now())
