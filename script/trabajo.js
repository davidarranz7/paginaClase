const API_URL = "http://127.0.0.1:8000/api/resultados";

async function searchLeagues() {
    // 1. Obtener la liga seleccionada y preparar la interfaz
    const ligaSeleccionada = document.getElementById('ligaSelect').value;
    const grid = document.getElementById('leaguesGrid');
    const loader = document.getElementById('loader');

    // Mostrar el cargador y limpiar resultados anteriores
    loader.classList.remove('hidden');
    grid.innerHTML = "";

    try {
        // 2. Llamada a tu servidor FastAPI pasando la liga elegida
        const response = await fetch(`${API_URL}?liga=${ligaSeleccionada}`);
        const data = await response.json();

        loader.classList.add('hidden');

        // Manejo de errores de la API (por si la liga no está disponible)
        if (data.error) {
            grid.innerHTML = `<p class="error-msg">${data.error}</p>`;
            return;
        }

        if (!data.matches || data.matches.length === 0) {
            grid.innerHTML = "<p class='placeholder-text'>No hay resultados recientes para esta competición.</p>";
            return;
        }

        // 3. Procesar datos: Tomar los últimos 10 y darlos la vuelta (más recientes arriba)
        const ultimosDiez = data.matches.slice(-10).reverse();

        ultimosDiez.forEach(match => {
            const card = document.createElement('div');
            card.className = "match-card";

            // Si el marcador es null (no ha terminado), ponemos un guión
            const homeScore = match.score.fullTime.home !== null ? match.score.fullTime.home : "-";
            const awayScore = match.score.fullTime.away !== null ? match.score.fullTime.away : "-";

            card.innerHTML = `
                <div class="match-info">
                    ${match.competition.name} - JORNADA ${match.matchday}
                </div>
                <div class="scoreboard">
                    <div class="team">
                        <img src="${match.homeTeam.crest}" class="crest" alt="${match.homeTeam.name}">
                        <span>${match.homeTeam.shortName || match.homeTeam.name}</span>
                    </div>

                    <div class="score-box">
                        ${homeScore} - ${awayScore}
                    </div>

                    <div class="team">
                        <img src="${match.awayTeam.crest}" class="crest" alt="${match.awayTeam.name}">
                        <span>${match.awayTeam.shortName || match.awayTeam.name}</span>
                    </div>
                </div>
                <div class="match-date">
                    ${new Date(match.utcDate).toLocaleDateString()}
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        loader.classList.add('hidden');
        grid.innerHTML = "<p class='error-msg'>Error crítico: Asegúrate de que el servidor FastAPI esté encendido.</p>";
        console.error("Error en la petición:", error);
    }
}