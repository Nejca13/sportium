from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional


# Configuración de JWT
SECRET_KEY = "nXpywaitSpk43e01grdse5o8jDJjGyhQ"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 365  # 15 días

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# Crear el token de acceso
def create_access_token(
    data: dict,
    expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Función para verificar el token desde las cookies
def verify_access_token(request: Request, required_role: Optional[str] = None):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token no válido o ausente",
    )

    try:
        # Extraer el token desde las cookies
        token = request.cookies.get("access_token")
        if not token:
            raise credentials_exception

        # Decodificar el token JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if email is None or role is None:
            raise credentials_exception

        # Verificar el rol, si es requerido
        if required_role and role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para acceder a esta ruta",
            )

    except JWTError:
        raise credentials_exception

    # Retornar los datos del usuario
    return {"email": email, "role": role}
