# Button — Link Button Estilizado

> Renderiza un link/button estilizado con Material Icon, detección inteligente de clases, y múltiples modos de rendering.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `url` / `href` | `string` | `'#'` | URL del link |
| `label` | `string` | — | Texto del button |
| `icon` | `string` | `'near_me'` | Material icon |
| `target` | `string` | `'_blank'` | Target del link |
| `class` | `string` | — | Clases custom (con smart detection) |

## Slots

| Slot | Descripción |
|------|-------------|
| `default` | Usado cuando no hay `label` — contenido parseado por links |

## Modos de Rendering

1. **Con prop `label`** — `<a>` directo con icono + label
2. **Slot con links** — sin `label` y slot contiene `<a>`, cada link se clona con button styling
3. **Slot sin links** — sin `label` y sin links, envuelve contenido en `<a>`

## Smart Detection

### Tamaño

Regex: `/\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/`

Si el usuario proporciona `text-*` → el default `text-sm` se **omite**.

### Display

Regex: `/\b(flex|inline-flex|block|inline-block|grid|inline-grid|hidden)\b/`

Si el usuario proporciona display → el default `inline-flex` se **omite**.

### Position Shorthands

| Shorthand | Resultado |
|-----------|----------|
| `#left` | `flex justify-start` |
| `#center` | `flex justify-center` |
| `#right` | `flex justify-end` |

### Margin Detection

- Si clase contiene `flex`, `block`, o `grid` (pero no `inline-flex`) → `my-4`
- Si no → `my-1 mx-1`

## Clases Default del Button

```
inline-flex items-center w-fit my-1 mx-1 text-sm
px-4 py-2 rounded-xl font-bold no-underline gap-2
transition-all hover:scale-105 active:scale-95
border border-border bg-background-primary/5
hover:bg-background-primary/10 text-text-primary
```

## Limitaciones

- No anidar buttons dentro de buttons
- `url="#"` sin destino real es inútil
- Para links de navegación, usar `[text](url)` en vez de la directiva
- No duplicar clases default — la smart detection las maneja
