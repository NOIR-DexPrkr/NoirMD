import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import NReditor from '../react/NReditor';

const SAMPLE = `# Cards

# Cards

:::card {title="Card 1" icon="star"}

#description
Primera card.
:::
:::card {title="Card 2" icon="favorite"}

#description
Segunda card.
Segunda card.
Segunda card.
Segunda card.
Segunda card.
Segunda card.
:::
:::card {title="Card 3" icon="code"}

#description
Tercera card.
:::
:::card {title="Card 4" icon="bolt"}

#description
Cuarta card.
:::
:::card {title="Card 5" icon="favorite"}

#description
Quinta card.
:::
:::card {title="Card 6" icon="code"}

#description
Sexta card.
:::
:::card {title="Card 7" icon="bolt"}

#description
Séptima card.
:::
:::card {title="Card 8" icon="star"}

#description
Octava card.
:::

---

# Buttons — Align

## Default (left)

:::button {label="Izquierda" url="https://example.com" icon="arrow_back"}
:::

## Center

:::button {label="Centrado" url="https://example.com" icon="center_focus_strong" align="center"}
:::

## Right

:::button {label="Derecha" url="https://example.com" icon="arrow_forward" align="right"}
:::

---

# Modal — Align

## Default (left)

:::modal {title="Modal izquierda" label="Abrir" icon="open_in_full"}
Contenido del modal alineado a la izquierda (default).
:::

## Center

:::modal {title="Modal centrado" label="Abrir" icon="open_in_full" align="center"}
Contenido del modal centrado.
:::

## Right

:::modal {title="Modal derecha" label="Abrir" icon="open_in_full" align="right"}
Contenido del modal alineado a la derecha.
:::

`;

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

function App() {
  const [md, setMd] = useState(SAMPLE);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('noirmd-test-theme', next);
    toast('Tema: ' + next);
  };

  return (
    <>
      <header className="test-header">
        <div className="test-brand">
          <span className="material-icons-round test-logo">code</span>
          <div>
            <h1>@noirmd/previewer</h1>
            <p>Test del editor <code>NReditor</code> (CodeMirror 6 + preview vanilla)</p>
          </div>
        </div>
        <div className="test-actions">
          <button className="test-btn" onClick={() => { setMd(SAMPLE); toast('Ejemplo cargado'); }}>
            <span className="material-icons-round">description</span> Ejemplo
          </button>
          <button className="test-btn" onClick={() => { setMd(''); toast('Editor vacio'); }}>
            <span className="material-icons-round">delete_sweep</span> Limpiar
          </button>
          <button className="test-btn" onClick={toggleTheme} title="Cambiar tema">
            <span className="material-icons-round">contrast</span> Tema
          </button>
        </div>
      </header>

      <main className="test-main">
        <NReditor
          value={md}
          onChange={setMd}
          guide
          onConfig={() => toast('Configurar: pendiente en el test')}
        />
      </main>

      <footer className="test-footer">
        <span>@noirmd/previewer v2.0</span>
      </footer>

      <div id="toast" className="test-toast" />
    </>
  );
}

createRoot(document.getElementById('editor')).render(<App />);
