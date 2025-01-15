# CRUD de canchas
import json
from beanie import PydanticObjectId
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


@router.get("/get-courts/")
async def get_courts():
    courts = await Court.find().to_list()
    return courts


@router.get("/get-court/{court_id}/")
async def get_court(court_id: str):
    court = await Court.find_one(Court.id == PydanticObjectId(court_id))
    return court


@router.put("/update-court/{court_id}/")
async def update_court(court_id: str, court: Court):
    court = await Court.find_one(Court.id == PydanticObjectId(court_id))
    if not court:
        raise HTTPException(status_code=404, detail="Court not found")
    await court.update(court)
    return court


@router.delete("/delete-court/{court_id}/")
async def delete_court(court_id: str):
    court = await Court.find_one(Court.id == PydanticObjectId(court_id))
    if not court:
        raise HTTPException(status_code=404, detail="Court not found")
    await court.delete()
    return court


# Filtrar cancha por deporte


@router.get("/filter/by-sport-type/", response_model=list)
async def filter_courts(sport_type: str):
    courts = await Court.find(Court.sport_type == sport_type).to_list()
    return courts
