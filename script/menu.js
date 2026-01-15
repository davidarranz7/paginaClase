/**
 * Lógica para el Menú Principal - Resultados.es
 */

// 1. Actualización del Reloj en Tiempo Real
function updateClock() {
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        const now = new Date();
        // Formato de 24 horas (HH:MM:SS)
        clockElement.textContent = now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }
}

// 2. Sistema de Navegación para FastAPI
// Estas funciones coinciden con las rutas @app.get de tu main.py
function goToResultados() {
    window.location.href = '/resultados';
}

function goToClasificacion() {
    window.location.href = '/clasificacion';
}

// 3. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar el reloj inmediatamente
    updateClock();

    // Actualizar cada segundo
    setInterval(updateClock, 1000);

    console.log("Menú de Resultados.es listo.");
});