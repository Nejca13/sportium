from fastapi import APIRouter, HTTPException, Depends, Form
from pydantic import BaseModel, EmailStr, constr
from pymongo import MongoClient
from passlib.context import CryptContext
import jwt  
from datetime import datetime, timedelta
import os

client = MongoClient(os.getenv("MONGO_URI"))
db = client.festclub
usuarios_collection = db.usuarios

router = APIRouter(prefix="/auth", tags=["Auth"])

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Modelo para la solicitud de login
class LoginRequest(BaseModel):
    email: EmailStr
    password: constr(min_length=8)  # Contraseña debe tener mínimo 8 caracteres

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=120)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/login")
async def login(request: LoginRequest):
    usuario = usuarios_collection.find_one({"email": request.email})

    if usuario and verify_password(request.password, usuario["password"]):
        usuario["_id"] = str(usuario["_id"])
        token = create_access_token(data={"sub": usuario["_id"]})
        return {"access_token": token, "token_type": "bearer", **{k: v for k, v in usuario.items() if k != "password"}}
    else:
        raise HTTPException(status_code=400, detail="Email o Password inválido")
