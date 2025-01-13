from beanie import Document
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class Reservation(Document):
    # Relación con usuario y cancha
    user_id: str = Field(..., description="ID del usuario que realiza la reserva")
    court_id: str = Field(..., description="ID de la cancha reservada")

    # Detalles de la reserva
    date: datetime = Field(..., description="Fecha y hora de la reserva")
    duration: int = Field(..., description="Duración de la reserva en minutos")
    status: str = Field(
        "pending",
        description="Estado de la reserva ('pending', 'confirmed', 'cancelled')",
    )

    # Auditoría
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default=None)

    class Settings:
        name = "reservations"  # Nombre de la colección en MongoDB

    class Config:
        schema_extra = {
            "example": {
                "user_id": "64b2f437a8d4f5c9e8a73e12",
                "court_id": "64b2f437a8d4f5c9e8a73e34",
                "date": "2025-01-14T15:00:00Z",
                "duration": 60,
                "status": "pending",
                "created_at": "2025-01-13T00:00:00Z",
            }
        }


# Modelo para creación de reservas
class ReservationCreate(BaseModel):
    user_id: str
    court_id: str
    date: datetime
    duration: int


# Modelo para actualización de reservas (por ejemplo, cambiar el estado)
class ReservationUpdate(BaseModel):
    status: Optional[str] = None
    date: Optional[datetime] = None
    duration: Optional[int] = None
