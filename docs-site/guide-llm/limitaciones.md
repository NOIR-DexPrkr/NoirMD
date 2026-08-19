# Limitaciones

Todo lo que NoirMD **no** hace, y los edge cases que hay que conocer antes de
usarlo en producción.

## Renderizado solo en cliente (SSR)

Los wrappers de React y Vue montan el contenido en el cliente
(`useEffect` / `onMounted`). En servidor el componente renderiza un
**placeholder vacío** que se rellena al hidratar:

- No hay renderizado a HTML string en servidor (`renderToString` no produce contenido).
- Para contenido estático indexable por SEO, renderiza en el cliente antes de emitir o usa el motor vanilla directamente.

## Modelo de confianza — contenido ejecutable

NoirMD trata el contenido como **confiable**. Estas construcciones ejecutan
código o código de la página anfitriona:

| Construcción | Efecto |
|--------------|--------|
| `:::raw` / `:::style` | HTML y CSS inyectados tal cual (el `<style>` es global, no scoped) |
| `<script>` en HTML crudo | Se ejecuta |
| `event="click: fn"` (richlist) | Resuelve `window[fn]` y la invoca en el momento del evento |

La resolución de `event` se hace desde `window` en tiempo de clic; si la
función no existe es un **no-op silencioso** (no rompe el render). No hay
sandboxing ni sanitización: **no renderices contenido de usuarios no
confiables** sin limpiarlo antes.

## CSS

- **`<style>` global**: cualquier bloque `<style>` inyecta en `<head>` y afecta a toda la página. No hay estilos scoped por directiva.
- **Layout host**: las directivas llevan su propio padding, bordes y rounded corners. No las anides dentro de contenedores `flex`/`grid` del host o se rompe el layout del padre.
- **Cards auto-batch**: los `:::card` consecutivos se agrupan en una fila `flex-wrap`. Si quieres tu propio grid, desactívalo con `batch="off"`.
- **Override pattern**: la clase del usuario se anexa después de las clases por defecto (gana la última). Evita `!important` salvo necesidad absoluta.

## Sintaxis

- **Directivas sin cerrar** (`:::type` sin su `:::` final) se renderizan como texto plano — no hay error en tiempo de parseo.
- **Slots `#name`** solo se reconocen al nivel superior de la directiva, no dentro de directivas anidadas.
- **Mezclar V1/V2**: la sintaxis vieja (args posicionales) y la nueva (props `{}`) no se combinan en la misma directiva.
- **Directivas dentro de flex/grid** del host (p.ej. `class="flex-1"`): los hijos directos con layout propio pueden quebrar; preferí containers simples.
- **Márgenes por defecto del navegador**: elementos como `<figure>` (generados por `:::diff` o galerías `:::hover-gallery`) conservan márgenes UA si no los sobreescribís — usa `margin: 1rem 0; max-width: 100%` en tu override si detectás scroll horizontal.

## Editor

- **React-only**: `NReditor` (CodeMirror 6) solo existe para React. Vue/vanilla usan el preview.
- **Debounce**: el preview se actualiza con 300ms de retraso (`debounceMs`) — no es tiempo real estricto.
- **Móvil (< 640px)**: el modo Split no está disponible; el editor fuerza modo editor.
- **Guía integrada**: requiere la prop `guide`; con `onGuide` solo obtienes el callback y debes montar tu propia guía.

## Plataforma

- **highlight.js embebido**: el resaltado de código viaja dentro del bundle de `vanilla` (sin dependencias extra), pero eso también significa que no podés swap de motor de resaltado sin re-bundlear.
- **Directivas personalizadas**: la extensión es vía `directiveRegistry` del motor vanilla (funciones DOM) — no hay un sistema de plugins con ciclo de vida.
- **No i18n**: los textos de la guía integrada y del editor están en español; no hay prop de localización.
