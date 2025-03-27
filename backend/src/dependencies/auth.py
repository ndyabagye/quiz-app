"""Dependencies that will be used by the Auth route"""
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from src.models.users import User
from src.schemas.auth import TokenData
from src.utils.auth import verify_password
from src.utils.database import get_db, Base, engine
from src.utils.constants import SECRET_KEY, ALGORITHM

Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_user(db: Session, username: str):
    """Get current user based on username"""
    return db.query(User).filter(User.username == username).first()

def authenticate_user(db:Session, username: str, password:str):
    """Authenticate the users login"""
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    """Get current user logged in"""
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Could not validate credentials",
        headers = {"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError as exc:
        print(exc)
        raise credentials_exception from exc
    user = get_user(db, username = token_data.username)
    if user is None:
        raise credentials_exception
    return user
