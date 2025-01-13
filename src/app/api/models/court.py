from typing import Optional
from beanie import Document
from pydantic import Field


class Court(Document):
    name: str = Field(..., description="Nombre de la cancha")
    sport_type: str = Field(
        ..., description="Tipo de deporte ('futbol', 'padel', etc.')"
    )
    location: Optional[str] = Field(None, description="Ubicación de la cancha")
    is_active: bool = Field(default=True)

    class Settings:
        name = "courts"

    class Config:
        schema_extra = {
            "example": {
                "name": "Cancha 1",
                "sport_type": "futbol",
                "location": "Av. Siempre Viva 123",
                "is_active": True,
            }
        }
