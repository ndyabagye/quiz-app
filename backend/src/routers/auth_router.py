"Auth main router with all the endpoints"

#Imports from Base Python and 3rd Party Libraries
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

#Imports from Users Module
from src.schemas.user_schema import UserCreate
from src.models.user_model import User

#Imports from auth module
from src.dependencies.auth_dependecies import get_db, authenticate_user, get_user
from src.utils.auth import create_access_token, get_password_hash
from src.schemas.auth_schema import UserResponse, Token


router = APIRouter()

@router.post("/token", response_model=Token)
def login_for_success_token(form_data: OAuth2PasswordRequestForm = Depends(),
                            db: Session = Depends(get_db)):
    "Login after success"
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Incorrect Username or Password",
            headers = {"WWW-Authenticate":"Bearer"},
        )
    access_token = create_access_token(data={'sub': user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post('/signup', response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    "Signup Functionality"
    db_user = get_user(db, username = user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    print(type(user))
    db_user = User(
        **{k:v for k,v in user.model_dump().items() if k != 'password'},
        hashed_password = hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
