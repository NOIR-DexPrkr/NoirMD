---
title: Wrapper Directives
icon: crop_free
order: 1
---

# Wrapper Directives

Las directivas `:::div`, `:::style`, `:::custom` y `:::raw` son wrappers genéricos para **envolver contenido** con clases, estilos y atributos personalizados.

## `:::div` — Div genérico

Envuelve contenido en un `<div>` con clases, id, estilos y atributos `data-*`.

```md
:::div {class="mi-clase" id="seccion" style="padding: 2rem; background: #f0f0f0"}

Contenido **markdown** aquí.

:::
```

:::div {class="mi-clase" id="seccion" style="padding: 2rem; background: #f0f0f0"}

Contenido **markdown** aquí.

:::

## `:::style` — Inyectar CSS

Inyecta un bloque `<style>` global. Útil para estilos que afectan múltiples componentes.

```md
:::style
.nr-mi-clase { color: red; }
:::
```

## `:::custom` — Elemento personalizado

Similar a `div`, pero permite crear cualquier elemento HTML.

## `:::raw` — HTML crudo

Renderiza contenido HTML sin procesar.

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `class` | texto | Clases CSS (soporta `.shorthand` también) |
| `id` | texto | ID del elemento |
| `style` | CSS inline | Estilos inline (se aplica con `setProperty`, no sobreescribe otros estilos) |
| `data-*` | texto | Cualquier atributo `data-*` se aplica al elemento |

## Shorthands

```md
:::div {.mi-clase #mi-id}

Igual que usar `class="mi-clase" id="mi-id"`.

:::
```
