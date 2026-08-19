---
title: Hover 3D
icon: view_in_ar
order: 7
---

# Hover 3D

La directiva `:::hover-3d` convierte su contenido en una tarjeta con **efecto 3D** que sigue al ratón.

## Sintaxis

```md
:::hover-3d
![Montañas](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp){400:260}
:::
```

:::hover-3d
![Montañas](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp){400:260}
:::

## Con texto

```md
:::hover-3d
## El efecto es automático
Mueve el ratón sobre la tarjeta: el contenido rota en 3D siguiendo el cursor.
:::
```

:::hover-3d
## El efecto es automático
Mueve el ratón sobre la tarjeta: el contenido rota en 3D siguiendo el cursor.
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Notas

- El contenedor genera 8 reflejos de luz (luces de borde) que reaccionan al movimiento.
- Cuanto más cerca del borde está el cursor, más rota la tarjeta.
- En pantallas táctiles el efecto se desactiva (no hay hover).
- Se recomienda un solo hijo (imagen o bloque de texto) para el mejor resultado.