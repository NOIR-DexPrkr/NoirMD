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
| `icon` | `string` | `'open_in_new'` | Material icon para button |
| `class` | `string` | — | Clases button (se anexan a los defaults) |

## Rendering

- **`<dialog>` nativo** — se monta en `<body>` al abrirse y se elimina al cerrarse
- Backdrop: `rgba(0,0,0,0.6)` con blur sutil
- Popup: `border-radius: var(--nr-radius-lg)`, `max-w-3xl`, `max-h-[85vh]`
- Body scrollable
- Close button (X) en header

## Limitaciones

- No anidar modales dentro de modales
- Contenido crítico no debe estar SOLO en modales
- El contenido del modal soporta markdown completo, listas, tablas, y directivas anidadas
- El modal usa el `<dialog>` nativo del navegador — se monta en `<body>` al abrirse y se elimina al cerrarse; cada modal es independiente (sin estado compartido)
- Backdrop click y Escape cierran el dialog
