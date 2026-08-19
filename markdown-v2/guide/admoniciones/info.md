---
title: Info
icon: info
order: 4
---

# Admonición: Info

La directiva `:::info` crea una caja azul de información técnica o contextual.

## Sintaxis

```md
:::info
Dato técnico o contextual.
:::
```

:::info
Dato técnico o contextual.
:::

## Con título

```md
:::info {title="API" icon="api"}
El endpoint devuelve `application/json`.
:::
```

:::info {title="API" icon="api"}
El endpoint devuelve `application/json`.
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del bloque |
| `icon` | nombre Material | Icono personalizado |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Ejemplo con tablas

```md
:::info Versiones
| Versión | Estado |
| --- | --- |
| v2.0 | Estable |
| v3.0 | Beta |
:::
```

:::info Versiones
| Versión | Estado |
| --- | --- |
| v2.0 | Estable |
| v3.0 | Beta |
:::