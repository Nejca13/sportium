from fastapi import APIRouter, HTTPException
from ..models.usuarios import UsuarioDocument

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.post("/", response_model=UsuarioDocument)
async def create_usuario(usuario: UsuarioDocument):
    usuario.hash_password()  # Hashear la contraseña
    existing_user = await UsuarioDocument.find_one(UsuarioDocument.email == usuario.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está en uso")
    
    await usuario.insert()
    return usuario
