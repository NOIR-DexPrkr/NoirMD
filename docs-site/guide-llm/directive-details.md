# Details — Sección Colapsable

> Área expandible/colapsable con rotación de icono.

## Sintaxis

```
:::details {title="Click to expand" icon="expand_more" defaultOpen="true"}
Hidden content here
:::
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | `'Details'` | Título del summary |
| `icon` | `string` | `'play_arrow'` | Material icon |
| `defaultOpen` | `string` | `'false'` | Solo `"true"` (minúsculas) abre por defecto — `"1"`, `"yes"`, `"True"` NO funcionan |
| `class` | `string` | — | Clases Tailwind adicionales |
| `style` | `string` | — | CSS inline |

## Rendering

- Rounded-2xl con borde
- Icono rota 90° cuando está abierto (`transition-transform rotate-90`)
- Summary con `list-none`, hide webkit marker
- Border-top divider en el área de contenido
- **NO usa `<details>` nativo** — tiene state management custom

## Limitaciones

- No anidar details dentro de details
- Contenido crítico no debe estar SOLO en details (puede estar colapsado)
- Soporta markdown completo y directivas anidadas
