---
title: Tablas
icon: table_chart
order: 4
---

# Tablas

Las tablas usan la sintaxis de tuberías `|`. La segunda fila define la alineación.

## Sintaxis

```md
| Columna A | Columna B | Columna C |
| --- | --- | --- |
| a1 | b1 | c1 |
| a2 | b2 | c2 |
```

| Columna A | Columna B | Columna C |
| --- | --- | --- |
| a1 | b1 | c1 |
| a2 | b2 | c2 |

## Alineación

Usa dos puntos en la fila de separación para alinear columnas:

```md
| Izquierda | Centro | Derecha |
| :--- | :---: | ---: |
| texto | texto | texto |
```

| Izquierda | Centro | Derecha |
| :--- | :---: | ---: |
| texto | texto | texto |

## Contenido enriquecido

Las celdas admiten **negrita**, *cursiva*, `` `código` `` y enlaces:

| Directiva | Props | Descripción |
| :--- | :--- | :--- |
| `:::card` | `title`, `icon` | Tarjeta de contenido |
| `:::chat` | `side`, `name` | Burbuja de chat |
| `:::stat` | `value`, `color` | Estadística |

## Escapar la tubería

Si un valor contiene una `|`, escápala con barra invertida:

```md
| Prop | Valores |
| --- | --- |
| float | `left` \| `right` \| `center` |
```

| Prop | Valores |
| --- | --- |
| float | `left` \| `right` \| `center` |

> Las tablas con muchas columnas se vuelven horizontales en pantallas pequeñas.