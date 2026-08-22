---
title: Card
icon: dashboard
order: 1
---

# Card

La directiva `:::card` crea una tarjeta con icono, título y contenido markdown.

## Sintaxis

```md
:::card {title="Tarjeta simple" icon="star"}
Contenido de la tarjeta en **markdown**.
:::
```

:::card {title="Tarjeta simple" icon="star"}
Contenido de la tarjeta en **markdown**.
:::

## Con título largo y contenido enriquecido

```md
:::card {title="Documentación técnica" icon="code"}
- Renderizado por el mismo motor
- Soporta `inline`, tablas y directivas
- Sin título: usa `:::card` a secas
:::
```

:::card {title="Documentación técnica" icon="code"}
- Renderizado por el mismo motor
- Soporta `inline`, tablas y directivas
- Sin título: usa `:::card` a secas
:::

## Grid automático

Las tarjetas **consecutivas** se agrupan en una cuadrícula responsive. Añade `batch="off"` para evitarlo:

```md
:::card {title="HTML" icon="html"}
Estructura del documento.
:::
:::card {title="CSS" icon="palette"}
Estilos y variables.
:::
:::card {title="JS" icon="javascript"}
Interacción y eventos.
:::
```

:::card {title="HTML" icon="html"}
Estructura del documento.
:::
:::card {title="CSS" icon="palette"}
Estilos y variables.
:::
:::card {title="JS" icon="javascript"}
Interacción y eventos.
:::

## Con slot `#description`

```md
:::card {title="Mi proyecto" icon="rocket"}

#description
Resumen corto del proyecto.

Contenido principal de la tarjeta con **markdown**.
:::
```

:::card {title="Mi proyecto" icon="rocket"}

#description
Resumen corto del proyecto.

Contenido principal de la tarjeta con **markdown**.
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título de la tarjeta |
| `icon` | nombre Material | Icono del título |
| `image` | URL | Imagen de banner superior |
| `align` | `left` \| `center` \| `right` | Alineación de las tarjetas en el grid (default `left`) |
| `batch` | `off` | Desactiva el agrupado en grid con las tarjetas vecinas |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Slots

| Slot | Descripción |
| --- | --- |
| `default` | Contenido principal de la tarjeta |
| `#description` | Texto descriptivo secundario (aparece debajo del título) |

## Anidando directivas

```md
:::card {title="Ejemplo anidado" icon="layers"}
Una admonición dentro de la tarjeta:

:::note
Las tarjetas aceptan cualquier directiva dentro.
:::
:::
```

:::card {title="Ejemplo anidado" icon="layers"}
Una admonición dentro de la tarjeta:

:::note
Las tarjetas aceptan cualquier directiva dentro.
:::
:::

## Variantes

Existen dos variantes de la tarjeta con comportamiento interactivo:

| Directiva | Comportamiento al hacer click |
| --- | --- |
| `:::card` | Sin acción (tarjeta estática) |
| `:::card-m` | Abre un modal con el contenido del slot `#content` |
| `:::card-b` | Navega a la URL indicada en la prop `url` |

Las tres variantes comparten las mismas props base (`title`, `icon`, `image`) y se agrupan automáticamente en grid. Consulta las páginas de **Card Modal** y **Card Link** para más detalles.