# Button — Link Button Estilizado

> Renderiza un link/button estilizado con Material Icon y múltiples modos de rendering.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `url` / `href` | `string` | `'#'` | URL del link |
| `label` | `string` | — | Texto del button |
| `icon` | `string` | `'near_me'` | Material icon |
| `target` | `string` | `'_blank'` | Target del link |
| `class` | `string` | — | Clases custom (se anexan a los defaults) |

## Slots

| Slot | Descripción |
|------|-------------|
| `default` | Usado cuando no hay `label` — contenido parseado por links |

## Modos de Rendering

1. **Con prop `label`** — `<a>` directo con icono + label
2. **Slot con links** — sin `label` y slot contiene `<a>`, cada link se clona con button styling
3. **Slot sin links** — sin `label` y sin links, envuelve contenido en `<a>`

## Estilado

El button se estiliza con clases CSS propias definidas en `button.css`:

```
nr-button nr-button--default
```

El prop `class` se **anexa** después de los defaults — la última clase gana para propiedades conflictivas (override pattern estándar, sin detección especial).

## Limitaciones

- No anidar buttons dentro de buttons
- `url="#"` sin destino real es inútil
- Para links de navegación, usar `[text](url)` en vez de la directiva
