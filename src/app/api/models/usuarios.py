from beanie import Document, init_beanie
from pydantic import EmailStr, BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Usuario(BaseModel):
    email: EmailStr
    password: str

class UsuarioDocument(Document, Usuario):
    class Settings:
        collection = "usuarios"

    def hash_password(self):
        self.password = pwd_context.hash(self.password)

async def init_db():
    project_name = "sportium"
    client = AsyncIOMotorClient(os.getenv("mongodb://localhost:27017"))
    await init_beanie(database=client[project_name], document_models=[UsuarioDocument])
