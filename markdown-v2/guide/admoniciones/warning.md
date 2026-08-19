---
title: Warning
icon: warning_amber
order: 2
---

# Admonición: Warning

La directiva `:::warning` crea una caja de aviso ámbar, para precauciones o advertencias moderadas.

## Sintaxis

```md
:::warning
Cuidado con esto.
:::
```

:::warning
Cuidado con esto.
:::

## Con título e icono

```md
:::warning {title="Precaución" icon="warning"}
El bloque `:::` debe cerrarse correctamente.
:::
```

:::warning {title="Precaución" icon="warning"}
El bloque `:::` debe cerrarse correctamente.
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del bloque |
| `icon` | nombre Material | Icono personalizado |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Combinando admoniciones

```md
:::warning Contenido sensible
Esta parte **se borra** al vaciar el editor:
- No guardes aquí contraseñas
- Usa `:::danger` para lo crítico
:::
```

:::warning Contenido sensible
Esta parte **se borra** al vaciar el editor:

- No guardes aquí contraseñas
- Usa `:::danger` para lo crítico
:::