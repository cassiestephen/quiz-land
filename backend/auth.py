from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models import User
from passlib.context import CryptContext
import aioredis
import json


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
redis = aioredis.from_url("redis://localhost:6379", decode_responses=True)

# SECRET KEY (change this in production)
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# Create jwt token
def create_access_token(db: Session, data: dict, username: str, expires_delta: Optional[timedelta] = None):
    user = get_user(db, username)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    user.access_token = token
    user.access_token_expiry = expire
    db.commit()
    db.refresh(user)
    return token, expire

async def delete_access_token(db: Session, username: str, token: str):
    # check redis first
    cached_user = await redis.get(f"user:{user.username}")
    if cached_user:
        user = json.loads(cached_user)
    else:
        user = get_user(db, username)
    if not user or user.token_expiry != token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    user.access_token = ""
    user.access_token_expiry = ""
    db.commit()
    db.refresh(user)
    return True

async def append_quiz_results(db: Session, username: str, quiz_name: str, quiz_results: str, token: str):
    # check redis first
    cached_user = await redis.get(f"user:{user.username}")
    if cached_user:
        user = json.loads(cached_user)
    else:
        user = get_user(db, username)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    if (user.token_expiry >= datetime.datetime.now() or user.token_expiry != token):
        # token has expired or is invalid, log out user
        delete_access_token(user=user, db=db)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not authenticated")

    existing_results = user.results or {}
    existing_results.update({quiz_name: quiz_results})
    user.results = existing_results
    db.commit()
    db.refresh(user)
    return True

async def get_quiz_results(db: Session, username: str):
    # check redis first
    cached_user = await redis.get(f"user:{user.username}")
    if cached_user:
        user = json.loads(cached_user)
    else:
        user = get_user(db, username)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    if (user.token_expiry >= datetime.datetime.now()):
        # token has expired, log out user
        delete_access_token(user=user, db=db)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not authenticated")
    return user.results or {}


# Get current user from jwt token
def get_current_user(db: Session, token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return get_user(db, username)
    except JWTError:
        raise credentials_exception


# Hash password
def get_password_hash(password):
    return pwd_context.hash(password)

# Create a new user
def create_user(db: Session, username: str, email: str, password: str):
    hashed_password = get_password_hash(password)
    db_user = User(username=username, email=email, hashed_password=hashed_password, 
                   access_token=create_access_token(data={"sub": username}, 
                   expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)), 
                   access_token_expiry=datetime.datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
                   results={})
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Get user by username
def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# get user by email
def get_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()