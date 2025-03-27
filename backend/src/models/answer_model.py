"""Main answer model"""
import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
import sqlalchemy.sql.functions as funct
from sqlalchemy.dialects.postgresql import UUID
from src.utils.database import Base

class Answer(Base):
    """Answers model"""
    __tablename__ = "answers"

    id = Column(UUID(as_uuid=True), 
                primary_key=True,
                index=True,
                nullable=False,
                default=uuid.uuid4
            )
    value = Column(String)
    is_correct = Column(Boolean)
    question_id = Column(UUID(as_uuid=True), ForeignKey("questions.id"))
    created_at = Column(DateTime(timezone=True), server_default = funct.now())
    updated_at = Column(DateTime(timezone=True), onupdate = funct.now())
