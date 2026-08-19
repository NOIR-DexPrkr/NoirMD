---
title: Slide
icon: slideshow
order: 4
---

# Slide

La directiva `:::slide` convierte su contenido en un **slider automático** (diapositivas con fade).

## Sintaxis

Las secciones se separan con `---`:

```md
:::slide {interval="2500"}
## Diapositiva 1

Bienvenido a la **guía interactiva**.

---

## Diapositiva 2

Cada `---` separa una diapositiva nueva.

---

## Diapositiva 3

Y el motor se encarga del resto.
:::
```

:::slide {interval="2500"}
## Diapositiva 1

Bienvenido a la **guía interactiva**.

---

## Diapositiva 2

Cada `---` separa una diapositiva nueva.

---

## Diapositiva 3

Y el motor se encarga del resto.
:::

## Con contenido variado

```md
:::slide {interval="3500" speed="800"}
:::card {title="Card" icon="dashboard"}
Las directivas se anidan dentro.
:::
---
> **Admonición** como diapositiva
---
| Página | Tema |
| --- | --- |
| 1 | Slide |
| 2 | Loop |
:::
```

:::slide {interval="3500" speed="800"}
:::card {title="Card" icon="dashboard"}
Las directivas se anidan dentro.
:::
---
> **Admonición** como diapositiva
---
| Página | Tema |
| --- | --- |
| 1 | Slide |
| 2 | Loop |
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `interval` | ms | Tiempo por diapositiva (default `3000`) |
| `speed` | ms | Duración de la transición (default `500`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Notas

- Los puntos inferiores permiten saltar a una diapositiva.
- Al llegar a la última, vuelve a la primera automáticamente (loop).
- La barra de progreso superior muestra el avance del ciclo.