# Styling System — Tailwind, CSS Variables, Override Pattern

> Cómo el renderer V2 integra Tailwind CSS, CSS custom properties, y el patrón de override para customización de directivas.

## Tailwind Integration

Las clases de Tailwind dentro del markdown requieren la prop `tailwindCDN` — inyecta el **CDN de Tailwind CSS v4** en runtime (ref-counted, preflight desactivado). Sin la prop, solo funcionan las clases CSS propias de NoirMD (`.nr-*`).

### Tokens de Color Disponibles

| Token | Variable CSS | Uso |
|-------|-------------|-----|
| `bg-background-primary` | `--color-background-primary` | Fondo principal |
| `bg-background-secondary-solid` | `--color-background-secondary-solid` | Fondo secundario |
| `text-text-primary` | `--color-text-primary` | Texto principal |
| `text-text-secondary` | `--color-text-secondary` | Texto secundario |
| `text-accent-primary` | `--color-accent-primary` | Color accent |
| `text-accent-hover` | `--color-accent-hover` | Accent hover |
| `border-border` | `--color-border` | Borde |
| `text-danger` | `--color-danger` | Error/peligro |
| `text-success` | `--color-success` | Éxito |
| `text-info` | `--color-info` | Información |

### Familias de Fuente

| Token | Fuente |
|-------|--------|
| `font-sans` | Inter |
| `font-serif` | Lora |
| `font-display` | Playfair Display |
| `font-slab` | Roboto Slab |
| `font-mono` | Roboto Mono |
| `font-handwriting` | Caveat |

## CSS Custom Properties

Todas las variables de color se implementan como CSS custom properties. Se actualizan automáticamente al cambiar el tema (light/dark).

**Uso en HTML/CSS:**

```html
<div style="color: var(--color-accent-primary); background: var(--color-background-secondary-solid)">
  Theme-aware styling
</div>
```

### ⚠️ Errores Comunes con CSS Variables

**NO uses `rgba()` con estas variables.** Las variables contienen valores de color completos (`hsl()`, `hex`, `color-mix()`), no componentes numéricos RGB. `rgba(var(--color-border), 0.2)` no funciona.

**Correcto:** Usa `color-mix()` o clases de Tailwind con opacity:
```css
/* ✅ color-mix */
background: color-mix(in srgb, var(--color-background-primary) 50%, transparent);
border: 1px solid color-mix(in srgb, var(--color-border) 20%, transparent);

/* ✅ Tailwind */
background: var(--color-background-primary);  /* o usa bg-background-primary/50 */
```

**Prefijo obligatorio:** Todas las variables empiezan con `--color-`. El uso de `--background-primary` (sin `color-`) falla silenciosamente.

## Override Pattern

**Cómo funciona:**
1. El componente aplica **clases default** primero
2. El prop `class` del usuario se **anexa** después de los defaults
3. CSS specificity sigue source order → **la última clase gana**

Ejemplo de resultado: `rounded-2xl mb-6 border shadow-sm p-4 border-info/20 bg-info/5 text-info bg-red-500/10 border-red-500/30 text-red-500`

Las clases rojas sobreescriben las default info porque aparecen después.

## Style Prop (CSS Inline)

El prop `style` acepta un string CSS que se parsea en un objeto de estilos vía `parseCssString()`:
- Divide por `;`
- Convierte `kebab-case` a `camelCase`
- Retorna un objeto `CSSProperties` (framework-agnostic)

## DOM Structure

```
article.nr-prose
  ├── <h1 class="md-h1">, <h2>, ... (headers)
  ├── <p class="md-p"> (paragraphs)
  ├── .nr-codeblock (code blocks)
  ├── directives (admonition, card, modal, ...)
  ├── .nr-raw-html (raw HTML)
  ├── <img class="nr-image"> (images)
  ├── .nr-table-wrap > table.nr-table (tables)
  ├── ul/ol.nr-list (lists)
  ├── blockquote.nr-blockquote (quotes)
  ├── <hr class="nr-hr"> (horizontal rules)
  └── nav.nr-toc (TOC)
```

## Mejores Prácticas

1. **Edita el CSS del paquete por archivo** — `variables.css` (tokens), `base.css` (global/reusable), y un archivo por componente (`card.css`, `modal.css`, ...). Nunca edites `vanilla.css` (solo hace `@import`)
2. **Usa CSS variables** para colores theme-aware (`--nr-*` con fallback a `--color-*` del host)
3. **Usa prop `class`** para customización de directivas
4. **Usa prop `style`** para estilos inline one-off
5. **Usa `<style>`** para CSS complejo (animaciones, keyframes) — inyectado globalmente

## ⚠️ Errores Comunes

- **`.className` shorthand no soporta bracket syntax** — usa `class="w-[100px]"` en vez de `.w-[100px]` (requiere `tailwindCDN` para resolverse)
- **`rgba(var(--nr-bg), ...)` no funciona** — las variables contienen colores completos, no componentes RGB numéricos. Usa `color-mix(in srgb, var(--nr-bg) 5%, transparent)` (todos los componentes del módulo ya lo usan)
