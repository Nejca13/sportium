# Modelo para los datos del ítem
from datetime import datetime
from hmac import new
import os
from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException
import mercadopago
from pydantic import BaseModel, Field

from app.api.models.court import Court, CourtResponse
from app.api.models.reservation import (
    Reservation,
    ReservationCreate,
    ReservationResponse,
)
from app.api.models.user import User, UserCreate, UserResponse
from app.api.utils.fprint import fprint

sdk = mercadopago.SDK(os.getenv("MERCADOPAGO_ACCESS_TOKEN"))

router = APIRouter(
    prefix="/reservation",
    tags=["Reservas"],
)


# Modelo para las preferencias (opcionalmente con datos del comprador)


@router.post("/create-reservation/")
async def create_preference(reservation: ReservationCreate):
    # Crea la reserva en la base de datos (ejemplo, no implementado)
    new_reservation = reservation

    # Verifica si el usuario existe
    user = await User.get(PydanticObjectId(new_reservation.user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verifica si la cancha existe y está activa
    court = await Court.get(PydanticObjectId(new_reservation.court_id))
    if not court:
        raise HTTPException(status_code=404, detail="Court not found")
    if not court.is_active:
        raise HTTPException(status_code=400, detail="Court is not active")
    if court.price is None:
        raise HTTPException(status_code=400, detail="Court has no price")

    # Guarda la reserva inicial en la base de datos
    try:
        new_reservation = Reservation(
            user=UserResponse(
                id=user.id,
                name=user.name,
                img=user.img,
                last_name=user.last_name,
                email=user.email,
                phone_number=user.phone_number,
                preferred_sports=user.preferred_sports,
                is_active=user.is_active,
                is_verified=user.is_verified,
            ),
            court=CourtResponse(
                id=court.id,
                sport_type=court.sport_type,
                image=court.image,
                location=court.location,
                is_active=court.is_active,
                price=court.price,
                name=court.name,
            ),
            date=new_reservation.date,
            duration=new_reservation.duration,
            payment_url=None,
            status="pending",
        )
        new_reservation = await new_reservation.create()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al crear la reserva. {e}")

    # Genera preferencia de pago en Mercado Pago
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
            "id": str(new_reservation.user.id),
            "name": user.name,
            "email": user.email,
        },
        "back_urls": {
            "success": "https://tuweb.com/pago-exitoso/",
            "failure": "https://tuweb.com/pago-fallido/",
            "pending": "https://tuweb.com/pago-pendiente/",
        },
        "auto_return": "approved",
        "external_reference": str(new_reservation.id),
    }
    preference_response = sdk.preference().create(preference_data)
    if preference_response.get("status") != 201:
        raise HTTPException(status_code=400, detail="Error al crear la preferencia.")

    # URL para redirigir al usuario
    payment_url = preference_response["response"]["init_point"]

    # Actualiza el campo payment_url en la reserva y guarda los cambios
    try:
        new_reservation.payment_url = payment_url
        await new_reservation.save()  # Guarda los cambios en la base de datos
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error al actualizar la reserva. {e}"
        )

    return {"reservation": new_reservation.dict(), "payment_url": payment_url}


# Listar las reservas de un usuario
@router.get("/user/{user_id}/", response_model=list)
async def get_user_reservations(user_id: str):
    user = await User.get(PydanticObjectId(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    reservations = await Reservation.find(Reservation.user.id == user.id).to_list()
    return reservations


# Obtener una reserva específica
@router.get("/{reservation_id}/", response_model=ReservationResponse)
async def get_reservation(reservation_id: str):
    reservation = await Reservation.get(PydanticObjectId(reservation_id))
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation


# Filtrar reservas por fecha y cancha
@router.get("/filter/by-date-and-court/", response_model=list)
async def filter_reservations(date: datetime, court_id: str):
    reservations = await Reservation.find(
        Reservation.date == date,
        Reservation.court.id == PydanticObjectId(court_id),
    ).to_list()
    return reservations


# Cancelar una reserva
@router.delete("/{reservation_id}/")
async def cancel_reservation(reservation_id: str):
    reservation = await Reservation.get(PydanticObjectId(reservation_id))
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    await reservation.delete()
    return reservation
