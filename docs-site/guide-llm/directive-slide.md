# Slide — Carousel de Texto

> Carousel de texto con animación slide-up. Cada línea se parsea independientemente.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `class` | `string` | `''` | Clases Tailwind para contenedor |
| `style` | `string` | — | CSS inline |
| `interval` | `string` | `'3000'` | Milisegundos entre rotaciones |
| `speed` | `string` | `'500'` | Duración de transición en ms |

## Parsing por Línea

Cada línea no vacía se parsea **independientemente** como markdown. Esto significa que cada slide soporta formato inline, y hasta headers.

## Height Dinámico

El componente mide TODOS los elementos de slide y usa la **altura máxima** como altura fija del contenedor. Esto previene saltos de layout durante la rotación.

## Rendering

- Contenedor overflow-hidden con altura fija
- Inner track animado con `translateY` (`transition: transform {speed}ms`)
- Cada slide verticalmente centrado (`display: flex; align-items: center`)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

## Limitaciones

- **Cada línea se parsea independientemente** — NO funcionan constructos multi-línea (tablas, listas, code blocks, directivas)
- Si solo hay 1 línea, no hay rotación — se muestra estáticamente
- Líneas vacías se filtran — no hay slides de "pausa"
- Contenido largo en slides dificulta la legibilidad
- `speed` muy rápido (< 200ms) se siente brusco
- Contenido crítico no debe estar SOLO en slides
