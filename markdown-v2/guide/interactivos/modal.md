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

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del modal |
| `label` | texto | Texto del botón de apertura (default: `title` o «Open») |
| `icon` | nombre Material | Icono del botón (default `open_in_new`) |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Interacción

- **Botón**: abre el modal (focus se mueve dentro).
- **Overlay** o botón **×**: cierra.
- **Esc**: cierra (en desktop).
- `dialog` nativo → accesible por defecto, focus trapped y `inert` al fondo.