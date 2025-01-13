import os
from beanie import init_beanie
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from app.api.models.court import Court
from app.api.models.reservation import Reservation
from app.api.models.user import User

load_dotenv()
BASE_URL = os.getenv("BASE_URL", "http://localhost:3000")


async def init_db():
    project_name = "sportium"
    client = AsyncIOMotorClient(os.getenv("mongodb://localhost:27017"))
    await init_beanie(
        database=client[project_name], document_models=[User, Court, Reservation]
    )
