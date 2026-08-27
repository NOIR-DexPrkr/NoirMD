---
title: Carousel
icon: view_carousel
order: 4
---

# Carousel

La directiva `:::carousel` muestra un carrusel de imágenes con flechas, puntos de navegación y **loop infinito**.

## Sintaxis

Las imágenes se ponen como markdown dentro del bloque:

```md
:::carousel {height="320px"}
![Foto 1](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp)
![Foto 2](https://img.daisyui.com/images/stock/photo-1470252649378-9c29740c9fa8.webp)
![Foto 3](https://img.daisyui.com/images/stock/photo-1441974231531-c6227db76b6e.webp)
![Foto 4](https://img.daisyui.com/images/stock/photo-1500530855697-b586d89ba3ee.webp)
:::
```

:::carousel {height="320px"}
![Foto 1](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp)
![Foto 2](https://img.daisyui.com/images/stock/photo-1470252649378-9c29740c9fa8.webp)
![Foto 3](https://img.daisyui.com/images/stock/photo-1441974231531-c6227db76b6e.webp)
![Foto 4](https://img.daisyui.com/images/stock/photo-1500530855697-b586d89ba3ee.webp)
:::

## Tamaño y proporción

- Sin props, el viewport usa `16/9` de aspecto.
- `height` fija la altura del viewport (las imágenes lo rellenan).
- `aspect` fija la proporción (`4/3`, `1/1`, `21/9`...).

```md
:::carousel {aspect="4/3" width="420px" float="right"}
![A](https://img.daisyui.com/images/stock/photo-1529626455594-4ff0802cfb7e.webp)
![B](https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp)
:::
```

:::carousel {aspect="4/3" width="420px" float="right"}
![A](https://img.daisyui.com/images/stock/photo-1529626455594-4ff0802cfb7e.webp)
![B](https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp)
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `height` | CSS (px) | Altura fija del viewport |
| `aspect` | ratio | Proporción del viewport (default `16/9`) |
| `width` | CSS (px, %) | Ancho del carrusel |
| `float` | `left` / `right` / `center` | Flotación (sin `width`, el flotante usa `max-width: 50%`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Interacción

- **Flechas** (izquierda/derecha): navegar.
- **Puntos** inferiores: ir a una imagen.
- **Teclado**: `←` y `→` cuando el carrusel está enfocado.
- El carrusel **da la vuelta** al llegar al final (loop infinito).

> Las imágenes se recortan (`object-fit: cover`) para rellenar el viewport sin deformarse.