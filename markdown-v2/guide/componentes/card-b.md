---
title: Card Link
icon: link
order: 3
---

# Card Link

La directiva `:::card-b` crea una tarjeta interactiva que al hacer click **navega a una URL** en una nueva pestaña.

## Sintaxis

```md
:::card-b {title="Documentación" icon="menu_book" url="https://example.com"}

Accede a la documentación completa del proyecto.

:::
```

:::card-b {title="Documentación" icon="menu_book" url="https://example.com"}

Accede a la documentación completa del proyecto.

:::

## Con imagen

```md
:::card-b {title="GitHub" image="https://img.daisyui.com/images/stock/photo-1470071459604-3b5ec3a7fe05.webp" url="https://github.com"}

Explora el repositorio en GitHub.

:::
```

:::card-b {title="GitHub" image="https://img.daisyui.com/images/stock/photo-1470071459604-3b5ec3a7fe05.webp" url="https://github.com"}

Explora el repositorio en GitHub.

:::

## Con slot `#description`

```md
:::card-b {title="NPM" icon="inventory_2" url="https://npmjs.com"}

#description
Paquete disponible en npm.

Publicado recientemente con las últimas mejoras.

:::
```

:::card-b {title="NPM" icon="inventory_2" url="https://npmjs.com"}

#description
Paquete disponible en npm.

Publicado recientemente con las últimas mejoras.

:::

## Grid automático

Las cards `:::card-b` se agrupan en grid con `:::card` y `:::card-m`. Usa `batch="off"` para evitarlo:

```md
:::card-b {title="Docs" icon="menu_book" url="https://docs.example.com"}
Documentación oficial.
:::
:::card-b {title="GitHub" icon="code" url="https://github.com"}
Código fuente.
:::
:::card-b {title="NPM" icon="inventory_2" url="https://npmjs.com"}
Paquete npm.
:::
```

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título de la tarjeta |
| `icon` | nombre Material | Icono del título |
| `image` | URL | Imagen de banner superior |
| `url` | URL | **Requerido.** URL de destino al hacer click |
| `target` | texto | Target del enlace (por defecto `_blank`) |
| `batch` | `off` | Desactiva el agrupado en grid |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Slots

| Slot | Descripción |
| --- | --- |
| `default` | Contenido visible en la tarjeta |
| `#description` | Texto descriptivo secundario |

## Diferencia con `:::card` y `:::card-m`

| Directiva | Comportamiento al hacer click |
| --- | --- |
| `:::card` | Sin acción (tarjeta estática) |
| `:::card-m` | Abre un modal con el contenido de `#content` |
| `:::card-b` | Navega a la URL indicada en `url` |
