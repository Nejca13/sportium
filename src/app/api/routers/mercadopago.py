import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel, Field
import mercadopago

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
        else:
            fprint(f"Evento no manejado: {event_type}")

        return {"status": "success"}  # Responder 200 a Mercado Pago

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error procesando el webhook: {str(e)}",
        )


# Modelo para los datos del ítem
class Item(BaseModel):
    title: str
    description: str = Field(default="", example="Descripción del producto")
    quantity: int = Field(gt=0, example=1)
    unit_price: float = Field(gt=0, example=75.76)
    currency_id: str = Field(default="ARS", example="ARS")  # Moneda (ARS, USD, etc.)


# Modelo para las preferencias (opcionalmente con datos del comprador)
class PreferenceRequest(BaseModel):
    items: list[Item]
    payer_name: str = Field(None, example="Nico")
    payer_email: str = Field(None, example="nico@example.com")


@router.post("/create-preference/")
async def create_preference(preference_request: PreferenceRequest):
    try:
        # Construir los datos de la preferencia
        preference_data = {
            "items": [
                {
                    "title": item.title,
                    "description": item.description,
                    "quantity": item.quantity,
                    "unit_price": item.unit_price,
                    "currency_id": item.currency_id,
                }
                for item in preference_request.items
            ],
            "payer": (
                {
                    "name": preference_request.payer_name,
                    "email": preference_request.payer_email,
                }
                if preference_request.payer_name and preference_request.payer_email
                else {}
            ),
            "back_urls": {
                "success": "https://miapp.com/success",
                "failure": "https://miapp.com/failure",
                "pending": "https://miapp.com/pending",
            },
            "auto_return": "approved",
        }

        # Crear la preferencia con el SDK
        preference_response = sdk.preference().create(preference_data)
        preference = preference_response["response"]

        # Devuelve la información de la preferencia
        return {
            "id": preference["id"],
            "init_point": preference["init_point"],
            "sandbox_init_point": preference["sandbox_init_point"],
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error al crear la preferencia: {str(e)}"
        )
