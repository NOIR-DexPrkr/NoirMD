---
title: Details
icon: expand_more
order: 1
---

# Details

La directiva `:::details` crea un bloque **plegable** nativo (`<details>`), útil para respuestas largas o contenido oculto.

## Sintaxis

```md
:::details {title="¿Qué es NoirMD?"}
Editor y motor de markdown con directivas propias.
:::
```

:::details {title="¿Qué es NoirMD?"}
Editor y motor de markdown con directivas propias.
:::

## Abierto por defecto

```md
:::details {title="Atajos del editor" defaultOpen="true"}
| Atajo | Acción |
| --- | --- |
| `Ctrl+S` | Guardar |
| `Ctrl+K` | Alternar preview |
| `Ctrl+F` | Buscar |
:::
```

:::details {title="Atajos del editor" defaultOpen="true"}
| Atajo | Acción |
| --- | --- |
| `Ctrl+S` | Guardar |
| `Ctrl+K` | Alternar preview |
| `Ctrl+F` | Buscar |
:::

## Con icono

```md
:::details {title="Solución del ejercicio" icon="lightbulb"}
El código resultante:

```js
console.log('¡Resuelto!');
```
:::
```

:::details {title="Solución del ejercicio" icon="lightbulb"}
El código resultante:

```js
console.log('¡Resuelto!');
```
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto | Título del desplegable |
| `icon` | nombre Material | Icono junto al título |
| `defaultOpen` | `true` | Abierto al cargar |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

> El contenido admite markdown completo y directivas anidadas.