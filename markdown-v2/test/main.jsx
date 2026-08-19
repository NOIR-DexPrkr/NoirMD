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

## Nuevos componentes (daisyUI)

### Teclas

:::keys {size="md"}
CTRL + SHIFT + DEL
:::

:::keys {size="sm"}
ALT + F4
:::

### Acordeón (anidado)

:::accordion {mode="radio"}
:::accordion-item {title="How do I create an account?" checked="true"}
Click the "Sign Up" button in the top right corner and follow the registration process.

:::note Tip
Puedes anidar **otros directives** dentro de un item del acordeón.
:::
:::
:::accordion-item {title="I forgot my password. What should I do?"}
Click on "Forgot Password" on the login page and follow the instructions sent to your email.
:::
:::accordion-item {title="How do I update my profile information?"}
Go to "My Account" settings and select "Edit Profile" to make changes.
:::
:::

### Carrusel

:::carousel {height="320px"}
![Slide 1](https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp)
![Slide 2](https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp)
![Slide 3](https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp)
:::

Carrusel flotante con ancho y aspect personalizado:

:::carousel {aspect="4/3" width="420px" float="right"}
![A](https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp)
![B](https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp)
:::

### Cuenta regresiva

Estática:

:::countdown {days="15" hours="10" min="24" sec="59"}
:::

Live hasta fin de año:

:::countdown {target="2026-12-31T23:59:59" labels="días|horas|min|seg"}
:::

### Comparador de imágenes

Arrastra el control del centro (o usa las flechas del teclado) para comparar. Acepta URLs en las props o dos imágenes markdown:

:::diff {width="440px" aspect="4/3" float="left"}
![Antes](https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp)
![Después](https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp)
:::

### Imagen 3D

:::hover-3d
<figure>
  <img src="https://img.daisyui.com/images/stock/creditcard.webp" alt="Tarjeta 3D" />
</figure>
:::

### Galería hover

:::hover-gallery {aspect="16/9"}
![Gorra 1](https://img.daisyui.com/images/stock/daisyui-hat-1.webp)
![Gorra 2](https://img.daisyui.com/images/stock/daisyui-hat-2.webp)
![Gorra 3](https://img.daisyui.com/images/stock/daisyui-hat-3.webp)
![Gorra 4](https://img.daisyui.com/images/stock/daisyui-hat-4.webp)
:::

### Chat (anidado)

:::chat
:::chat-item {side="start" name="Obi-Wan Kenobi" time="12:45" avatar="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" footer="Delivered"}
You were the **Chosen One**!
:::
:::chat-item {side="end" name="Anakin" time="12:46" avatar="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" color="primary" footer="Seen at 12:46"}
I hate you!
:::
:::chat-item {side="start" name="Obi-Wan Kenobi" time="12:47" avatar="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" color="error"}
You were supposed to destroy the Sith, not join them!
:::
:::

### Lista enriquecida (anidado)

Haz clic en los altavoces: todos ejecutan la misma función global y suenan.

:::richlist
:::richlist-item {title="Dio Lupa" subtitle="Remaining Reason" image="https://img.daisyui.com/images/profile/demo/1@94.webp" icon="volume_up" event="click: playClickSound" icon2="volume_up" event2="click: playClickSound"}
"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth.
:::
:::richlist-item {title="Ellie Beilish" subtitle="Bears of a fever" image="https://img.daisyui.com/images/profile/demo/4@94.webp" icon="volume_up" event="click: playClickSound" icon2="volume_up" event2="click: playClickSound"}
"Bears of a Fever" captivated audiences with its intense energy and mysterious lyrics.
:::
:::richlist-item {title="Sabrino Gardener" subtitle="Cappuccino" image="https://img.daisyui.com/images/profile/demo/3@94.webp" icon="volume_up" event="click: playClickSound" icon2="volume_up" event2="click: playClickSound"}
"Cappuccino" quickly gained attention for its smooth melody and relatable themes.
:::
:::

### Estadísticas (auto-batch)

:::stat {title="Total Likes" value="25.6K" desc="21% more than last month" icon="favorite" color="primary"}
:::
:::stat {title="Page Views" value="2.6M" desc="21% more than last month" icon="bolt" color="secondary"}
:::
:::stat {title="Tasks done" value="86%" desc="31 tasks remaining" icon="task_alt" color="success"}
:::
`;

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

window.playClickSound = function () {
  try {
    const w = window;
    w.__noirmdAudioCtx = w.__noirmdAudioCtx || new (w.AudioContext || w.webkitAudioContext)();
    const ctx = w.__noirmdAudioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch {
    // audio no disponible — no hacer nada
  }
};

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
          guide
          onConfig={() => toast('Configurar: pendiente en el test')}
        />
      </main>

      <footer className="test-footer">
        Bundle local: <code>test/bundle.js</code> · regenerar con <code>npm run test:editor</code>
      </footer>

      <div id="toast" className="test-toast" />
    </>
  );
}

createRoot(document.getElementById('editor')).render(<App />);