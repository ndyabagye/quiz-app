"Quizdom main file"

from fastapi import FastAPI
from src.routers.auth_router import router as auth_router
from src.routers.user_router import router as user_router

app = FastAPI()
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(user_router, prefix="/user", tags=["user"])

@app.get("/")
def read_root():
    "Default route"
    return "Hello World"
