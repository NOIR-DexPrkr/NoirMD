---
title: Div (contenedor)
icon: square_foot
order: 1
---

# Div (contenedor)

La directiva `:::div` envuelve su contenido en un `<div>` con **clases, id o estilos** propios.

## Sintaxis

```md
:::div {.mi-clase #mi-id}
Contenido dentro del div.
:::
```

:::div {.mi-clase #mi-id}
Contenido dentro del div.
:::

## Aplicando clases

```md
:::div {.test-container}
Tarjeta con estilo personalizado.
:::
```

:::div {.test-container}
Tarjeta con estilo personalizado.
:::

## Con estilos inline

```md
:::div {style="border: 1px dashed var(--color-accent-primary, #0ea5e9); padding: 1rem; border-radius: 10px;"}
Caja con borde discontinuo y padding.
:::
```

:::div {style="border: 1px dashed var(--color-accent-primary, #0ea5e9); padding: 1rem; border-radius: 10px;"}
Caja con borde discontinuo y padding.
:::

## Contenido enriquecido

```md
:::div {.test-container}
## Título dentro del div

:::note
Las directivas funcionan anidadas dentro del div.
:::
:::
```

:::div {.test-container}
## Título dentro del div

:::note
Las directivas funcionan anidadas dentro del div.
:::
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `.clase` | texto | Clases CSS (prefijo `.`, varias separadas por espacio) |
| `#id` | texto | Id del contenedor (prefijo `#`) |
| `style` | CSS | Estilos inline |

## Usos típicos

- Agrupar varios componentes para darles un fondo o borde común.
- Contenedor centrado: `:::div {style="max-width: 600px; margin: 0 auto;"}`.
- Combinar con `:::style` para CSS reutilizable por clase.