# Admonitions — note / info / warning / danger / greentext

> Cajas de alerta coloreadas para notas, advertencias y tips.

## Sintaxis

```
:::note {title="My Note" icon="info"}
Content here
:::

:::warning Short Title
Content here
:::
```

## Variantes

| Tipo | Color | Icono default | Borde | Fondo |
|------|-------|--------------|-------|-------|
| `note` | info (azul) | `info` | `border-info/20` | `bg-info/5` |
| `info` | info (azul) | `lightbulb` | `border-info/30` | `bg-info/10` |
| `warning` | ámbar | `warning` | `border-amber-500/30` | `bg-amber-500/10` |
| `danger` | rojo | `report` | `border-danger/30` | `bg-danger/10` |
| `greentext` | verde | `subdirectory_arrow_right` | `border-success/30` | `bg-success/10` |

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | — | Título con icono |
| `icon` | `string` | por tipo | Nombre de Material icon |
| `class` | `string` | — | Clases Tailwind adicionales |
| `style` | `string` | — | CSS inline |

## Rendering

- Card rounded-2xl con borde coloreado a la izquierda
- Header: icono + título (h5, bold, flex)
- Body: `text-sm opacity-90`
- Estilado por `admonition.css` (tokens `--nr-*`); no depende de clases Tailwind

## Interacciones

- Soporta markdown completo y directivas anidadas en el body
- Customización via `class` override: `:::danger {class="bg-red-600/20 border-red-600/50"}`
