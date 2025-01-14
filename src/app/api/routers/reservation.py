# Modelo para los datos del ítem
import os
from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException
import mercadopago
from pydantic import BaseModel, Field

from app.api.models.court import Court
from app.api.models.reservation import ReservationCreate
from app.api.models.user import User
from app.api.utils.fprint import fprint

sdk = mercadopago.SDK(os.getenv("MERCADOPAGO_ACCESS_TOKEN"))

router = APIRouter(
    prefix="/reservation",
    tags=["Reservas"],
)


# Modelo para las preferencias (opcionalmente con datos del comprador)
class PreferenceRequest(BaseModel):
    item: dict
    payer_name: str = Field(None, example="Nico")
    payer_email: str = Field(None, example="nico@example.com")


@router.post("/create-reservation/")
async def create_preference(reservation: PreferenceRequest):
    # Crea la reserva en la base de datos (ejemplo, no implementado)
    new_reservation = ReservationCreate(**reservation.item)

    user = await User.get(PydanticObjectId(new_reservation.user_id))

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    court = await Court.get(PydanticObjectId(new_reservation.court_id))

    if not court:
        raise HTTPException(status_code=404, detail="Court not found")

    if not court.is_active:
        raise HTTPException(status_code=400, detail="Court is not active")

    if court.price is None:
        raise HTTPException(status_code=400, detail="Court has no price")

    # Guardar la reserva en la base de datos
    fprint(new_reservation)
    try:
        new_reservation = await new_reservation.create()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al crear la reserva. {e}")

    # Generar preferencia de pago en Mercado Pago
    preference_data = {
        "items": [
            {
                "title": court.name,
                "picture_url": court.image,
                "description": "Reserva de cancha",
                "quantity": 1,
                "unit_price": court.price,
                "currency_id": "ARS",
            }
        ],
        "payer": {
            "id": new_reservation.user_id,
            "name": user.name,
            "email": user.email,
        },
        "back_urls": {
            "success": "https://tuweb.com/pago-exitoso/",
            "failure": "https://tuweb.com/pago-fallido/",
            "pending": "https://tuweb.com/pago-pendiente/",
        },
        "auto_return": "approved",
        "external_reference": new_reservation.id,  # ID de la reserva (opcional)
    }
    preference_response = sdk.preference().create(preference_data)
    if preference_response.get("status") != 201:
        raise HTTPException(status_code=400, detail="Error al crear la preferencia.")

    # URL para redirigir al usuario
    payment_url = preference_response["response"]["init_point"]

    return {"reservation": new_reservation, "payment_url": payment_url}
