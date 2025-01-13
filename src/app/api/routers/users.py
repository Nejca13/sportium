from datetime import datetime
from fastapi import APIRouter, Form, HTTPException, UploadFile

from app.api.models.user import User, UserCreate, UserResponse
from app.api.utils.hash_password.def_hash_password import hash_password
from app.api.utils.save_image import save_image


router = APIRouter(prefix="/users", tags=["Usuarios"])


@router.get("/", response_model=list[UserResponse])
async def get_users():
    users = await User.find().to_list()
    return users


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    user = await User.find_one(User.id == user_id)
    return user


@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, image: UploadFile = Form(...)):
    # Convierte UserCreate a un diccionario y filtra campos desconocidos
    user_data = user.dict()

    # Verificar que el email no exista
    existing_user = await User.find_one(User.email == user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo electrónica ya existe")

    # Verificar que el teléfono no exista
    existing_user = await User.find_one(User.phone_number == user.phone_number)
    if existing_user:
        raise HTTPException(status_code=400, detail="El teléfono ya existe")

    # Encriptar la contraseña
    user_data["password"] = hash_password(user.password)
    user_data["created_at"] = datetime.utcnow()
    user_data["updated_at"] = datetime.utcnow()

    # Guardar la imagen en el servidor
    folder = f"users/{user_data['email']}"
    user_data["img"] = save_image(image, folder)

    # Crea el usuario en la base de datos
    try:
        new_user = await User(**user_data).create()
        return new_user
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error al crear el usuario: {str(e)}"
        )
