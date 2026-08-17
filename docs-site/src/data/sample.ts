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

export const HERO_SAMPLE = `# NoirMD

**Bold** · *italic* · ==highlight== · %orange%texto%%

> Cita con \`código\` y [links](https://github.com/NOIR-DexPrkr/NoirMD).

:::note Nota
Renderizado con el mismo motor que tu app.
:::

| Feature  | Valor    |
|----------|----------|
| Directivas | 16     |
| Frameworks | Todos  |

\`\`\`ts
const md = parseMarkdown(source);
\`\`\`
`;

export const CHEATSHEET: [string, string][] = [
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