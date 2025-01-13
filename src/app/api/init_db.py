import os
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.api.models.court import Court
from app.api.models.reservation import Reservation
from app.api.models.user import User


async def init_db():
    project_name = "sportium"
    client = AsyncIOMotorClient(os.getenv("mongodb://localhost:27017"))
    await init_beanie(
        database=client[project_name], document_models=[User, Court, Reservation]
    )
