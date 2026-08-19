---
title: Hover Gallery
icon: photo_library
order: 8
---

# Hover Gallery

La directiva `:::hover-gallery` muestra una galería donde las imágenes se **expanden al pasar el ratón**, estilo dock.

## Sintaxis

Las imágenes se ponen como markdown dentro del bloque:

```md
:::hover-gallery {aspect="16/9"}
![1](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp)
![2](https://img.daisyui.com/images/stock/photo-1470252649378-9c29740c9fa8.webp)
![3](https://img.daisyui.com/images/stock/photo-1441974231531-c6227db76b6e.webp)
![4](https://img.daisyui.com/images/stock/photo-1500530855697-b586d89ba3ee.webp)
![5](https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp)
![6](https://img.daisyui.com/images/stock/photo-1493863641943-9b68992a8d07.webp)
:::
```

:::hover-gallery {aspect="16/9"}
![1](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp)
![2](https://img.daisyui.com/images/stock/photo-1470252649378-9c29740c9fa8.webp)
![3](https://img.daisyui.com/images/stock/photo-1441974231531-c6227db76b6e.webp)
![4](https://img.daisyui.com/images/stock/photo-1500530855697-b586d89ba3ee.webp)
![5](https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp)
![6](https://img.daisyui.com/images/stock/photo-1493863641943-9b68992a8d07.webp)
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `aspect` | ratio | Proporción de la galería (default `16/9`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Notas

- La imagen activa (hover) crece y las vecinas se apartan para darle espacio.
- Las imágenes se recortan (`object-fit: cover`) para mantener la altura uniforme.
- Funciona con 3 o más imágenes; con menos, se reparten el ancho.