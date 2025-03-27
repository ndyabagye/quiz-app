"""User Database Model"""

from sqlalchemy import Column, Integer, String, Boolean #TIMESTAMP, text
from src.utils.database import Base

class User(Base):
    """Handles the User model data of the application"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    is_active = Column(Boolean, default=True)
