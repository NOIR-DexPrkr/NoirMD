---
title: Greentext
icon: chat
order: 5
---

# Admonición: Greentext

La directiva `:::greentext` crea un bloque verde tipo foro, para citas informales, humor o contexto narrativo.

## Sintaxis

```md
:::greentext
> el usuario que usa markdown simple
> no conoce el poder de las directivas
:::
```

:::greentext
> el usuario que usa markdown simple
> no conoce el poder de las directivas
:::

## Con título

```md
:::greentext {title="Feedback del usuario"}
> la guía escribe sola
> 10/10
:::
```

:::greentext {title="Feedback del usuario"}
> la guía escribe sola
> 10/10
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del bloque |
| `icon` | nombre Material | Icono personalizado |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Combinando estilos

```md
:::greentext
> **%green%alguien%%**: ¿y si anidamos una nota?
> **%green%otro%%**: `:::note` funciona dentro
:::
```

:::greentext
> **%green%alguien%%**: ¿y si anidamos una nota?
> **%green%otro%%**: `:::note` funciona dentro
:::