---
title: Card
icon: dashboard
order: 1
---

# Card

La directiva `:::card` crea una tarjeta con icono, título y contenido markdown.

## Sintaxis básica

El slot `#description` es **obligatorio** para mostrar texto en la card:

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

El slot `#description` admite markdown completo:

```md
:::card {title="Documentación técnica" icon="code"}

#description
Guía completa del motor de renderizado.

- Renderizado por el mismo motor
- Soporta `inline`, tablas y directivas
:::
```

:::card {title="Documentación técnica" icon="code"}

#description
Guía completa del motor de renderizado.

- Renderizado por el mismo motor
- Soporta `inline`, tablas y directivas
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
:::card {title="Centrada B" icon="favorite"}

#description
Contenido.
:::
```

> `align` solo se define en la primera card del grupo; las demás lo ignoran.

:::card {title="Centrada A" icon="star" align="center"}

#description
Contenido.
:::
:::card {title="Centrada B" icon="favorite"}

#description
Contenido.
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título de la tarjeta |
| `icon` | nombre Material | Icono del título |
| `image` | URL | Imagen de banner superior |
| `align` | `left` / `center` / `right` | Alineación del grid. Solo se lee de la primera card del grupo (default `left`) |
| `batch` | `off` | Desactiva el agrupado en grid con las tarjetas vecinas |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Slots

| Slot | Descripción |
| --- | --- |
| `#description` | Texto de la card. **Obligatorio** para mostrar contenido debajo del título |

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

## Imágenes altas con scroll

Cuando la imagen del banner es más alta que el contenedor (ratio > 1.2×), se activa automáticamente un **scroll suave al hacer hover** sobre la card. Esto permite ver la imagen completa sin necesidad de expandir la card.

- **Fuera del hover**: la imagen muestra la parte superior (comportamiento normal)
- **Al hacer hover**: la imagen se desplaza suavemente hacia abajo para mostrar la parte inferior
- **Al salir del hover**: la imagen vuelve suavemente a la posición inicial

Este comportamiento es automático — no requiere props adicionales. Solo se activa con imágenes que superen la altura del contenedor.

```md
:::card {title="Captura larga" icon="image" image="https://placehold.co/400x900"}

#description
Al hacer hover, la imagen se desplaza para mostrar su contenido completo.
:::
```

## Variantes

Existen dos variantes de la tarjeta con comportamiento interactivo:

| Directiva | Comportamiento al hacer click |
| --- | --- |
| `:::card` | Sin acción (tarjeta estática) |
| `:::card-m` | Abre un modal con el contenido del slot `#content` |
| `:::card-b` | Navega a la URL indicada en la prop `url` |

Las tres variantes comparten las mismas props base (`title`, `icon`, `image`) y se agrupan automáticamente en grid. Consulta las páginas de **Card Modal** y **Card Link** para más detalles.

Dentro de un grid, las cards de una misma fila se estiran a la **misma altura** y, en las variantes interactivas (`:::card-m` y `:::card-b`), el botón de acción (`Abrir` / `LINK`) queda siempre **anclado abajo a la derecha**, sin importar la longitud de la descripción.