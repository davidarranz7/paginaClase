:root {
    --bg-dark: #060b13;
    --bg-panel: #111827;
    --accent: #10b981;
    --border: #1f2937;
    --text-white: #f3f4f6;
    --text-dim: #9ca3af;
    --champions: #3b82f6;
    --descenso: #ef4444;
}

body {
    margin: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-white);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Navbar & Hero (Igual que el anterior para coherencia) */
.navbar { padding: 1rem 2rem; border-bottom: 1px solid var(--border); background: #111827; position: sticky; top: 0; z-index: 100; }
.nav-container { max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.brand span { color: var(--accent); }
.nav-menu a { color: var(--text-dim); text-decoration: none; margin: 0 15px; font-weight: 600; }
.nav-menu a.active { color: var(--accent); }
.clock-box { font-family: monospace; color: var(--accent); font-weight: bold; }

.hero { text-align: center; padding: 3rem 1rem; }
.text-gradient { background: linear-gradient(135deg, #10b981, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* Selector */
.control-panel { display: flex; max-width: 500px; margin: 0 auto; background: var(--bg-panel); border: 1px solid var(--border); border-radius: 14px; padding: 5px; }
.select-box { flex: 1; }
.custom-select { width: 100%; background: transparent; border: none; color: white; padding: 12px; font-size: 1rem; outline: none; cursor: pointer; }
.custom-select option { background: #111827; color: white; }
.btn-main { background: var(--accent); border: none; padding: 0 20px; border-radius: 10px; font-weight: 800; cursor: pointer; }

/* TABLA PROFESIONAL */
.table-wrapper {
    max-width: 1000px;
    margin: 0 auto 3rem;
    overflow-x: auto; /* Para móviles */
    background: var(--bg-panel);
    border-radius: 16px;
    border: 1px solid var(--border);
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

th {
    padding: 15px;
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-dim);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

td {
    padding: 12px 15px;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
    font-weight: 600;
}

tr:hover { background: rgba(16, 185, 129, 0.05); }

/* Estilos de posiciones */
.pos-col { width: 40px; text-align: center; font-weight: 800; }
.team-col { display: flex; align-items: center; gap: 10px; }
.crest-mini { width: 24px; height: 24px; object-fit: contain; }

/* Colores de clasificación */
.champions { border-left: 4px solid var(--champions); }
.relegation { border-left: 4px solid var(--descenso); }

.pts-col { color: var(--accent); font-weight: 800; }

.footer { padding: 2rem; text-align: center; font-size: 0.8rem; color: var(--text-dim); border-top: 1px solid var(--border); }
.hidden { display: none; }
.spinner { width: 40px; height: 40px; border: 3px solid rgba(16, 185, 129, 0.1); border-top: 3px solid var(--accent); border-radius: 50%; animation: spin 1s linear infinite; margin: 2rem auto; }
@keyframes spin { to { transform: rotate(360deg); } }