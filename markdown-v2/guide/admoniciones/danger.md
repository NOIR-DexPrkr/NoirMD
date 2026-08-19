---
title: Danger
icon: error
order: 3
---

# Admonición: Danger

La directiva `:::danger` crea una caja roja de error o peligro, para lo más crítico.

## Sintaxis

```md
:::danger
¡Esto puede romper tu documento!
:::
```

:::danger
¡Esto puede romper tu documento!
:::

## Con título

```md
:::danger {title="Error irrecuperable" icon="error"}
La variable `{{title}}` no existe.
:::
```

:::danger {title="Error irrecuperable" icon="error"}
La variable `{{title}}` no existe.
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del bloque |
| `icon` | nombre Material | Icono personalizado |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Uso combinado con código

````md
:::danger Tiempo agotado
La sesión expiró. Vuelve a iniciar sesión:

```md
[Iniciar sesión](/login)
```
:::
````

:::danger Tiempo agotado
La sesión expiró. Vuelve a iniciar sesión:

[Iniciar sesión](/login)
:::