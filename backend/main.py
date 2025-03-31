import uvicorn
from fastapi import FastAPI, Depends, HTTPException, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, create_user, get_user, get_email, delete_access_token, append_quiz_results, get_quiz_results
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base
from pydantic import BaseModel
#import stripe
from dotenv import load_dotenv
import aioredis
import json

load_dotenv()
redis = aioredis.from_url("redis://localhost:6379", decode_responses=True)



app = FastAPI()
#stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

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

class CurrentUser(BaseModel):
    username: str
    email: str
    password: str
    token: str
    token_expiry: str

class CompleteQuiz(BaseModel):
    username: str
    quiz_name: str
    quiz_result: str
    token: str

class OAuthEmail2PasswordRequestForm():
    def __init__(self, email: str = Form(...), password: str = Form(...)):
        self.email = email
        self.password = password
    
# class PaymentIntentRequest(BaseModel):
#     amount: int
#     currency: str = "usd"
        
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

# @app.post("/create-payment-intent")
# def create_payment_intent(request: PaymentIntentRequest):
#     try:
#         intent = stripe.PaymentIntent.create(
#             amount = request.amount,
#             currency = request.currency
#         )
#         return {"clientSecret": intent.client_secret}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail = str(e))

# register a new user
@app.post("/register/")
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if get_user(db, user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    if get_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already exists")
    
    new_user = create_user(db, user.username, user.email, user.password)

    # Cache user data in Redis (expires same as token)
    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "hashed_password": user.hashed_password,
        "access_token": user.access_token,
        "access_token_expiry": user.access_token_expiry,
        "results": user.results,
    }
    await redis.setex(f"user:{user.username}", ACCESS_TOKEN_EXPIRE_MINUTES * 60, json.dumps(user_data))
    return {"message": "User created successfully", "user": new_user.username, "access_token": user.access_token}



@app.post("/login-with-username")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    access_token, expiry = create_access_token(data={"sub": user["username"]}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    # Cache user data in Redis (expires same as token)
    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "hashed_password": user.hashed_password,
        "access_token": access_token,
        "access_token_expiry": expiry,
        "results": user.results,
    }
    await redis.setex(f"user:{user.username}", ACCESS_TOKEN_EXPIRE_MINUTES * 60, json.dumps(user_data))

    return {"message": "User logged in successfully", "access_token": access_token, "token_type": "bearer", "email": user["email"]}


@app.post("/logout")
async def logout(user: CurrentUser, db: Session = Depends(get_db)):
    delete_access_token(db, user.username, user.token)
    await redis.delete(f"user:{user.username}")
    return {"message": "User logged out successfully"}


@app.post("/login-with-email")
async def login_with_email_for_access_token(form_data: OAuthEmail2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_email(db, form_data.email)
    #return {"message": "yay"}
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect Email or password")

    access_token, expire = create_access_token(data={"sub": user.username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    
    # Cache user data in Redis (expires same as token)
    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "hashed_password": user.hashed_password,
        "access_token": access_token,
        "access_token_expiry": expire,
        "results": user.results,
    }
    await redis.setex(f"user:{user.username}", ACCESS_TOKEN_EXPIRE_MINUTES * 60, json.dumps(user_data))
    
    return {"message": "User logged in successfully", "access_token": access_token, "token_type": "bearer", "user": user.username}


@app.get("/get-stats")
async def login_with_email_for_access_token(user: CurrentUser, db: Session = Depends(get_db)):
    # Check if user results cached
    cached_user = await redis.get(f"user:{user.username}")
    if cached_user:
        cached_data = json.loads(cached_user)
        return {"message": "User results collected successfully", "results": cached_data.get("results", {})}
    results = get_quiz_results(db=db, username=user.username)
    return {"message": "User results collected successfully", "results": results}


@app.post("/complete_quiz")
async def complete_quiz(results: CompleteQuiz, db: Session = Depends(get_db)):
    append_quiz_results(db, results.username, quiz_name=results.quiz_name, quiz_results=results.quiz_result, token=results.token)
    cached_user = await redis.get(f"user:{results.username}")
    if cached_user:
        cached_data = json.loads(cached_user)
        cached_data["results"] = results
        await redis.setex(f"user:{results.username}", ACCESS_TOKEN_EXPIRE_MINUTES * 60, json.dumps(cached_data))

    return {"message": "Quiz results succesfully updated"}





if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)



