# Cards — card / card-m / card-b

> Cards display con banner de imagen opcional, popup modal, o comportamiento de link.

## Variantes

| Tipo | Comportamiento | Click | Slots |
|------|---------------|-------|-------|
| `card` | Estática | Sin interacción | `#description` |
| `card-m` | Modal | Abre dialog con `#content` | `#description` (card) + `#content` (modal) |
| `card-b` | Link button | Abre `url` en nueva pestaña | `#description` |

**Regla clave:** `:::card` y `:::card-b` solo renderizan `#description`. Solo `:::card-m` usa `#content` (aparece dentro del modal al hacer click).

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | — | Título del header |
| `image` | `string` | — | URL de imagen para banner |
| `icon` | `string` | — | Material icon para header |
| `class` | `string` | — | Clases Tailwind custom |
| `style` | `string` | — | CSS inline |
| `id` | `string` | — | ID para tracking de estado modal |
| `url` | `string` | — | URL del link (requerido para `card-b`) |
| `target` | `string` | `_blank` | Target del link |
| `batch` | `string` | — | `"off"` para desactivar grid batching |

## Rendering

- Ancho fijo: `min-w-[18rem] w-[18rem] max-w-[20rem]`
- Banner de imagen con overlay gradient
- Icono en círculo accent-tinted (`w-10 h-10 bg-accent-primary/20`)
- Hover: borde transiciona a color accent
- Card individual: banner crece a **240px** (vs 160px en grupo)

## Auto-batching

Cards consecutivas se agrupan automáticamente en `flex-wrap`. Desactivar con `batch="off"` en la **primera card** — si `batch="off"` está en la segunda o tercera card, se ignora.

**Justificación:** Las clases `justify-*` se extraen **solo del `class` de la primera card**. Si solo la segunda card tiene `justify-center`, se ignora.

**Ancho fijo:** Todas las cards miden 18rem de ancho. No hay prop para cambiarlo.

### ⚠️ NO uses grid/flex propio sobre cards

Las cards ya tienen su sistema de layout (flex-wrap automático). **No envuelvas cards en `<div class="grid ...">` o `<div class="flex ...">`** — esto rompe el auto-batching y puede causar layouts rotos.

Si necesitas un layout grid personalizado, **primero desactiva el batching** con `batch="off"` en la primera card, y luego envuelve con tu propio grid/flex.

### ⚠️ NO pongas cards dentro de hijos flex

`<div class="flex-1">:::card ... :::</div>` puede romper el layout porque la card tiene ancho fijo (18rem) que conflictea con `flex-1`.

## Interacciones

- `card-m` usa Base UI `Dialog.Root` para el modal (portal, focus trap, a11y)
- `card-b` renderiza toda la card como un `<a>` click
- `#content` solo se renderiza dentro del modal de `card-m`, no en la card misma
- `#content` puede contener markdown completo, listas, tablas, y directivas anidadas
