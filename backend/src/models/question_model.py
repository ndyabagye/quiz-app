"""This is the base question model"""

import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy.sql.functions as funct
from sqlalchemy.orm import relationship
from src.utils.database import Base

class Question(Base):
    """Questions model"""
    __tablename__ = "questions"

    id = Column(UUID(as_uuid=True),
                primary_key=True,
                nullable=False,
                index=True,
                default=uuid.uuid4
    )
    title = Column(String)
    type = Column(String)
    quiz_id = Column(UUID(as_uuid=True), ForeignKey("quizzes.id"))
    answers = relationship("Answer", lazy=False)
    created_at = Column(DateTime(timezone=True), server_default = funct.now())
    updated_at = Column(DateTime(timezone=True), onupdate = funct.now())
