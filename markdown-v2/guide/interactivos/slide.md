---
title: Slide
icon: slideshow
order: 4
---

# Slide

La directiva `:::slide` convierte su contenido en un **slider automático** que rota línea por línea.

## Sintaxis

Cada línea no vacía del bloque se convierte en una diapositiva:

```md
:::slide {interval="2500"}
Sin un gran poder
No hay gran responsabilidad
El poder absoluto corrompe absolutamente
:::
```

:::slide {interval="2500"}
Sin un gran poder
No hay gran responsabilidad
El poder absoluto corrompe absolutamente
:::

## Clases y estilos

Aplica clases Tailwind o CSS al contenedor con `class`:

```md
:::slide {class="text-2xl font-bold text-center text-[#ca1414]" interval="3000"}
Primera diapositiva
Segunda diapositiva
:::
```

:::slide {class="text-2xl font-bold text-center text-[#ca1414]" interval="3000"}
Primera diapositiva
Segunda diapositiva
:::

## Estilo por línea

Usa `##{class="..."}` al final de una línea para aplicar clases individuales:

```md
:::slide {class="text-2xl font-bold text-center" interval="3000"}
Sin un gran poder ##{class="text-red-400"}
No hay gran responsabilidad ##{class="text-blue-400"}
:::
```

:::slide {class="text-2xl font-bold text-center" interval="3000"}
Sin un gran poder ##{class="text-red-400"}
No hay gran responsabilidad ##{class="text-blue-400"}
:::

## Contenido con formato

Cada línea admite markdown inline (negrita, cursiva, código, enlaces):

```md
:::slide {interval="3000"}
Bienvenido a la **guía interactiva**
Usa `código` y *cursiva* en slides
[Enlaces](https://example.com) también funcionan
:::
```

:::slide {interval="3000"}
Bienvenido a la **guía interactiva**
Usa `código` y *cursiva* en slides
[Enlaces](https://example.com) también funcionan
:::

## Velocidad personalizada

```md
:::slide {interval="3500" speed="800"}
Diapositiva lenta
Transición suave
Efecto elegante
:::
```

:::slide {interval="3500" speed="800"}
Diapositiva lenta
Transición suave
Efecto elegante
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `interval` | ms | Tiempo por diapositiva (default `3000`) |
| `speed` | ms | Duración de la transición (default `500`) |
| `class` | texto | Clases CSS adicionales aplicadas a cada diapositiva |
| `style` | CSS | Estilos inline en el contenedor |

## Notas

- Al llegar a la última diapositiva, vuelve a la primera automáticamente (loop).
- Cada línea no vacía del bloque es una diapositiva separada.
- La altura del contenedor se adapta automáticamente al contenido más alto.
- Usa `##{class="..."}` al final de una línea para estilos individuales por diapositiva.