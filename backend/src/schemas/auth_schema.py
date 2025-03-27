"Pydantic models"

from src.schemas.user_schema import BaseModel,UserBase

class UserResponse(UserBase):
    """Return after login"""
    id: int

    class Config:
        from_attributes = True
#=======TOKEN========#
class Token(BaseModel):
    """Actual Token"""
    access_token : str
    token_type: str

class TokenData(BaseModel):
    """TokenData"""
    username: str
