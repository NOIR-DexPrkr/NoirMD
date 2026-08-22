---
title: Bloques HTML
icon: code_off
order: 1
---

# Bloques HTML

NoirMD permite escribir **HTML crudo** directamente en el markdown. Según la etiqueta, el comportamiento varía.

## CSS global con `<style>`

Escribe un bloque `<style>` para inyectar CSS en el documento. El contenido se extrae automáticamente y se inserta en el `<head>` del DOM.

```md
<style>
.mi-clase {
  background: #f1f5f9;
  border-radius: 10px;
  padding: 1rem;
}
</style>
```

<style>
.nr-demo-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--color-accent-primary, #0ea5e9) 10%, transparent);
}
.nr-demo-box > div {
  padding: 1rem;
  border-radius: 8px;
  background: var(--color-background-secondary-solid, #1e293b);
}
</style>

<div class="nr-demo-box">
<div>**A**</div>
<div>**B**</div>
</div>

> El CSS se aplica al **documento renderizado completo**, no solo al bloque. Define clases una vez y úsalas después en cualquier etiqueta HTML.

## HTML inline

Cualquier etiqueta HTML escrita directamente en el markdown se renderiza sin procesar como markdown. El contenido dentro se preserva tal cual.

```md
<div style="text-align: center; padding: 1rem; border: 1px solid #334155; border-radius: 10px;">
  HTML escrito a mano funciona tal cual.
</div>
```

<div style="text-align: center; padding: 1rem; border: 1px solid #334155; border-radius: 10px;">
  HTML escrito a mano funciona tal cual.
</div>

## Elementos interactivos nativos

```md
<details class="nr-details">
  <summary>Detalle nativo con <b>HTML</b></summary>
  <p>Los atributos, estilos y eventos se conservan intactos.</p>
</details>
```

<details class="nr-details">
  <summary>Detalle nativo con <b>HTML</b></summary>
  <p>Los atributos, estilos y eventos se conservan intactos.</p>
</details>

## Scripts

Los bloques `<script>` se ejecutan automáticamente al renderizar:

```md
<script>
  console.log('Este script se ejecuta al renderizar');
</script>
```

> ⚠️ Al ser HTML y scripts sin filtrar, úsalos solo con contenido de confianza.

## Cuándo usar bloques HTML

- Insertar embeds (`iframe`, `video`, widgets externos).
- Estructuras que el markdown no cubre (layouts complejos, formularios nativos).
- Inyectar CSS reutilizable con `<style>`.
- Prototipar HTML antes de convertirlo a directiva.
