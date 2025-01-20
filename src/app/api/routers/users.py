from datetime import datetime
import json
from beanie import PydanticObjectId
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from app.api.init_db import BASE_URL
from app.api.models.user import User, UserResponse, UserUpdate
from app.api.utils.hash_password.def_hash_password import hash_password
from app.api.utils.save_image import save_image
from app.api.utils.send_email import send_email

from fastapi import HTTPException, UploadFile, File, Form
from beanie import PydanticObjectId


router = APIRouter(prefix="/users", tags=["Usuarios"])


@router.get("/", response_model=list[UserResponse])
async def get_users():
    users = await User.find().to_list()
    return users


@router.get("/{user_id}/", response_model=UserResponse)
async def get_user(user_id: str):
    user = await User.find_one(User.id == PydanticObjectId(user_id))
    return user


@router.post("/", response_model=UserResponse)
async def create_user(user: str = Form(...), image: UploadFile = File(...)):
    # Convierte UserCreate a un diccionario y filtra campos desconocidos
    user_data = json.loads(user)

    user = User(**user_data)

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
    user_data["img"] = await save_image(image, folder)

    # Crea el usuario en la base de datos
    try:
        new_user = await User(**user_data).create()

        await send_email(
            destinatario=new_user.email,
            asunto="Bienvenido a la plataforma",
            mensaje=f"¡Bienvenido, {new_user.name} {new_user.last_name}! Te damos la bienvenida a la plataforma. /n Click en el siguiente enlace para activar tu cuenta: {BASE_URL}/api/users/{new_user.id}/activate/",
        )
        return new_user
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error al crear el usuario: {str(e)}"
        )


# Marcar usuario como activo
@router.patch("/{user_id}/activate/", response_model=UserResponse)
async def activate_user(user_id: str):
    try:
        user_id = PydanticObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de usuario inválido")

    # Busca el usuario en la base de datos
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Marca el usuario como activo
    user.is_active = True

    # Guarda los cambios en la base de datos
    await user.save()

    return user


@router.patch("/{user_id}/", response_model=UserResponse)
async def update_user(
    user_id: str, user: str = Form(...), image: UploadFile = File(None)
):
    # Convierte el ID del usuario a PydanticObjectId
    try:
        user_data = json.loads(user)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Datos de usuario inválidos")

    user = UserUpdate(**user_data)

    try:
        user_id = PydanticObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de usuario inválido")

    # Busca el usuario en la base de datos
    existing_user = await User.get(user_id)
    if not existing_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Actualiza solo los campos enviados
    update_data = user.dict(exclude_unset=True)  # Excluye campos no enviados
    if image:
        folder = f"users/{existing_user.email}"
        update_data["img"] = await save_image(image, folder)

    for field, value in update_data.items():
        setattr(existing_user, field, value)

    # Actualiza la fecha de modificación
    existing_user.updated_at = datetime.utcnow()

    # Guarda los cambios en la base de datos
    try:
        await existing_user.save()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error al actualizar el usuario: {str(e)}"
        )

    return existing_user


# Eliminar un usuario
@router.delete("/delete/{user_id}/")
async def delete_user(user_id: str):
    user = await User.find_one(User.id == PydanticObjectId(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await user.delete()
    return user
