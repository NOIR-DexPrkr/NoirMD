---
title: Card Modal
icon: open_in_new
order: 2
---

# Card Modal

La directiva `:::card-m` crea una tarjeta interactiva que al hacer click abre un **modal** con contenido detallado.

## Sintaxis

```md
:::card-m {title="Mi proyecto" icon="rocket"}

Descripción breve visible en la tarjeta.

#content
Contenido **detallado** que aparece en el modal.
Puede incluir markdown completo: tablas, código, directivas...

:::
```

:::card-m {title="Mi proyecto" icon="rocket"}

Descripción breve visible en la tarjeta.

#content
Contenido **detallado** que aparece en el modal.
Puede incluir markdown completo: tablas, código, directivas...

:::

## Con imagen

```md
:::card-m {title="Paisaje" image="https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp"}

Una vista impresionante de las montañas.

#content
## Detalles del paisaje

- Ubicación: Alpes suizos
- Altitud: 2.500m
- Mejor época: Junio–Septiembre

:::
```

:::card-m {title="Paisaje" image="https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp"}

Una vista impresionante de las montañas.

#content
## Detalles del paisaje

- Ubicación: Alpes suizos
- Altitud: 2.500m
- Mejor época: Junio–Septiembre

:::

## Con slot `#description`

```md
:::card-m {title="Estadísticas" icon="analytics"}

#description
Resumen rápido del rendimiento.

#content
| Métrica | Valor |
| --- | --- |
| Usuarios | 12.345 |
| Tasa de conversión | 3,2% |
| Tiempo medio | 2m 15s |

:::
```

:::card-m {title="Estadísticas" icon="analytics"}

#description
Resumen rápido del rendimiento.

#content
| Métrica | Valor |
| --- | --- |
| Usuarios | 12.345 |
| Tasa de conversión | 3,2% |
| Tiempo medio | 2m 15s |

:::

## Grid automático

Las cards `:::card-m` se agrupan en grid con `:::card` y `:::card-b`. Usa `batch="off"` para evitarlo:

```md
:::card {title="Estática" icon="info"}
Contenido siempre visible.
:::
:::card-m {title="Modal" icon="open_in_new"}
Click para ver más.
:::
:::card-b {title="Link" icon="link" url="https://example.com"}
Abre en nueva pestaña.
:::
```

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título de la tarjeta |
| `icon` | nombre Material | Icono del título |
| `image` | URL | Imagen de banner superior |
| `url` | URL | URL opcional (no se usa como link, solo metadata) |
| `batch` | `off` | Desactiva el agrupado en grid |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Slots

| Slot | Descripción |
| --- | --- |
| `default` | Contenido breve visible en la tarjeta |
| `#description` | Texto descriptivo secundario |
| `#content` | Contenido detallado que se muestra en el modal |

## Diferencia con `:::card` y `:::card-b`

| Directiva | Comportamiento al hacer click |
| --- | --- |
| `:::card` | Sin acción (tarjeta estática) |
| `:::card-m` | Abre un modal con el contenido de `#content` |
| `:::card-b` | Navega a la URL indicada en `url` |
