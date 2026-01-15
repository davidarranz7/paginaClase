const API_URL = "http://127.0.0.1:8000/api/resultados";

// 1. Lógica del Reloj (Fuera de la función de búsqueda para que siempre corra)
function updateClock() {
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', { hour12: false });
        clockElement.textContent = timeString;
    }
}

// Iniciar el reloj inmediatamente y cada segundo
setInterval(updateClock, 1000);
updateClock();

// 2. Función Principal de Búsqueda
async function searchLeagues() {
    const ligaSeleccionada = document.getElementById('ligaSelect').value;
    const grid = document.getElementById('leaguesGrid');
    const loader = document.getElementById('loader');

    // Preparar interfaz
    loader.classList.remove('hidden');
    grid.innerHTML = "";

    try {
        // Petición al servidor FastAPI
        const response = await fetch(`${API_URL}?liga=${ligaSeleccionada}`);
        const data = await response.json();

        loader.classList.add('hidden');

        // Manejo de errores de la API
        if (data.error) {
            grid.innerHTML = `<p class="error-msg" style="text-align:center; width:100%; color:#ef4444;">${data.error}</p>`;
            return;
        }

        if (!data.matches || data.matches.length === 0) {
            grid.innerHTML = "<p class='placeholder-text' style='text-align:center; width:100%;'>No hay resultados recientes disponibles.</p>";
            return;
        }

        // Procesar los últimos 10 partidos (invertidos para ver los más nuevos arriba)
        const ultimosDiez = data.matches.slice(-10).reverse();

        ultimosDiez.forEach((match, index) => {
            const card = document.createElement('div');
            card.className = "match-card";
            // Añadimos una pequeña animación de entrada escalonada
            card.style.animationDelay = `${index * 0.05}s`;

            // Formatear marcador
            const homeScore = match.score.fullTime.home !== null ? match.score.fullTime.home : "-";
            const awayScore = match.score.fullTime.away !== null ? match.score.fullTime.away : "-";

            // Estructura HTML para diseño centrado y simétrico
            card.innerHTML = `
                <div class="match-meta">
                    ${match.competition.name} • JORNADA ${match.matchday}
                </div>

                <div class="team home">
                    <span class="team-name">${match.homeTeam.shortName || match.homeTeam.name}</span>
                    <img src="${match.homeTeam.crest}" class="crest" alt="Home Crest">
                </div>

                <div class="score-container">
                    <div class="score-box">${homeScore}:${awayScore}</div>
                    <div style="font-size: 0.65rem; color: #9ca3af; margin-top: 5px;">
                        ${new Date(match.utcDate).toLocaleDateString()}
                    </div>
                </div>

                <div class="team away">
                    <img src="${match.awayTeam.crest}" class="crest" alt="Away Crest">
                    <span class="team-name">${match.awayTeam.shortName || match.awayTeam.name}</span>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        loader.classList.add('hidden');
        grid.innerHTML = "<p class='error-msg' style='text-align:center; width:100%;'>Error: El servidor no responde.</p>";
        console.error("Error en la petición:", error);
    }
}