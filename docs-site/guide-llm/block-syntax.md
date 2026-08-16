# Block Syntax — Referencia Completa

> Todos los elementos de bloque soportados por el renderer V2.

## Headers — `# text`

Niveles 1–6. Se generan automáticamente IDs slug seguros para anclaje.

### Alineación

- `# ->Centered Title<-` — centrado
- `## ->Right Title->` — derecha

### Atributos Custom

```
## Title ##{.highlight #custom-id}
```
Produce: `<h2 id="custom-id" class="md-h2 highlight">Title</h2>`

### Clases CSS por Nivel

| Nivel | Clase | Estilos base |
|-------|-------|-------------|
| H1 | `md-h1` | `text-2xl sm:text-3xl md:text-4xl font-extrabold` |
| H2 | `md-h2` | `text-xl sm:text-2xl md:text-3xl font-bold` |
| H3 | `md-h3` | `text-lg sm:text-xl md:text-2xl font-bold` |
| H4 | `md-h4` | `text-base sm:text-lg md:text-xl font-bold` |
| H5 | `md-h5` | `text-sm sm:text-base md:text-lg font-semibold` |
| H6 | `md-h6` | `text-xs sm:text-sm md:text-base font-semibold` |

### ID Generation

1. NFD decomposition (remove accents) → 2. Lowercase → 3. Strip non-word → 4. Replace spaces with hyphens

`## Mi Encabezado con Acentos` → `id="mi-encabezado-con-acentos"`

## Paragraphs

Líneas consecutivas no vacías se unen en un solo párrafo. Líneas vacías separan párrafos.

### Hard Breaks

Una línea terminando con **2+ espacios** al final inserta un `<br>`.

### Alineación

- `-> Centered paragraph <-`
- `-> Right-aligned paragraph ->`

### Atributos Custom

```
Paragraph with classes ##{.fade-in #intro}
```

Clase CSS base: `md-p` — `text-sm sm:text-base leading-relaxed my-3`

## Code Blocks

Fenced con triple backtick. Syntax highlighting via **highlight.js**.

**Features:**
- Auto-detección de lenguaje o explícito
- Copy button auto-added, checkmark por 1.8s
- Title bar opcional con icono de archivo
- Overflow: `overflow-auto` para líneas largas
- Fallback: si el language falla, intenta `'text'`

## Tables

Pipe-delimited con fila separadora obligatoria.

**Reglas:**
- Row 0 → `<thead>` (celdas header en bold)
- Row 1 (debe contener `---`) → separador (skipped)
- Row 2+ → `<tbody>`
- Container: `overflow-x-auto` para responsive
- **⚠️ NO permitir líneas vacías** entre la fila header y el separador. Si hay una línea vacía, no se detecta como tabla.
- **Celdas vacías se filtran** — `| a || b |` produce `['a', 'b']`, no `['a', '', 'b']`

## Lists

### Desordenadas

Markers: `-`, `*`, o `+`.

### Ordenadas

```
1. First
2. Second
3. Third
```

### ⚠️ Las listas NO anidan

Este renderer no soporta nesting de listas. `  - nested item` (indentado) se trata igual que `- item`. Todos los items se renderizan al mismo nivel `<li>`. No hay `<ul>`/`<ol>` anidados.

### ⚠️ Las listas son greedy

Las listas consumen líneas vacías y líneas que empiezan con 2+ espacios debajo de ellas. Esto significa que un párrafo después de una lista puede ser consumido si tiene indentación.

### Continuación

Líneas vacías o que empiezan con 2+ espacios continúan el item actual.

## Blockquotes

Líneas consecutivas `>` se unen. Líneas vacías dentro de quotes están permitidas.

**Atributos custom:** `> Quote text ##{.special-quote #quote-1}`

## Horizontal Rules

`---`, `___`, o `***` (3+ caracteres).

## Table of Contents

`[TOC]` o `[TOC2]` — genera una lista de navegación desde **TODOS** los headers del documento, no solo desde su posición hacia abajo.

**⚠� Solo `[TOC]` y `[TOC2]` (letras mayúsculas) son válidos.** `[TOC3]`, `[toc]`, `[toc-one]` NO funcionan.

## Images

### ⚠️ Las imágenes son block-level

Una imagen en una línea con texto alrededor se separa en tokens independientes: `Text before ![alt](src) text after` produce **tres tokens**: párrafo "Text before", imagen, párrafo "text after". La imagen NO es inline dentro del párrafo.

### Posicionamiento

| Modificador | Efecto CSS |
|-------------|-----------|
| `#left` | `float: left; margin: 0 1em 1em 0` |
| `#right` | `float: right; margin: 0 0 1em 1em` |
| `#center` | `display: block; margin: 0 auto` |
| `#inline` | Agrupado en flex-wrap |
| `#3d` | Efecto hover 3D |

**Formato de tamaño:** `{width:height}` — ambos opcionales. Soporta `px` y `%`.

**⚠️ Los modificadores usan `includes()`** — URLs que contienen `#left`, `#right`, o `#center` como substring pueden activar float accidentalmente.

## HTML Blocks

Tags HTML nativos se detectan y parsean con nesting-aware tag matching.

**Reglas:**
- **Líneas en blanco** dentro de tags HTML para procesar markdown
- Void elements se manejan inline
- Tags anidados se matchean recursivamente
- Contenido interno se parsea como markdown via `parseMarkdown()`

**⚠️ Tags sin cerrar se tratan como self-closing** — no consumen el resto del documento. `<div>` sin `</div>` solo toma el tag de apertura, el contenido después se parsea normalmente.
