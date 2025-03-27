"""Auth Schemas"""

from pydantic import BaseModel, EmailStr, UUID4

#=========REGISTRATION========#
class RegisterSchema(BaseModel):
    """User Registration Schema"""
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    phone: str

    class Config:
        """Extra configuration options"""
        anystr_strip_whitespace = True
        min_anystr_length = 1

class RegisterResponse(BaseModel):
    """Registration response"""
    user_id: UUID4

#=========LOGIN============#
class LoginSchema(BaseModel):
    """User Login Schema"""
    username: str
    password: str

    class Config:
        """Extra configuration options"""
        anystr_strip_whitespace = True
        min_anystr_length = 1

class LoginResponse(BaseModel):
    """Login response"""
    access_token: str
    token_type: str

#=======TOKEN========#
class Token(BaseModel):
    """Actual Token"""
    access_token : str
    token_type: str

class TokenData(BaseModel):
    """TokenData"""
    username: str
