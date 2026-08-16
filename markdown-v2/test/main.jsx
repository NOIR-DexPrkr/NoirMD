import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import NReditor from '../react/NReditor';

const SAMPLE = `# NReditor — Test rápido

**Bold**, *italic*, ==highlight==, %orange%texto naranja%%, !>spoiler<!, ~~tachado~~, \`inline code\` y un [link](https://example.com).

> Cita con **markdown** dentro y \`código\`.

[TOC]

## Admoniciones

:::note Nota
Contenido de nota con *markdown* y ==highlight==.
:::

:::warning Cuidado
Esto es una advertencia.
:::

:::danger Peligro
Esto es peligroso.
:::

:::info Tip
Dato útil.
:::

:::greentext OK
Todo correcto.
:::

## Cards

:::card {title="Card 1" icon="star"}
Contenido de la primera card.
:::

:::card {title="Card 2" icon="favorite"}
Contenido de la segunda card.
:::

## Interactivos

:::details {title="Expandir detalles" icon="expand_more"}
Contenido oculto que se revela al hacer clic.
:::

:::modal {title="Modal de prueba" label="Abrir modal"}
Cuerpo del modal con **markdown**.
:::

:::button {label="Botón externo" url="https://example.com" icon="near_me"}
:::

:::slide {interval="2000" speed="500"}
Primer slide
Segundo slide
Tercer slide
:::

## Tabla

| Columna A | Columna B | Columna C |
|:----------|:---------:|----------:|
| izquierda | centro    | derecha   |
| 1         | 2         | 3         |

## Código

\`\`\`ts
const greeting: string = 'Hola NoirMD';
console.log(greeting);
\`\`\`

\`\`\`js
const x = [1, 2, 3].map(n => n * 2);
console.log(x); // [2, 4, 6]
\`\`\`

## Listas

- Elemento uno
- Elemento dos
  - Subelemento A
  - Subelemento B
1. Primero
2. Segundo

## Imagen flotante

![Ejemplo](https://picsum.photos/seed/noirmd/400/300#left){300x220}

Texto alrededor de la imagen para probar el float izquierdo. \`#left\` alinea a la izquierda, \`#right\` a la derecha y \`#center\` centra.

## HTML crudo

<div style="border:1px dashed var(--color-border,#334155);padding:8px;border-radius:8px">
HTML block con **markdown** dentro.
</div>

## Raw / Custom / Style

:::div .caja-test #mi-caja
Wrapper con clase e id.
:::

:::style
<p>HTML puro dentro de <code>:::style</code>.</p>
:::
`;

const CHEATSHEET = [
  ['**negrita**', 'Bold'],
  ['*italic*', 'Italic'],
  ['==mark==', 'Highlight'],
  ['%color%text%%', 'Texto de color'],
  ['!>spoiler<!', 'Spoiler'],
  ['->centrado<-', 'Párrafo centrado'],
  ['![alt](src#left){300x200}', 'Imagen flotante'],
  ['[TOC]', 'Tabla de contenidos'],
  [':::note/warning/danger/info/greentext', 'Admonición'],
  [':::card / card-m / card-b', 'Card'],
  [':::details {title="..."}', 'Colapsable'],
  [':::modal {title="..." label="..."}', 'Modal'],
  [':::button {label="..." url="..."}', 'Botón'],
  [':::slide {interval="2000"}', 'Carrusel'],
  [':::div .cls #id', 'Wrapper'],
  [':::style / :::raw / :::custom', 'HTML crudo'],
];

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

function App() {
  const [md, setMd] = useState(SAMPLE);
  const [helpOpen, setHelpOpen] = useState(false);

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
          <button className="test-btn" onClick={() => { setMd(''); toast('Editor vacío'); }}>
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
          onGuide={() => setHelpOpen(o => !o)}
          onConfig={() => toast('Configurar: pendiente en el test')}
        />
      </main>

      <footer className="test-footer">
        Bundle local: <code>test/bundle.js</code> · regenerar con <code>npm run test:editor</code>
      </footer>

      <div className="test-help" data-open={helpOpen}>
        <div className="test-help-head">
          <span className="material-icons-round">menu_book</span> Guía rápida
          <button className="test-help-close" onClick={() => setHelpOpen(false)}>×</button>
        </div>
        <table className="test-help-table">
          <tbody>
            {CHEATSHEET.map(([syntax, desc]) => (
              <tr key={syntax}>
                <td><code>{syntax}</code></td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="toast" className="test-toast" />
    </>
  );
}

createRoot(document.getElementById('editor')).render(<App />);