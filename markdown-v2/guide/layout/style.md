---
title: Style (CSS)
icon: palette
order: 2
---

# Style (CSS)

La directiva `:::style` inyecta **CSS global** al documento renderizado.

## Sintaxis

```md
:::style
.mi-clase {
  background: #f1f5f9;
  border-radius: 10px;
  padding: 1rem;
}
:::
```

## Ejemplo combinado con div

```md
:::style
.box-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--color-accent-primary, #0ea5e9) 10%, transparent);
}
.box-demo > div {
  padding: 1rem;
  border-radius: 8px;
  background: var(--color-background-secondary-solid, #1e293b);
}
:::

:::div {.box-demo}
**A**

---
**B**
:::
```

:::style
.box-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--color-accent-primary, #0ea5e9) 10%, transparent);
}
.box-demo > div {
  padding: 1rem;
  border-radius: 8px;
  background: var(--color-background-secondary-solid, #1e293b);
}
:::

:::div {.box-demo}
**A**

---
**B**
:::

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Notas

- El CSS se aplica al **documento renderizado completo**, no solo al bloque.
- Define clases una vez al principio y úsalas después con `:::div` o props `class`.
- Dispones de las variables de tema del editor: `--color-background-primary`, `--color-text-primary`, `--color-accent-primary`, `--color-border`, etc.