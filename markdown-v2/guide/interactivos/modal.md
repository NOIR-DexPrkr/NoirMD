---
title: Modal
icon: open_in_full
order: 2
---

# Modal

La directiva `:::modal` crea un **diálogo modal** con su botón de apertura.

## Sintaxis

```md
:::modal {title="Confirmar borrado" label="Abrir modal" icon="delete"}
¿Seguro que quieres borrar este documento? Esta acción no se puede deshacer.

| Acción | Efecto |
| --- | --- |
| Aceptar | Borra el documento |
| Cancelar | No hace nada |
:::
```

:::modal {title="Confirmar borrado" label="Abrir modal" icon="delete"}
¿Seguro que quieres borrar este documento? Esta acción no se puede deshacer.

| Acción | Efecto |
| --- | --- |
| Aceptar | Borra el documento |
| Cancelar | No hace nada |
:::

## Contenido enriquecido

```md
:::modal {title="Notas de la versión" label="Ver novedades" icon="new_releases"}
**v2.0** — cambios principales:

- Nuevo componente `:::diff`
- Guía integrada en el editor
- Especificidad CSS corregida en imágenes
:::
```

:::modal {title="Notas de la versión" label="Ver novedades" icon="new_releases"}
**v2.0** — cambios principales:

- Nuevo componente `:::diff`
- Guía integrada en el editor
- Especificidad CSS corregida en imágenes
:::

## Alineación del botón

El botón de apertura se alinea a la izquierda por defecto. Usa el prop `align` para cambiar la alineación:

### Centrado

```md
:::modal {title="Centrado" label="Abrir" icon="open_in_full" align="center"}
Contenido del modal centrado.
:::
```

:::modal {title="Centrado" label="Abrir" icon="open_in_full" align="center"}
Contenido del modal centrado.
:::

### Alineado a la derecha

```md
:::modal {title="Derecha" label="Abrir" icon="open_in_full" align="right"}
Contenido del modal alineado a la derecha.
:::
```

:::modal {title="Derecha" label="Abrir" icon="open_in_full" align="right"}
Contenido del modal alineado a la derecha.
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del modal |
| `label` (o `title`) | texto | Texto del botón de apertura (`title` funciona como alias, default: «Open») |
| `icon` | nombre Material | Icono del botón (default `open_in_new`) |
| `align` | `left` / `center` / `right` | Alineación del botón de apertura (default `left`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Interacción

- **Botón**: abre el modal (focus se mueve dentro).
- **Overlay** o botón **×**: cierra.
- **Esc**: cierra (en desktop).
- `dialog` nativo → accesible por defecto, focus trapped y `inert` al fondo.