# CRUD de canchas
import json
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from app.api.models.court import Court
from app.api.utils.fprint import fprint
from app.api.utils.save_image import save_image

router = APIRouter(
    prefix="/courts",
    tags=["Canchas"],
)


@router.post("/create-court/")
async def create_court(court: str = Form(...), image: UploadFile = File(...)):

    court_data = json.loads(court)

    # Guardar la imagen en el servidor
    folder = f"courts/{court_data['name']}"
    court_data["image"] = await save_image(image, folder)
    new_court = Court(**court_data)
    try:
        new_court = await new_court.create()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al crear la cancha. {e}")

    # Retornar la cancha guardada
    return new_court
