export interface Example {
  id: string;
  title: string;
  icon: string;
  description: string;
  markdown: string;
}

export const examples: Example[] = [
  {
    id: 'admonitions',
    title: 'Admonitions',
    icon: 'info',
    description: 'Styled alert boxes: note, info, warning, danger, greentext',
    markdown: `:::note {title="Nota importante"}
Esto es una nota informativa con estilo.
:::

:::info {title="Sabías que" icon="lightbulb"}
Las admonitions soportan **markdown inline** y \`código\` dentro del contenido.
:::

:::warning {title="Cuidado"}
Esto es una advertencia. Úsala para alertar sobre algo.
:::

:::danger {title="Peligro"}
Esto es un aviso de peligro. Contenido crítico.
:::

:::greentext {title="Greentext"}
Texto con estilo verde, como en los foros clásicos.
:::`,
  },
  {
    id: 'cards',
    title: 'Cards',
    icon: 'dashboard',
    description: 'Static cards, modal cards, and link cards with slots',
    markdown: `:::card {title="Card Estática" icon="star"}
#description
Una card simple con icono y descripción.
:::

:::card-m {title="Card Modal" icon="open_in_new"}
#description
Click para abrir el modal con más contenido.
#content
## Contenido del Modal

Aquí va el contenido completo que se muestra dentro del modal.

Puede incluir **markdown completo**, listas, código, etc.
:::

:::card-b {title="Link Card" icon="link" url="https://github.com"}
#description
Click para abrir GitHub en una nueva pestaña.
:::`,
  },
  {
    id: 'inline',
    title: 'Inline Formatting',
    icon: 'format_bold',
    description: 'Bold, italic, highlight, spoiler, color, underline, icons',
    markdown: `## Formato Inline

Texto con **negrita**, _cursiva_, y ***negrita cursiva***.

También ~~tachado~~, \`código inline\`, y ==resaltado==.

Oculto con spoiler: !>esto está oculto<!

Color personalizado: %red%rojo%%, %blue%azul%%, %green%verde%%

Subrayado: !~underline~!, !~red;wavy;wavy rojo~!

Iconos: |[[arrow_forward]]| |[[star]]| |[[favorite]]|

[Link con texto](https://example.com)`,
  },
  {
    id: 'directives',
    title: 'Directives',
    icon: 'widgets',
    description: 'Details, modals, buttons, slides, wrapper divs',
    markdown: `:::details {title="Click para expandir" icon="expand_more"}
Contenido oculto que se muestra al hacer click.

Soporta **markdown** completo dentro.
:::

:::modal {title="Mi Modal" label="Abrir Modal" icon="open_in_new"}
## Contenido del Modal

Esto se renderiza dentro de un dialog modal.
:::

:::button {url="https://github.com" label="GitHub" icon="open_in_new"}
:::

:::slide {class="text-xl font-bold" interval="3000"}
Primera línea del slide
## Header rotante
**Bold** y _italic_ en slide
:::

:::div {class="p-4 rounded-xl border border-border bg-background-secondary/5"}
Wrapper genérico con clases personalizadas.
:::`,
  },
  {
    id: 'tables-lists',
    title: 'Tables & Lists',
    icon: 'table_chart',
    description: 'Pipe tables, ordered/unordered lists, blockquotes',
    markdown: `## Tablas

| Nombre | Rol | Stack |
|--------|-----|-------|
| Ana | Frontend | React, TypeScript |
| Carlos | Backend | Node, Go |
| María | Design | Figma, CSS |

## Listas

- Item con **negrita**
- Item con _cursiva_
- Item con \`código\`

1. Primero
2. Segundo
3. Tercero

## Blockquotes

> Esto es una cita con formato **negrita** y ==resaltado==.
> Múltiples líneas se unen automáticamente.`,
  },
  {
    id: 'code-html',
    title: 'Code & HTML',
    icon: 'code',
    description: 'Code blocks with syntax highlighting, raw HTML, scripts',
    markdown: `\`\`\`javascript title="ejemplo.js"
function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet("NoirMD");
\`\`\`

\`\`\`python title="ejemplo.py"
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

list(fibonacci(10))
\`\`\`

## HTML Nativo

<div class="grid grid-cols-2 gap-4 my-4">
<div class="p-4 rounded-xl bg-info/10 border border-info/20">
**Columna 1** — Markdown anidado
</div>
<div class="p-4 rounded-xl bg-success/10 border border-success/20">
**Columna 2** — Funciona directo
</div>
</div>`,
  },
];

export const defaultMarkdown = `# Welcome to NoirMD Previewer

This is a **live playground** — edit the markdown on the left and see the preview on the right.

## Features

:::note {title="Quick Start"}
Type markdown in the editor, and the preview updates in real-time.
:::

### Inline Formatting

- **Bold**, _italic_, ~~strikethrough~~
- \`Inline code\` and ==highlights==
- Links: [GitHub](https://github.com)
- Icons: |[[star]]| |[[favorite]]|

### Directives

:::info {title="Did you know?"}
You can use directives for cards, modals, admonitions, and more!
:::

### Code

\`\`\`typescript title="hello.ts"
const greeting: string = "Hello, NoirMD!";
console.log(greeting);
\`\`\`

---

Edit this text to explore the **full syntax**!`;
