---
title: Card
icon: dashboard
order: 1
---

# Card

La directiva `:::card` crea una tarjeta con icono, título y contenido markdown.

## Sintaxis básica

Solo título e icono, sin descripción:

```md
:::card {title="Tarjeta simple" icon="star"}
:::
```

:::card {title="Tarjeta simple" icon="star"}
:::

## Con slot `#description`

Agrega un texto descriptivo debajo del título usando el slot `#description`:

```md
:::card {title="Mi proyecto" icon="rocket"}

#description
Resumen corto del proyecto.

:::
```

:::card {title="Mi proyecto" icon="rocket"}

#description
Resumen corto del proyecto.

:::

## Con contenido markdown

El contenido principal va en el slot `#default` (después de `#description`):

```md
:::card {title="Documentación técnica" icon="code"}

#description
Guía completa del motor de renderizado.

- Renderizado por el mismo motor
- Soporta `inline`, tablas y directivas
- Sin título: usa `:::card` a secas
:::
```

:::card {title="Documentación técnica" icon="code"}

#description
Guía completa del motor de renderizado.

- Renderizado por el mismo motor
- Soporta `inline`, tablas y directivas
- Sin título: usa `:::card` a secas
:::

## Grid automático

Las tarjetas **consecutivas** se agrupan en una cuadrícula responsive. Añade `batch="off"` para evitarlo:

```md
:::card {title="HTML" icon="html"}

#description
Estructura del documento.
:::
:::card {title="CSS" icon="palette"}

#description
Estilos y variables.
:::
:::card {title="JS" icon="javascript"}

#description
Interacción y eventos.
:::
```

:::card {title="HTML" icon="html"}

#description
Estructura del documento.
:::
:::card {title="CSS" icon="palette"}

#description
Estilos y variables.
:::
:::card {title="JS" icon="javascript"}

#description
Interacción y eventos.
:::

## Alineación del grid

Usa `align` para controlar la alineación de las tarjetas en el grid:

```md
:::card {title="Centrada A" icon="star" align="center"}

#description
Contenido.
:::
:::card {title="Centrada B" icon="favorite" align="center"}

#description
Contenido.
:::
```

:::card {title="Centrada A" icon="star" align="center"}

#description
Contenido.
:::
:::card {title="Centrada B" icon="favorite" align="center"}

#description
Contenido.
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
| `#description` | Texto descriptivo secundario (aparece debajo del título) |
| `default` | Contenido principal de la tarjeta |

## Anidando directivas

```md
:::card {title="Ejemplo anidado" icon="layers"}

#description
Una admonición dentro de la tarjeta.

:::note
Las tarjetas aceptan cualquier directiva dentro.
:::
:::
```

:::card {title="Ejemplo anidado" icon="layers"}

#description
Una admonición dentro de la tarjeta.

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