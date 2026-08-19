# Configuración

NoirMD funciona **zero-config**, pero expone props y APIs para ajustar el
comportamiento del preview, el editor y el renderizado vanilla.

## Preview — Props de `NRpreviewer`

```tsx
import { NRpreviewer } from '@noirmd/previewer/react';

<NRpreviewer content="# Hola **mundo**" tailwindCDN />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — | Markdown string to render |
| `html` | `string` | — | Raw HTML string to render (when `content` is not provided) |
| `tailwindCDN` | `boolean` | `false` | Inject Tailwind CSS v4 CDN (solo si el contenido usa clases Tailwind) |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | — | Inline styles |

## Editor — `NReditor`

```tsx
import NReditor from '@noirmd/previewer/editor';
import '@noirmd/previewer/editor.css';

const [value, setValue] = useState('# Hola');

<NReditor value={value} onChange={setValue} tailwindCDN guide />;
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Markdown content |
| `onChange` | `(value: string) => void` | — | Change handler |
| `debounceMs` | `number` | `300` | Debounce del preview en ms |
| `tailwindCDN` | `boolean` | `false` | Inyecta Tailwind CDN en el preview |
| `className` | `string` | `''` | Clase adicional |
| `guide` | `boolean` | — | Muestra la guía de sintaxis integrada (se abre desde la toolbar) |
| `onGuide` | `() => void` | — | Callback al pulsar el botón "Guía" (solo cuando `guide` no está activo) |
| `onConfig` | `() => void` | — | Callback al pulsar el botón "Configurar" |

Además hereda todas las props de `ReactCodeMirrorProps` (`height`, `theme`,
`extensions`, `readOnly`, etc.).

### Modos de edición

La toolbar permite alternar entre tres modos:

| Modo | Comportamiento |
|------|----------------|
| **Editor** | Solo CodeMirror |
| **Split** | Editor y preview lado a lado (la altura la marca el editor) |
| **Preview** | Solo preview |

> En pantallas menores a 640px el modo **Split** no está disponible: el editor
> fuerza el modo editor automáticamente.

### Guía de sintaxis integrada

Con `guide` activado, el botón "Guía" de la toolbar abre un drawer con la
referencia completa de sintaxis: 31 entradas organizadas en categorías
(Markdown, Admoniciones, Componentes, Interactivos, Layout) con buscador.

La guía también puede usarse como componente independiente:

```tsx
import { Guide, guideData } from '@noirmd/previewer/react';

<Guide open={isOpen} onClose={() => setIsOpen(false)} initialDirective="note" search />;
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Abre/cierra el drawer |
| `onClose` | `() => void` | — | Callback al cerrar (Esc, overlay o botón) |
| `initialDirective` | `string` | — | Directiva preseleccionada al abrir (p.ej. `"note"`) |
| `search` | `boolean` | `true` | Muestra el buscador |

`guideData` es la lista tipada de entradas (`GuideEntry[]`) generada en build;
puedes consumirla para construir tu propia guía.

## API Vanilla

El motor vanilla es el único renderizador; los wrappers de framework lo montan:

```ts
import { renderMarkdownString, renderHtmlString, renderTokens, renderInline } from '@noirmd/previewer/vanilla';
import '@noirmd/previewer/vanilla/vanilla.css';

const el = renderMarkdownString('# Hola **mundo**');
document.getElementById('app')!.appendChild(el);
```

| Función | Descripción |
|---------|-------------|
| `renderMarkdownString(md)` | Parsea y renderiza markdown → `HTMLElement` |
| `renderHtmlString(html)` | Renderiza HTML crudo (procesa `:::`, `#slots`, etc.) → `HTMLElement` |
| `renderTokens(tokens)` | Renderiza un AST `Token[]` ya parseado → `HTMLElement` |
| `renderInline(text)` | Renderiza solo sintaxis inline → `DocumentFragment` |

## Tailwind CDN

El `tailwindCDN` prop inyecta Tailwind v4 vía CDN con **preflight desactivado**
(ref-counted, no interfiere con los estilos de NoirMD). Solo es necesario si el
**contenido markdown** usa clases Tailwind.

Para contenido que muta después del render (p.ej. JSX/HTML inyectado con clases
Tailwind nuevas):

```ts
import { scanTailwindCDN, preloadTailwindCDN } from '@noirmd/previewer/react';

preloadTailwindCDN();   // precarga opcional
scanTailwindCDN();      // tras mutaciones DOM con clases Tailwind nuevas
```

## Theming

Todo el sistema de estilos usa variables CSS: tokens `--nr-*` con fallbacks de
host `--color-*` (`--color-background-primary`, `--color-text-primary`,
`--color-accent-primary`, ...). Define las variables del host y NoirMD se
re-tintea sin tocar CSS.

`editor.css` es autónomo: toolbar, layout y buscador del editor con los mismos
fallbacks, así que se ve igual en cualquier host (incluso sin Tailwind).

> Ver [Styling System](/docs/styling-system) para la referencia completa de
> variables, Tailwind y override pattern.
