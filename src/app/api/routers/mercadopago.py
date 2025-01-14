import os
from beanie import PydanticObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel, Field
import mercadopago

from app.api.models.reservation import Reservation
from app.api.utils.fprint import fprint

sdk = mercadopago.SDK(os.getenv("MERCADOPAGO_ACCESS_TOKEN"))

router = APIRouter(
    prefix="/mercadopago",
    tags=["Mercado Pago"],
)


# Modelo opcional para validar el payload del webhook
class MercadoPagoWebhook(BaseModel):
    id: str
    live_mode: bool
    type: str
    date_created: str
    application_id: str
    user_id: str
    version: str
    api_version: str
    action: str
    data: dict  # {"id": "payment_id_o_otra_data"}


@router.post("/webhook/", status_code=status.HTTP_200_OK)
async def mercado_pago_webhook(request: Request):
    try:
        # Leer el payload del webhook
        payload = await request.json()

        # Procesar el evento
        event_type = payload.get("type")  # Ejemplo: "payment", "subscription", etc.
        resource_id = payload.get("data", {}).get("id")  # ID del recurso afectado

        # Aquí manejas diferentes tipos de eventos
        if event_type == "payment":
            # Llama a la API de Mercado Pago para obtener más detalles si es necesario
            # Ejemplo: Obtener detalles del pago usando `resource_id`
            fprint(f"Pago recibido. ID: {resource_id}", color="GREEN")
            # Actualiza tu base de datos o realiza acciones necesarias

            # Solicitar el detalle del pago
            payment = sdk.payment.get(resource_id)
            if not payment:
                fprint(f"No se pudo obtener el pago. ID: {resource_id}", color="RED")
            external_reference = payment["external_reference"]
            if not external_reference:
                fprint(
                    f"No se pudo obtener la referencia externa. ID: {resource_id}",
                    color="RED",
                )

            # Buscar la reserva en la base de datos
            reservation = await Reservation.get(PydanticObjectId(external_reference))

            if reservation:
                # Actualizar el estado de la reserva en la base de datos
                reservation.status = "confirmed"
                await reservation.update()

                fprint(f"Reserva confirmada. ID: {external_reference}", color="GREEN")

            else:
                fprint(
                    f"No se encontró la reserva. ID: {external_reference}", color="RED"
                )

        else:
            fprint(f"Evento no manejado: {event_type}")

        return {"status": "success"}  # Responder 200 a Mercado Pago

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error procesando el webhook: {str(e)}",
        )
