# Inline Syntax ° Referencia Completa

> Todo el formateo inline soportado por el renderer V2. Los elementos inline son **recursivos** ° pueden anidarse dentro de otros.

## Orden de Precedencia

El renderer verifica patrones inline en este orden:

| # | Sintaxis | Descripción |
|---|----------|-------------|
| 1 | `\|[[icon]]\|` | Material Icon inline |
| 2 | `!~color;style;type;text~!` | Texto decorado (underline, overline, line-through) |
| 3 | `%color%text%%` | Texto con color CSS |
| 4 | `!>text<!` | Spoiler (oculto hasta hover) |
| 5 | `==text==` | Highlight / mark |
| 6 | `***text***` | Bold + Italic |
| 7 | `|**text**|` | Bold (delimitador pipe para evitar conflicto con italic) |
| 8 | `_text_` | Italic (single underscore) |
| 9 | `~~text~~` | Strikethrough |
| 10 | `` `code` `` | Inline code |
| 11 | `[text](url)` | Link (siempre `target="_blank"`) |
| 12 | `<html>` | HTML inline (dangerouslySetInnerHTML) |

## Iconos ° `|[[icon-name]]|`

Renderiza un Google Material Icon inline. Soporta hex codepoints: `|[[f004]]|`, `|[[e123]]|`.

Se renderiza como `<span class="material-icons-round">` con sizing fijo.

## Color Text ° `%color%text%%`

Aplica un color CSS al texto envuelto. El color puede ser cualquier valor CSS v°lido: nombre, hex, rgb(), etc.

**Reglas:** `%color%` abre (un `%`), `%%` cierra (dos `%`). El texto interno se parsea recursivamente.

**?? El cierre es `%%` (dos por ciento), no `%` (uno).**

## Underline / Text Decoration ° `!~...~!`

Formato con parámetros: `!~color;style;type;text~!`

| Posición | Opciones | Default |
|----------|---------|---------|
| 1. Color | Cualquier color CSS | `currentColor` |
| 2. Style | `solid`, `double`, `dotted`, `dashed`, `wavy` | `solid` |
| 3. Type | `underline`, `line-through`, `overline`, `both` | `underline` |
| 4. Text | El contenido real | ° |

Forma simple: `!~underlined text~!` (usa defaults).

## Spoiler ° `!>text<!`

Texto oculto hasta hover. Visual: `bg-text-primary text-bg-primary` ° coincide con el fondo, se revela con `hover:bg-transparent`.

## Highlight / Mark ° `==text==`

Resalta texto con fondo amarillo: `<mark>` con `bg-yellow-500/20`.

## Bold / Italic / Strikethrough

- Bold: `**text**`
- Italic: `_text_` (single underscore, NO double)
- Bold + Italic: `***text***`
- Strikethrough: `~~text~~`

### ?? CRÍTICO: `*text*` NO es italic

Este renderer **solo soporta `_text_`** para italic. `*text*` se renderiza como texto literal con asteriscos. Esto es una desviaci°n mayor del markdown est°ndar.

### ?? Fragilidad del Italic con `_`

El delimiter `_` puede romperse si el texto contiene underscores internos (ej: `some_variable`). En esos casos, aplica `class="italic"` via `##{}` en vez de `_` inline.

**Evita mezclar `_text_` con `##{class="italic"}`** ° es redundante y puede causar parsing inesperado.

### ?? Code inline no soporta backticks internos

No hay escaping con doble backtick. `` `code with ` backtick` `` no funciona. Usa `%color%` o `<code>` inline si necesitas mostrar backticks.

### ?? Spoiler no puede contener `<`

`!>text with < inside<!` no funciona. El contenido del spoiler no puede contener el car°cter `<`.

## Inline Code ° `` `code` ``

Monospace font con fondo sutil (`bg-background-secondary/50`).

## Links ° `[text](url)`

Siempre abre en nueva pesta°a (`target="_blank"`). El formateo inline funciona dentro del texto del link.

## Nesting

El formateo inline es **recursivo** ° puedes combinar:

```
**_bold italic_**
~~==strikethrough highlight==~~
**_%red%bold red color%%_**
```
