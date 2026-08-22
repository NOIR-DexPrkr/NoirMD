---
title: Stat
icon: insights
order: 11
---

# Stat

La directiva `:::stat` muestra una **estadística** con icono, valor y descripción. Las estadísticas **consecutivas** se agrupan en una fila.

## Sintaxis

```md
:::stat {title="Descargas" value="31K" icon="download" color="success"}
:::
:::stat {title="Nuevos usuarios" value="4,200" icon="group_add" color="primary"}
:::
:::stat {title="Retención" value="82%" icon="trending_up" color="info"}
:::
```

:::stat {title="Descargas" value="31K" icon="download" color="success"}
:::
:::stat {title="Nuevos usuarios" value="4,200" icon="group_add" color="primary"}
:::
:::stat {title="Retención" value="82%" icon="trending_up" color="info"}
:::

## Con descripción

```md
:::stat {title="Ingresos" value="$14,320" desc="+12% este mes" icon="payments" color="secondary"}
:::
:::stat {title="Errores" value="3" desc="resueltos hoy" icon="bug_report" color="warning"}
:::
```

:::stat {title="Ingresos" value="$14,320" desc="+12% este mes" icon="payments" color="secondary"}
:::
:::stat {title="Errores" value="3" desc="resueltos hoy" icon="bug_report" color="warning"}
:::

## Prop individual (sin agrupar)

```md
:::stat {title="Tiempo de actividad" value="99.9%" icon="monitor_heart" color="success"}
:::
```

:::stat {title="Tiempo de actividad" value="99.9%" icon="monitor_heart" color="success"}
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Etiqueta superior |
| `value` | texto | Valor principal (grande) |
| `desc` | texto | Descripción bajo el valor |
| `icon` | nombre Material | Icono lateral |
| `color` | `primary` \| `secondary` \| `info` \| `success` \| `warning` \| `error` \| CSS color | Color del icono y valor. Acepta tokens del tema o cualquier color CSS válido (ej: `blue`, `#ff0000`, `rgb(255,0,0)`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

> Cada `:::stat` debe cerrarse con su `:::`. Las stats contiguas se agrupan en fila automáticamente; para separarlas deja texto entre medias.