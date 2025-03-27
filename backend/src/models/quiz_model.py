"""This is the base quiz model"""

import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy.sql.functions as funct
from sqlalchemy.orm import relationship
from src.utils.database import Base

class Quiz(Base):
    """Base QUiz model"""
    __tablename__ = "quizzes"

    id = Column(UUID(as_uuid=True),
                primary_key=True,
                nullable=False,
                index=True,
                default=uuid.uuid4
            )
    title = Column(String)
    published = Column(Boolean)
    active = Column(Boolean, index=True, default = True)
    created_at = Column(DateTime(timezone=True), server_default = funct.now())
    updated_at = Column(DateTime(timezone=True), onupdate = funct.now())
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    questions = relationship("Question")
