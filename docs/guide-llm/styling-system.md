# Styling System — Tailwind, CSS Variables, Override Pattern

> Cómo el renderer V2 integra Tailwind CSS, CSS custom properties, y el patrón de override para customización de directivas.

## Tailwind Integration

El renderer inyecta el **Tailwind Play CDN** en runtime. Cualquier clase de Tailwind funciona en contenido dinámico sin safelist.

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

## Smart Detection (Button & Modal)

| Qué | Regex | Default |
|-----|-------|---------|
| Tamaño | `/\btext-(xs\|sm\|base\|lg\|xl\|[2-9]xl)\b/` | `text-sm` |
| Display | `/\b(flex\|inline-flex\|block\|grid\|hidden)\b/` | `inline-flex` |

Si el usuario proporciona una clase que matchea, el default se **omite**.

### Position Shorthands

| Shorthand | Button | Modal |
|-----------|--------|-------|
| `#left` | `flex justify-start` | `text-left` |
| `#center` | `flex justify-center` | `text-center` |
| `#right` | `flex justify-end` | `text-right` |

## Style Prop (CSS Inline)

El prop `style` acepta un string CSS que se parsea en `React.CSSProperties` via `parseCssString()`:
- Divide por `;`
- Convierte `kebab-case` a `camelCase`
- Retorna objeto `React.CSSProperties`

## DOM Structure

```
div.nr-prose-wrapper
  └── article.nr-prose.{scopeId}
      ├── <h1>, <h2>, ... (headers)
      ├── <p> (paragraphs)
      ├── CodeBlock (code blocks)
      ├── DirectiveRenderer (directives)
      ├── RawHtmlRenderer (raw HTML)
      ├── <img> (images)
      ├── <table> (tables)
      ├── <ul>/<ol> (lists)
      ├── <blockquote> (quotes)
      ├── <hr> (horizontal rules)
      └── <nav> (TOC)
```

## Mejores Prácticas

1. **Usa clases de Tailwind** para layout, spacing, colores, y tipografía
2. **Usa CSS variables** para colores theme-aware
3. **Usa prop `class`** para customización de directivas
4. **Usa prop `style`** para estilos inline one-off
5. **Usa `<style>`** para CSS complejo (animaciones, keyframes) — inyectado globalmente
6. **Deja que la smart detection** maneje defaults de Button/Modal
7. **No dupliques** clases default en tus overrides

## ⚠️ Errores Comunes

- **`.className` shorthand no soporta bracket syntax** — usa `class="w-[100px]"` en vez de `.w-[100px]`
- **`parseHtmlAttrs` solo renombra** `class`, `for`, `tabindex` — otros atributos HTML→React NO se renombran
- **Position shorthands difieren entre Button y Modal** — Button usa `flex justify-*`, Modal usa `text-*` para el mismo `#left`/`#center`/`#right`
