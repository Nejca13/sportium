from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.api.init_db import init_db
from .routers.users import router as usuarios
from .routers.login import router as login
from .routers.mercadopago import router as mercado_pago


app = FastAPI()


@app.on_event("startup")
async def on_startup():
    await init_db()  # Inicializar la base de datos Beanie


app.include_router(usuarios, tags=["Usuarios"])  # Incluir el router de usuarios
app.include_router(login, tags=["Login"])
app.include_router(mercado_pago, tags=["Mercado Pago"])


app.mount("/media", StaticFiles(directory="media"), name="media")
