---
title: Diff (comparar imágenes)
icon: compare
order: 6
---

# Diff (comparar imágenes)

La directiva `:::diff` muestra **antes y después** con un slider arrastrable.

## Sintaxis

Se indican las dos imágenes con las props `before` y `after`:

```md
:::diff {before="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" after="https://img.daisyui.com/images/stock/photo-1572635196237-14b3f281503f.webp"}
:::
```

:::diff {before="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" after="https://img.daisyui.com/images/stock/photo-1572635196237-14b3f281503f.webp"}
:::

## Con dos imágenes markdown

Alternativa: dos imágenes en el cuerpo del bloque (la primera es el «antes»):

```md
:::diff {height="320px"}
![Antes](https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp)
![Después](https://img.daisyui.com/images/stock/photo-1572635196237-14b3f281503f.webp)
:::
```

:::diff {height="320px"}
![Antes](https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp)
![Después](https://img.daisyui.com/images/stock/photo-1572635196237-14b3f281503f.webp)
:::

## Tamaño y flotación

```md
:::diff {width="440px" aspect="4/3" float="left" before="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" after="https://img.daisyui.com/images/stock/photo-1572635196237-14b3f281503f.webp"}
:::
```

:::diff {width="440px" aspect="4/3" float="left" before="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" after="https://img.daisyui.com/images/stock/photo-1572635196237-14b3f281503f.webp"}
:::

Texto que fluye junto al diff flotante: la comparación queda integrada en el párrafo como una imagen flotante más.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `before` | URL | Imagen «antes» (descartada si hay dos imágenes markdown) |
| `after` | URL | Imagen «después» |
| `height` | CSS (px) | Altura del comparador (default `16/9` de aspecto) |
| `aspect` | ratio | Proporción (`4/3`, `1/1`, ...) |
| `width` | CSS (px, %) | Ancho del comparador |
| `float` | `left` \| `right` \| `center` | Flotación (sin `width`, `max-width: 50%`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Interacción

- **Arrastra** el mango vertical para mover la línea de corte.
- **Haz clic** en cualquier punto para saltar el slider allí.
- **Teclado**: `←` y `→` ajustan ±5% (enfoca el comparador con Tab).