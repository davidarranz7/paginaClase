from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Configuración de CORS para que tu navegador no bloquee la petición
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = "382ea0f1e0dd48228b805e972f7f4f20"


@app.get("/api/resultados")
def get_resultados(liga: str = "PD"):
    # La variable {liga} cambia según lo que elijas en el HTML
    url = f"https://api.football-data.org/v4/competitions/{liga}/matches?status=FINISHED"
    headers = {'X-Auth-Token': API_KEY}

    try:
        response = requests.get(url, headers=headers)
        data = response.json()

        # Si la API nos da un error (por ejemplo, liga no incluida en el plan)
        if response.status_code != 200:
            return {"error": data.get("message", "Error en la API externa")}

        return data
    except Exception as e:
        return {"error": str(e)}