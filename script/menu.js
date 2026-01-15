function updateClock() {
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        clockElement.textContent = new Date().toLocaleTimeString('es-ES');
    }
}
setInterval(updateClock, 1000);
updateClock();

// Si prefieres usar funciones para navegar en vez de onclick directo:
function irAResultados() {
    window.location.href = '/resultados';
}

function irAClasificacion() {
    window.location.href = '/clasificacion';
}