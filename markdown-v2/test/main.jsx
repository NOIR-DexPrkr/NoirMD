import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import NReditor from '../react/NReditor';

const SAMPLE = `## Card — Imagen alta con scroll on hover

:::card {title="Imagen normal" icon="image" image="https://picsum.photos/400/200"}

#description
Imagen landscape — no tiene scroll.
:::

:::card {title="Imagen alta" icon="panorama" image="https://picsum.photos/400/900"}

#description
Imagen portrait — haz hover para ver la parte inferior.
:::

:::card {title="Imagen muy alta" icon="photo_size_select_large" image="https://picsum.photos/400/1200"}

#description
Scroll más largo al hacer hover.
:::

:::card-m {title="Card-M con imagen alta" icon="open_in_new" image="https://picsum.photos/400/800"}

#description
También funciona en card-m. Click abre modal.
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
          tailwindCDN
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
