# Guía de markdown

Referencia rápida de la sintaxis de NoirMD. Todo lo que escribas en el editor del sitio se renderiza con el mismo motor que usarás en tu proyecto.

## Sintaxis inline

| Sintaxis | Resultado |
|----------|-----------|
| `**texto**` | **Bold** |
| `*texto*` | *Italic* |
| `***texto***` | ***Bold + Italic*** |
| `_texto_` | *Italic* (solo subrayado simple; `*texto*` ya es italic) |
| `~~texto~~` | ~~Tachado~~ |
| `` `codigo` `` | `Código inline` |
| `==texto==` | ==Highlight== |
| `%color%texto%%` | Texto de color (ej. `%red%peligro%%`, `%#00e6a8%verde%%`) |
| `!~color;style;texto~!` | Decoración de texto (underline, overline, etc.) |
| `!>texto<!` | Spoiler (oculto hasta hover) |
| `[texto](url)` | Link (abre en pestaña nueva) |
| `\|[[icon-name]]\|` | Icono Material (ej. `\|[[star]]\|`) |
| `->texto<-` / `->texto->` | Párrafo centrado / alineado a la derecha |
| `<html>` | HTML crudo inline |

## Bloques

| Elemento | Sintaxis |
|----------|----------|
| Títulos | `# H1` … `###### H6` (con alineación y atributos) |
| Código | Triple backtick con lenguaje y título opcional |
| Tablas | `\| col \| col \|` con alineación `:---`, `:---:`, `---:` |
| Listas | Ordenadas y desordenadas, con anidación |
| Citas | `> texto` |
| Imágenes | `![alt](src#left\|right\|center){w:h}` — float con `#` |
| HTML | `<tag>...</tag>` (anidado, contenido parseado como markdown) |
| TOC | `[TOC]` o `[TOC2]` (tabla de contenidos) |
| Separador | `---` |

## Directivas

Las directivas usan la sintaxis `:::tipo {props} ... :::`. Soportan shorthands: `.clase` → `class`, `#id` → `id`, y texto tras el tipo como título corto (`:::note Título`).

### Admoniciones

`:::note`, `:::info`, `:::warning`, `:::danger`, `:::greentext`

```markdown
:::warning Cuidado
Esto es una advertencia.
:::
```

### Cards

`:::card` (estática), `:::card-m` (abre modal), `:::card-b` (enlaza a URL). Cards consecutivas se agrupan en grid automáticamente (`batch="off"` para desactivar).

```markdown
:::card {title="Título" icon="star" image="/img.png"}
#description
Descripción corta.
:::
```

### Interactivos

| Directiva | Uso |
|-----------|-----|
| `:::details {title="..." defaultOpen="true"}` | Colapsable |
| `:::modal {title="..." label="Abrir"}` | Modal (dialog nativo) |
| `:::button {label="..." url="..."}` | Botón link |
| `:::slide {interval="3000" speed="500"}` | Carrusel de texto (una línea por slide) |

### Layout y HTML

`:::div`, `:::style`, `:::custom`, `:::raw` — wrappers con clase/id, estilos y HTML crudo.

### Slots

Las directivas dividen su contenido en regiones nombradas con `#nombre` (solo a profundidad 0):

```markdown
:::card
Contenido default.

#footer
Pie de la card.
:::
```

## Estilos

- **Tema**: el renderer usa tokens `--nr-*` con fallbacks `--color-*` — define tus propios `--color-*` en el host para tematizar todo.
- **Tailwind**: clases Tailwind dentro del markdown requieren la prop `tailwindCDN` (CDN lazy, preflight desactivado).
- **Override**: `class` y `style` se añaden después de los defaults (last wins).

## Docs profundos

| Tema | Guía |
|------|------|
| Parser y AST | [parser.md](/docs/parser) |
| Inline completo | [inline-syntax.md](/docs/inline-syntax) |
| Bloques | [block-syntax.md](/docs/block-syntax) |
| Directivas en detalle | [directives-general.md](/docs/directives-general) |
| HTML crudo | [html-raw.md](/docs/html-raw) |
| Styling | [styling-system.md](/docs/styling-system) |
| Buenas prácticas | [best-practices.md](/docs/best-practices) |