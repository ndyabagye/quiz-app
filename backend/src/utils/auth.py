"""Other functions needed for authentication"""
from datetime import datetime, timedelta, timezone
from typing import Any, Dict
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy import Column
from src.utils.constants import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: Column[str]) -> bool:
    """Verify the password entered against the Hash in the DB"""
    return pwd_context.verify(plain_password, hashed_password) # type: ignore

def get_password_hash(password: str)-> str:
    """Hashes password"""
    return pwd_context.hash(password) # type: ignore

def create_access_token(data: Dict[str, Any], expires_delta: timedelta | None = None):
    """Creates the access tokens"""
    to_encode: Dict[str, Any] = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode["exp"] = expire
    encoded_jwt: str = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt
