from fastapi import FastAPI
from .models.usuarios import init_db
from .routers import usuarios  # Importar el router de usuarios
from .auth import auth

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_db()  # Inicializar la base de datos Beanie

app.include_router(usuarios.router, tags=["Usuarios"])  # Incluir el router de usuarios

app.include_router(auth.router, tags=["Auth"])

