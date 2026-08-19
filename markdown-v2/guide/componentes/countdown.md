---
title: Countdown
icon: timer
order: 5
---

# Countdown

La directiva `:::countdown` muestra una cuenta atrás en tiempo real.

## Cuenta atrás fija

Con `days`, `hours`, `min` y `sec` se define una duración que se va agotando:

```md
:::countdown {days="0" hours="0" min="2" sec="30"}
:::
```

:::countdown {days="0" hours="0" min="2" sec="30"}
:::

## Cuenta atrás a una fecha (live)

Con `target` el contador cuenta hasta una fecha concreta (`YYYY-MM-DDTHH:mm:ss`):

```md
:::countdown {target="2027-01-01T00:00:00"}
:::
```

:::countdown {target="2027-01-01T00:00:00"}
:::

## Con etiquetas personalizadas

```md
:::countdown {days="1" hours="4" min="12" sec="45" labels="Días|Horas|Min|Seg"}
:::
```

:::countdown {days="1" hours="4" min="12" sec="45" labels="Días|Horas|Min|Seg"}
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `days` | número | Días de duración |
| `hours` | número | Horas de duración |
| `min` | número | Minutos de duración |
| `sec` | número | Segundos de duración |
| `target` | fecha ISO | Fecha objetivo (cuenta hacia ella) |
| `labels` | texto `\|` | Etiquetas bajo los dígitos, separadas por `\|` |
| `digits` | número | Dígitos por bloque (default `2`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

> Puedes combinar `target` con `labels` para una cuenta atrás de evento completa. Al llegar a cero se muestra `00:00:00:00`.