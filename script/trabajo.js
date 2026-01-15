/**
 * Lógica para Resultados - Resultados.es
 */

const API_URL = "/api/resultados";

async function searchLeagues() {
    const liga = document.getElementById('ligaSelect').value;
    const loader = document.getElementById('loader');
    const container = document.getElementById('leaguesGrid');

    // 1. Limpiar resultados anteriores y mostrar el spinner
    container.innerHTML = "";
    loader.classList.remove('hidden');

    try {
        // Llamada a nuestro servidor FastAPI
        const response = await fetch(`${API_URL}?liga=${liga}`);
        const data = await response.json();

        loader.classList.add('hidden');

        // Manejo de errores de la API o liga vacía
        if (data.error) {
            container.innerHTML = `<p style="text-align:center; color:#ef4444;">Error: ${data.details?.message || "Límite de peticiones alcanzado"}</p>`;
            return;
        }

        if (!data.matches || data.matches.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--text-dim);">No hay resultados terminados disponibles para esta liga.</p>`;
            return;
        }

        // 2. ORDENAR: Invertimos la lista para mostrar los más RECIENTES arriba
        // Y limitamos a los últimos 30 para no saturar la página
        const partidosRecientes = data.matches.reverse().slice(0, 30);

        // 3. Renderizar cada partido
        partidosRecientes.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';

            // Formatear fecha y hora local
            const dateObj = new Date(match.utcDate);
            const matchDate = dateObj.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short'
            });
            const matchTime = dateObj.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });

            matchCard.innerHTML = `
                <div class="match-meta">${matchDate} | ${matchTime} - FINALIZADO</div>

                <div class="team home">
                    <img src="${match.homeTeam.crest}" class="crest" onerror="this.src='https://via.placeholder.com/40'">
                    <span class="team-name">${match.homeTeam.shortName || match.homeTeam.name}</span>
                </div>

                <div class="score-container">
                    <div class="score-box">
                        ${match.score.fullTime.home} : ${match.score.fullTime.away}
                    </div>
                </div>

                <div class="team away">
                    <img src="${match.awayTeam.crest}" class="crest" onerror="this.src='https://via.placeholder.com/40'">
                    <span class="team-name">${match.awayTeam.shortName || match.awayTeam.name}</span>
                </div>
            `;
            container.appendChild(matchCard);
        });

    } catch (error) {
        console.error("Error al obtener resultados:", error);
        loader.classList.add('hidden');
        container.innerHTML = `<p style="text-align:center; color:#ef4444;">Error de conexión con el servidor.</p>`;
    }
}