# Parser — Orden de Detección y AST

> Cómo el parser V2 procesa markdown línea por línea en un AST tipado.

## Orden de Detección (Prioridad)

El parser procesa las líneas de arriba abajo. Cada línea se verifica contra estos patrones en orden:

1. **Headers** — `#{1,6} text`
2. **Párrafos alineados** — `-> text <-` (centro) o `-> text ->` (derecha)
3. **Code blocks** — `` ``` lang title="name" ... ``` ``
4. **Directivas** — `:::type {props} ... :::` (nesting-aware)
5. **Imágenes** — `![alt](src#float){w:h}`
6. **Tablas** — `| cell | cell |` seguido de `|---|---|`
7. **Listas** — `- item`, `* item`, `+ item`, `1. item`
8. **Blockquotes** — `> text`
9. **HR** — `---`, `___`, `***`
10. **TOC** — `[TOC]` o `[TOC2]`
11. **HTML blocks** — `<tag ...>...</tag>` (nesting-aware)
12. **Párrafos** — todo lo demás

## Tokens del AST

| Token | Descripción |
|-------|-------------|
| `header` | `# H1` a `###### H6` con slug ID generado |
| `paragraph` | Líneas de texto, soporta alineación |
| `codeblock` | Bloques de código con highlight.js syntax highlighting |
| `directive` | Directivas custom (`:::type {props} ... :::`) |
| `html` | HTML inline (`<tag>...</tag>`) |
| `html-block` | Bloque HTML con tag matching nesting-aware |
| `image` | `![alt](src#float){w:h}` con posicionamiento |
| `table` | Pipe-delimited |
| `list` | Ordenada y desordenada |
| `blockquote` | `> texto` |
| `hr` | `---`, `___`, `***` |
| `toc` | `[TOC]` o `[TOC2]` |

## Props de Directivas (`parseProps()`)

Input: `{key="value" key2='value2'}`

| Sintaxis | Significado |
|----------|------------|
| `key="value"` | Par key-value estándar |
| `key='value'` | Values entre comillas simples también funcionan |
| `.className` | Shorthand → agrega al prop `class` |
| `#id` | Shorthand → agrega al prop `id` |

Ejemplos de parsing:
- `{.flex .gap-4 #my-id}` → `{ class: "flex gap-4", id: "my-id" }`
- `{title="Hello" .rounded-xl}` → `{ title: "Hello", class: "rounded-xl" }`

### Short-form

Sin bloque `{}`, el texto después del tipo se convierte en prop `title`:

```
:::note My Quick Title
→ equivalente a :::note {title="My Quick Title"}
```

## Slot Splitting (`splitSlots()`)

El contenido entre `:::type` y `:::` se divide por marcadores `#slotname`:

**Reglas:**
- Contenido antes del primer `#slotname` → slot `default`
- `#slotname` debe estar **solo en su línea** — sin otro contenido en la misma línea
- `#slotname` debe estar al **nivel superior** (no dentro de directivas anidadas)
- Slots vacíos se eliminan automáticamente
- `#slot` anidado dentro de `:::child ... :::` NO crea un nuevo slot
- `##{}` de atributos debe estar al **FINAL de la línea**

## Nesting

Las directivas pueden anidarse. El parser trackea `nestedLevel` — el `:::` exterior solo cierra cuando todos los interiores están cerrados.

**Directivas sin cerrar** → se renderizan como párrafos de texto plano.

## Extracción de Atributos (`extractAttributes()`)

Se adjunta a headers, párrafos y blockquotes via sintaxis `##{}`:

```
## Title ##{.highlight #custom-id}
→ text: "Title", classes: "highlight", id: "custom-id"
```

**Shorthands:** `.className` para class, `#id` para id, `key="value"` para atributos arbitrarios.

Soporta `/` para opacidad y `!` para importante: `.bg-red-500/10`, `.!m-0`.

## Parsing de Imágenes

```
![alt text](image-url#left){150:100}
```

| Modificador | Efecto |
|-------------|--------|
| `#left` | `float: left; margin: 0 1em 1em 0` |
| `#right` | `float: right; margin: 0 0 1em 1em` |
| `#center` | `display: block; margin: 0 auto` |
| `{width:height}` | CSS width/height (px, %, o vacío para auto) |

## HTML Block Parsing

1. Detecta `<tag ...>` en una línea
2. **Void elements** → se manejan inline
3. Tags no-void → matching nesting-aware para encontrar `</tag>`
4. Contenido interno se **parsea recursivamente** como markdown
5. Produce `HtmlBlockToken` con `tag`, `attrs`, y `children: Token[]`
