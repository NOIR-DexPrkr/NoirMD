---
title: Richlist
icon: playlist_play
order: 10
---

# Richlist

La directiva `:::richlist` muestra una **lista enriquecida** (`:::richlist-item`) con imagen, títulos, subtítulo e iconos.

## Sintaxis

```md
:::richlist
:::richlist-item {title="Vim" subtitle="Editor de texto" image="https://img.daisyui.com/images/stock/photo-1493863641943-9b68992a8d07.webp"}
:::
:::richlist-item {title="Git" subtitle="Control de versiones" icon="code" icon2="terminal"}
:::
:::richlist-item {title="Docker" subtitle="Contenedores" icon="deployed_code"}
:::
:::
```

:::richlist
:::richlist-item {title="Vim" subtitle="Editor de texto" image="https://img.daisyui.com/images/stock/photo-1493863641943-9b68992a8d07.webp"}
:::
:::richlist-item {title="Git" subtitle="Control de versiones" icon="code" icon2="terminal"}
:::
:::richlist-item {title="Docker" subtitle="Contenedores" icon="deployed_code"}
:::
:::

## Con iconos en ambos lados

```md
:::richlist
:::richlist-item {title="Modo oscuro" subtitle="Menos fatiga visual" icon="dark_mode" icon2="chevron_right"}
:::
:::richlist-item {title="Atajos" subtitle="Más velocidad" icon="keyboard" icon2="chevron_right"}
:::
:::richlist-item {title="Tema" subtitle="Personaliza colores" icon="palette" icon2="chevron_right"}
:::
:::
```

:::richlist
:::richlist-item {title="Modo oscuro" subtitle="Menos fatiga visual" icon="dark_mode" icon2="chevron_right"}
:::
:::richlist-item {title="Atajos" subtitle="Más velocidad" icon="keyboard" icon2="chevron_right"}
:::
:::richlist-item {title="Tema" subtitle="Personaliza colores" icon="palette" icon2="chevron_right"}
:::
:::

## Props

### `:::richlist-item`

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del elemento |
| `subtitle` | texto | Subtítulo (segunda línea) |
| `image` | URL | Imagen a la izquierda (sustituye a `icon`) |
| `icon` | nombre Material | Icono a la izquierda |
| `icon2` | nombre Material | Icono a la derecha |
| `url` | URL | El botón del `icon` abre el enlace en una pestaña nueva |
| `url2` | URL | El botón del `icon2` abre el enlace en una pestaña nueva |
| `event` | `evento: fn` | Handler del botón `icon` (función global, ver abajo) |
| `event2` | `evento: fn` | Handler del botón `icon2` (función global, ver abajo) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

### `:::richlist`

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Botones con acción

Cada botón de icono puede navegar (`url`/`url2`) o llamar a una función global (`event`/`event2`). `event` tiene prioridad sobre `url` en el mismo botón:

```md
:::richlist
:::richlist-item {title="Reproductor" subtitle="Demo de botones" icon="open_in_new" url="https://example.com" icon2="volume_up" event="click: reproducirSonido"}
El primer botón abre una pestaña nueva; el segundo ejecuta una función global al hacer clic.
:::
:::
```

:::richlist
:::richlist-item {title="Reproductor" subtitle="Demo de botones" icon="open_in_new" url="https://example.com" icon2="volume_up" event="click: reproducirSonido"}
El primer botón abre una pestaña nueva; el segundo ejecuta una función global al hacer clic.
:::
:::

### Sintaxis de `event`

```md
event="click: miFuncion"                 <!-- un solo evento -->
event="click: fn1; mouseover: fn2"       <!-- varios, separados por ; -->
event="onclick: miFuncion"               <!-- el prefijo "on" es opcional -->
```

La función se resuelve desde el **scope global** en el momento del evento y se invoca con el elemento como `this` y el evento como argumento:

```js
window.reproducirSonido = function (event) {
  console.log('Click en:', this);
};
```

:::note
Si la función no existe, el botón simplemente no hace nada (sin errores). El `event` es contenido propio del autor, con el mismo modelo de confianza que los bloques HTML crudo.
:::