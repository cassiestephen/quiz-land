import uvicorn
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
import datetime
from datetime import timedelta
from auth import authenticate_user, create_access_token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base
from crud import create_user, get_user
from pydantic import BaseModel



app = FastAPI()

# ensure tables are created
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

# only allow frontend to access api
origins = [
    "http://localhost:5173"
]

# cors helps protect in the middle
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # allows us to send jwt tokens and such
    allow_methods=["*"], # allows all methods
    allow_headers=["*"], # allows all headers
)

@app.get("/api/message")
def get_message():
    return {"message": "Hello from FastAPI!"}


@app.post("/register/")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if get_user(db, user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = create_user(db, user.username, user.email, user.password)
    return {"message": "User created successfully", "user": new_user.username}



@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": user["username"]}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello, {current_user['full_name']}! This is a protected route."}




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)



