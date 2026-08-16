# Modal — Dialog Popup

> Button que abre un modal dialog con contenido.

## Sintaxis

```
:::modal {title="My Modal" label="Open Modal" icon="open_in_new"}
Modal content here with **markdown** support.
:::
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | `'Modal'` | Título del dialog |
| `label` | `string` | `title` o `'Open'` | Texto del button |
| `icon` | `string` | — | Material icon para button |
| `class` | `string` | — | Clases button (con smart detection) |
| `style` | `string` | — | CSS inline |
| `id` | `string` | — | Para tracking de estado modal |

## Rendering

- **Base UI** `Dialog.Root` — portal, focus trap, a11y
- Backdrop: `bg-black/60`
- Popup: `rounded-3xl`, `max-w-3xl`, `max-h-[85vh]`
- Body scrollable
- Close button (X) en header

## Smart Detection

Mismo sistema que Button (ver [directive-button.md]):

| Detección | Regex | Default omitido |
|-----------|-------|-----------------|
| Tamaño | `/\btext-(xs\|sm\|base\|lg\|xl\|[2-9]xl)\b/` | `text-sm` |
| Display | `/\b(flex\|inline-flex\|block\|grid\|hidden)\b/` | `inline-flex` |

### Position Shorthands

| Shorthand | Resultado |
|-----------|----------|
| `#left` | `text-left` |
| `#center` | `text-center` |
| `#right` | `text-right` |

## Limitaciones

- No anidar modales dentro de modales
- Contenido crítico no debe estar SOLO en modales
- El contenido del modal soporta markdown completo, listas, tablas, y directivas anidadas
- El modal usa el `<dialog>` nativo del navegador — se monta en `<body>` al abrirse y se elimina al cerrarse; cada modal es independiente (sin estado compartido)
