from fastapi import APIRouter, HTTPException

from app.api.models.user import User


router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.post("/", response_model=User)
async def create_usuario(usuario: User):
    usuario.hash_password()  # Hashear la contraseña
    existing_user = await User.find_one(User.email == usuario.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está en uso")

    await usuario.insert()
    return usuario
