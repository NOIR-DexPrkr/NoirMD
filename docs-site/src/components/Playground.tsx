import { useState } from 'react';
import NReditor from '@noirmd/previewer/editor';
import clsx from 'clsx';

export const SAMPLE = `# Bienvenido a NoirMD

**Bold**, *italic*, ==highlight==, %orange%texto naranja%%, !>spoiler<!, ~~tachado~~, \`inline code\` y un [link](https://github.com/NOIR-DexPrkr/NoirMD).

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

:::button {label="Botón externo" url="https://github.com/NOIR-DexPrkr/NoirMD" icon="near_me"}
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

## Wrappers

:::div .caja-test #mi-caja
Wrapper con clase e id.
:::

:::style
<p>HTML puro dentro de <code>:::style</code>.</p>
:::
`;

const CHEATSHEET: [string, string][] = [
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

const Playground: React.FC = () => {
  const [md, setMd] = useState(SAMPLE);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="nr-glass-soft rounded-3xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 flex-wrap">
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Playground en vivo
          </span>
          <div className="flex-1" />
          <button
            onClick={() => { setMd(SAMPLE); }}
            className="btn btn-xs btn-ghost border border-white/10 rounded-lg text-[10px] gap-1.5 text-white/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
          >
            Ejemplo
          </button>
          <button
            onClick={() => { setMd(''); }}
            className="btn btn-xs btn-ghost border border-white/10 rounded-lg text-[10px] gap-1.5 text-white/50 hover:bg-error/10 hover:text-error hover:border-error/30 transition-all"
          >
            Limpiar
          </button>
          <button
            onClick={() => setHelpOpen(o => !o)}
            className={clsx(
              'btn btn-xs btn-ghost border rounded-lg text-[10px] gap-1.5 transition-all',
              helpOpen
                ? 'bg-info/10 text-info border-info/30'
                : 'border-white/10 text-white/50 hover:bg-info/10 hover:text-info hover:border-info/30'
            )}
          >
            Guía rápida
          </button>
        </div>

        <NReditor value={md} onChange={setMd} onGuide={() => setHelpOpen(o => !o)} />
      </div>

      {helpOpen && (
        <div className="nr-fade-in nr-glass rounded-3xl p-5">
          <div className="flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px] text-base-content mb-3">
            <span className="material-icons-round text-[14px] text-info">menu_book</span> Guía rápida de sintaxis
          </div>
          <div className="overflow-x-auto">
            <table className="table table-sm w-full text-[12px]">
              <tbody>
                {CHEATSHEET.map(([syntax, desc]) => (
                  <tr key={syntax}>
                    <td className="font-mono text-primary/80 whitespace-nowrap"><code>{syntax}</code></td>
                    <td className="text-white/60">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playground;