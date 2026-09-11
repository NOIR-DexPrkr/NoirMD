---
title: Button
icon: touch_app
order: 3
---

# Button

La directiva `:::button` crea un **botón con enlace** (se abre en pestaña nueva por defecto).

## Sintaxis

```md
:::button {label="Documentación" url="https://example.com" icon="menu_book"}
:::
```

:::button {label="Documentación" url="https://example.com" icon="menu_book"}
:::

## Variante con enlace interno

```md
:::button {label="Ir a la página de notas" url="#admonición-nota" icon="sticky_note_2" target="_self"}
:::
```

:::button {label="Ir a la página de notas" url="#admonición-nota" icon="sticky_note_2" target="_self"}
:::

## Con contenido markdown

Si el bloque contiene texto/enlaces, se renderizan dentro del botón. El icono se añade automáticamente a cada enlace del contenido:

```md
:::button {label="Descargar" url="https://example.com/download" icon="download"}
Descarga el **manual** en PDF
:::
```

:::button {label="Descargar" url="https://example.com/download" icon="download"}
Descarga el **manual** en PDF
:::

## Con enlace en el contenido

Si el contenido es un enlace markdown, el botón usa el enlace del contenido y el icono se añade al principio:

```md
:::button {icon="star"}
[Descarga con FDM](https://example.com/download)
:::
```

:::button {icon="star"}
[Descarga con FDM](https://example.com/download)
:::

## Sin icono

Para ocultar el icono, usa `icon="none"`:

```md
:::button {label="Sin icono" url="https://example.com" icon="none"}
:::
```

:::button {label="Sin icono" url="https://example.com" icon="none"}
:::

## Color

Los botones aceptan tokens de tema (`primary`, `secondary`, `info`, `success`, `warning`, `error`) o colores CSS arbitrarios (`red`, `#ff0000`, `rgb(255,0,0)`):

```md
:::button {label="Éxito" url="https://example.com" icon="check_circle" color="success"}
:::
```

:::button {label="Éxito" url="https://example.com" icon="check_circle" color="success"}
:::

```md
:::button {label="Rojo" url="https://example.com" icon="error" color="#e11d48"}
:::
```

:::button {label="Rojo" url="https://example.com" icon="error" color="#e11d48"}
:::

## Alineación

Los botones se alinean a la izquierda por defecto. Usa el prop `align` para cambiar la alineación:

### Centrado

```md
:::button {label="Centrado" url="https://example.com" icon="center_focus_strong" align="center"}
:::
```

:::button {label="Centrado" url="https://example.com" icon="center_focus_strong" align="center"}
:::

### Alineado a la derecha

```md
:::button {label="Derecha" url="https://example.com" icon="arrow_forward" align="right"}
:::
```

:::button {label="Derecha" url="https://example.com" icon="arrow_forward" align="right"}
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `label` (o `title`) | texto | Texto del botón (`title` funciona como alias por compatibilidad) |
| `url` (o `href`) | URL | Destino del enlace (default `#`) |
| `icon` | nombre Material | Icono (default `touch_app`). Usa `icon="none"` para ocultar |
| `target` | `_blank` / `_self` / ... | Destino del enlace (default `_blank`) |
| `color` | token de tema o CSS | Color del botón (ver colores soportados arriba) |
| `align` | `left` / `center` / `right` | Alineación del botón (default `left`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline (ej: `style="font-size:1rem"`) |
