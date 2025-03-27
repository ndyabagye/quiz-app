"Auth main router with all the endpoints"

from fastapi import APIRouter, Depends
from src.dependencies.auth_dependecies import get_current_user
from src.schemas.user_schema import User
from src.models.user_model import User as UserModel

router = APIRouter()

@router.get("/me", response_model=User)
def read_users_me(current_user: UserModel = Depends(get_current_user)):
    "Read Users Me"
    return current_user
