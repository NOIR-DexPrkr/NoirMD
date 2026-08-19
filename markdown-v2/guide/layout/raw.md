---
title: Raw (HTML)
icon: code_off
order: 3
---

# Raw (HTML)

La directiva `:::raw` (o su alias `:::custom`) inserta **HTML puro** sin procesar en el documento.

## Sintaxis

```md
:::raw
<div style="text-align: center; padding: 1rem; border: 1px solid #334155; border-radius: 10px;">
  HTML escrito a mano funciona tal cual.
</div>
:::
```

:::raw
<div style="text-align: center; padding: 1rem; border: 1px solid #334155; border-radius: 10px;">
  HTML escrito a mano funciona tal cual.
</div>
:::

## Elementos interactivos

```md
:::raw
<details class="nr-details">
  <summary>Detalle nativo con <b>HTML</b></summary>
  <p>Los atributos, estilos y eventos se conservan intactos.</p>
</details>
:::
```

:::raw
<details class="nr-details">
  <summary>Detalle nativo con <b>HTML</b></summary>
  <p>Los atributos, estilos y eventos se conservan intactos.</p>
</details>
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Cuándo usar `raw`

- Insertar embeds (`iframe`, `video`, widgets).
- Marcar up estructuras que el markdown no cubre.
- Prototipar HTML antes de convertirlo a directiva.

> ⚠️ Al ser HTML sin filtrar, úsalo solo con contenido de confianza.