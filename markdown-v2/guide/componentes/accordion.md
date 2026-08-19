---
title: Accordion
icon: unfold_more
order: 3
---

# Accordion

La directiva `:::accordion` agrupa items desplegables (`:::accordion-item`). Por defecto solo un item puede estar abierto (modo `radio`).

## Sintaxis

```md
:::accordion
:::accordion-item {title="Primera sección"}
Contenido de la primera sección.
:::
:::accordion-item {title="Segunda sección"}
Contenido de la segunda sección.
:::
:::
```

:::accordion
:::accordion-item {title="Primera sección"}
Contenido de la primera sección.
:::
:::accordion-item {title="Segunda sección"}
Contenido de la segunda sección.
:::
:::

## Abierto por defecto

Con `checked` el item nace abierto:

```md
:::accordion
:::accordion-item {title="FAQ: ¿Qué es NoirMD?" checked}
Un editor markdown con directivas propias.
:::
:::accordion-item {title="FAQ: ¿Cómo anido directivas?"}
Dentro del contenido de cualquier item puedes usar `:::`.
:::
:::
```

:::accordion
:::accordion-item {title="FAQ: ¿Qué es NoirMD?" checked}
Un editor markdown con directivas propias.
:::
:::accordion-item {title="FAQ: ¿Cómo anido directivas?"}
Dentro del contenido de cualquier item puedes usar `:::`.
:::
:::

## Modo checkbox (multiples abiertos)

```md
:::accordion {mode="checkbox"}
:::accordion-item {title="Paso 1" checked}
Preparar los ingredientes.
:::
:::accordion-item {title="Paso 2"}
Mezclar y hornear.
:::
:::
```

:::accordion {mode="checkbox"}
:::accordion-item {title="Paso 1" checked}
Preparar los ingredientes.
:::
:::accordion-item {title="Paso 2"}
Mezclar y hornear.
:::
:::

## Props

### `:::accordion`

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `mode` | `radio` \| `checkbox` | `radio` (default): solo uno abierto; `checkbox`: varios |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

### `:::accordion-item`

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del item (requerido) |
| `checked` | flag | Item abierto por defecto |
| `value` | texto | Valor asociado al input |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |