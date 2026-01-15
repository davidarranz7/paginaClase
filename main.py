from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import requests
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montamos las carpetas de recursos
app.mount("/estilos", StaticFiles(directory="estilos"), name="estilos")
app.mount("/script", StaticFiles(directory="script"), name="script")

API_KEY = "382ea0f1e0dd48228b805e972f7f4f20"
HEADERS = {'X-Auth-Token': API_KEY}
BASE_URL = "https://api.football-data.org/v4/competitions"

# --- RUTAS DE NAVEGACIÓN ---

@app.get("/")
def read_menu():
    return FileResponse("estatico/menu.html")

@app.get("/resultados")
def read_trabajo():
    # Esta es la ruta que soluciona el 'Not Found'
    return FileResponse("estatico/trabajo.html")

@app.get("/clasificacion")
def read_standings():
    # Esta es la ruta que soluciona el 'Not Found'
    return FileResponse("estatico/clasificacion.html")

# --- RUTAS DE API ---

@app.get("/api/resultados")
def get_resultados(liga: str = "PD"):
    url = f"{BASE_URL}/{liga}/matches?status=FINISHED"
    response = requests.get(url, headers=HEADERS)
    return response.json()

@app.get("/api/clasificacion")
def get_clasificacion(liga: str = "PD"):
    url = f"{BASE_URL}/{liga}/standings"
    response = requests.get(url, headers=HEADERS)
    return response.json()