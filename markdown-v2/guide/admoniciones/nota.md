---
title: Nota
icon: sticky_note_2
order: 1
---

# Admonición: Nota

La directiva `:::note` crea una caja de aviso neutra, útil para información complementaria.

## Sintaxis

```md
:::note
Texto de la nota.
:::
```

:::note
Texto de la nota.
:::

## Con título

```md
:::note Recuerda
Guarda tu trabajo con `Ctrl+S` antes de salir.
:::
```

:::note Recuerda
Guarda tu trabajo con `Ctrl+S` antes de salir.
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del bloque (sin `:` en el nombre, es el texto tras `note`) |
| `icon` | nombre Material | Icono personalizado del bloque |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Anidando directivas

Las admoniciones admiten markdown completo dentro:

```md
:::note Propina
Puedes anidar **directivas** dentro de una nota:
- `:::keys` para atajos
- Tablas, código, enlaces...
:::
```

:::note Propina
Puedes anidar **directivas** dentro de una nota:

:::keys {size="sm"}
CTRL + S
:::

- Tablas, código, enlaces...
:::