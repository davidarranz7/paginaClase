from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import requests
import uvicorn

app = FastAPI()

# 1. Configuración de archivos estáticos y plantillas
# Asegúrate de tener las carpetas: 'estatico', 'estilos' y 'script'
app.mount("/estilos", StaticFiles(directory="estilos"), name="estilos")
app.mount("/script", StaticFiles(directory="script"), name="script")
templates = Jinja2Templates(directory="estatico")

# 2. Configuración de la API de Football-Data.org
API_KEY = "382ea0f1e0dd48228b805e972f7f4f20"  # Asegúrate de que este sea tu token actual
BASE_URL = "https://api.football-data.org/v4"
HEADERS = {'X-Auth-Token': API_KEY}


# --- RUTAS DE NAVEGACIÓN (Renderizan los HTML) ---

@app.get("/", response_class=HTMLResponse)
async def read_menu(request: Request):
    return templates.TemplateResponse("menu.html", {"request": request})


@app.get("/resultados", response_class=HTMLResponse)
async def read_resultados(request: Request):
    return templates.TemplateResponse("trabajo.html", {"request": request})


@app.get("/clasificacion", response_class=HTMLResponse)
async def read_clasificacion(request: Request):
    return templates.TemplateResponse("clasificacion.html", {"request": request})


# --- RUTAS DE API (Conexión con el servidor de fútbol) ---

@app.get("/api/resultados")
def get_resultados(liga: str = "PD"):
    """
    Obtiene los últimos resultados filtrando por partidos terminados (FINISHED).
    """
    # Usamos el filtro ?status=FINISHED para obtener marcadores reales
    url = f"{BASE_URL}/competitions/{liga}/matches?status=FINISHED"
    try:
        response = requests.get(url, headers=HEADERS)
        data = response.json()

        if response.status_code != 200:
            return {"error": "Error de API", "details": data}

        return data
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/clasificacion")
def get_clasificacion(liga: str = "PD"):
    """
    Obtiene la tabla de posiciones actual de la liga seleccionada.
    """
    # El endpoint /standings es el correcto para la tabla
    url = f"{BASE_URL}/competitions/{liga}/standings"
    try:
        response = requests.get(url, headers=HEADERS)
        data = response.json()

        if response.status_code != 200:
            return {"error": "Error de API", "details": data}

        return data
    except Exception as e:
        return {"error": str(e)}
