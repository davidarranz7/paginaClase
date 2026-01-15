const API_URL = "/api/clasificacion";

async function loadStandings() {
    const liga = document.getElementById('ligaSelect').value;
    const loader = document.getElementById('loader');
    const table = document.getElementById('standingsTable');
    const tbody = document.getElementById('standingsBody');

    // 1. Resetear interfaz
    loader.classList.remove('hidden');
    table.classList.add('hidden');
    tbody.innerHTML = "";

    try {
        const response = await fetch(`${API_URL}?liga=${liga}`);
        const data = await response.json();

        loader.classList.add('hidden');

        // VALIDACIÓN DE DATOS
        if (data.error) {
            alert("Error de la API: " + (data.details?.message || "Límite de peticiones alcanzado"));
            return;
        }

        // Buscamos la tabla tipo 'TOTAL' dentro del array standings
        const totalStanding = data.standings.find(s => s.type === 'TOTAL') || data.standings[0];
        
        if (!totalStanding || !totalStanding.table) {
            alert("No se encontró la tabla de posiciones para esta liga.");
            return;
        }

        const standingsTable = totalStanding.table;

        // 2. Construir filas
        standingsTable.forEach(item => {
            let rowClass = "";
            // Colorear zonas (Champions 1-4, Descenso 18-20)
            if (item.position <= 4) rowClass = "champions";
            else if (item.position >= 18) rowClass = "relegation";

            const row = `
                <tr class="${rowClass}">
                    <td class="pos-col">${item.position}</td>
                    <td>
                        <div class="team-col">
                            <img src="${item.team.crest}" class="crest-mini" onerror="this.src='https://via.placeholder.com/24'">
                            <span>${item.team.shortName || item.team.name}</span>
                        </div>
                    </td>
                    <td>${item.playedGames}</td>
                    <td>${item.won}</td>
                    <td>${item.draw}</td>
                    <td>${item.lost}</td>
                    <td>${item.goalsFor}</td>
                    <td>${item.goalsAgainst}</td>
                    <td>${item.goalDifference}</td>
                    <td class="pts-col">${item.points}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

        table.classList.remove('hidden');

    } catch (error) {
        console.error("Error:", error);
        loader.classList.add('hidden');
        alert("Error de conexión. Revisa la consola.");
    }
}