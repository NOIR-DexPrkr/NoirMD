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

Si el bloque contiene texto/enlaces, se renderizan dentro del botón:

```md
:::button {label="Descargar" url="https://example.com/download" icon="download"}
Descarga el **manual** en PDF
:::
```

:::button {label="Descargar" url="https://example.com/download" icon="download"}
Descarga el **manual** en PDF
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `label` | texto | Texto del botón |
| `url` (o `href`) | URL | Destino del enlace (default `#`) |
| `icon` | nombre Material | Icono (default `near_me`) |
| `target` | `_blank` / `_self` / ... | Destino del enlace (default `_blank`) |
| `class` | texto | Clases CSS adicionales |