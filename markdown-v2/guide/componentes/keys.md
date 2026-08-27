---
title: Keys (teclas)
icon: keyboard
order: 2
---

# Keys (teclas)

La directiva `:::keys` muestra combinaciones de teclado con apariencia de teclas físicas.

## Sintaxis

```md
:::keys
CTRL + C
:::
```

:::keys
CTRL + C
:::

## Varias combinaciones

```md
:::keys
CTRL + SHIFT + P
:::
```

:::keys
CTRL + SHIFT + P
:::

:::keys
ALT + F4
:::

:::keys
ESC
:::

## Tamaños

| Tamaño | Sintaxis |
| --- | --- |
| `xs` | `:::keys {size="xs"}` |
| `sm` | `:::keys {size="sm"}` |
| `md` | sin prop (default) |
| `lg` | `:::keys {size="lg"}` |
| `xl` | `:::keys {size="xl"}` |

:::keys {size="xs"}
CTRL + A
:::

:::keys {size="sm"}
CTRL + A
:::

:::keys {size="md"}
CTRL + A
:::

:::keys {size="lg"}
CTRL + A
:::

:::keys {size="xl"}
CTRL + A
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `size` | `xs` / `sm` / `md` / `lg` / `xl` | Tamaño de las teclas (default `md`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Ejemplo combinado

```md
:::keys {size="lg"}
SHIFT + CTRL + G
:::
```

:::keys {size="lg"}
SHIFT + CTRL + G
:::

> Las teclas se separan automáticamente por el signo `+`.