"Pydantic models"

from pydantic import BaseModel, UUID4

class UserBase(BaseModel):
    """Default schema has username added"""
    username: str
    
class UserCreate(UserBase):
    """Adds password to the default schema"""
    password: str
    phone: str
    email: str
    first_name: str
    last_name: str

class User(UserBase):
    """Finally, we add the id and active"""
    id: UUID4
    is_active: bool

    class Config:
        from_attributes = True

class UserDetails(User):
    """All relevant user details"""
    phone: str
    email: str
    first_name: str
    last_name: str