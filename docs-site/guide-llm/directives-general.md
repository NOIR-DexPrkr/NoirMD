# Directivas — Sistema General

> Cómo funciona el sistema de directivas V2: sintaxis, props, slots, shorthands, nesting, y el patrón de override.

## Sintaxis Básica

```
:::type {key="value" key2="value2"}
Content here
:::
```

### Short-form

Sin bloque `{}`, el texto después del tipo se convierte en prop `title`:

```
:::note My Quick Title
→ :::note {title="My Quick Title"}
```

## Props

### Shorthands

| Sintaxis | Equivalente |
|----------|------------|
| `.className` | `{ class: "className" }` |
| `.class1 .class2` | `{ class: "class1 class2" }` |
| `#my-id` | `{ id: "my-id" }` |

Combinado: `{.flex .gap-4 #my-id}` → `{ class: "flex gap-4", id: "my-id" }`

## Slots

Los slots dividen el contenido en regiones nombradas usando marcadores `#slotname`.

**Reglas de slots:**
1. **Solo al nivel superior** — `#slot` dentro de `:::child ... :::` NO crea un nuevo slot
2. Contenido antes del primer slot → slot `default`
3. Slots vacíos se eliminan automáticamente
4. Nombres comunes: `#description`, `#content`, `#default`

El `renderSlot(name)` parsea el contenido del slot como markdown completo, incluyendo formato inline, listas, tablas, y directivas anidadas.

## Nesting

Las directivas pueden anidarse. El parser trackea `nestedLevel` — el `:::` exterior solo cierra cuando todos los interiores están cerrados.

**Directivas sin cerrar** → se renderizan como párrafos de texto plano.

## Patrón de Override

Todas las directivas soportan props `class` y `style` para customización.

**Cómo funciona:** El prop `class` se **anexa** después de las clases default del componente. Dado que CSS sigue source order, la última clase gana para propiedades conflictivas.

El prop `style` acepta un string CSS que se parsea en un objeto de estilos vía `parseCssString()`.

## Estilado de Button & Modal

Button y Modal se estilizan con clases CSS propias (`button.css`, `modal.css`), no con clases Tailwind:

```
nr-button nr-button--default
```

El prop `class` se **anexa** después de los defaults — la última clase gana para propiedades conflictivas.

## Data Attributes

La directiva Wrapper soporta atributos `data-*` arbitrarios:

```
:::div {data-tab="1" data-panel="settings"}
```

## Auto-batching de Cards

Cuando múltiples `card`, `card-m`, o `card-b` aparecen consecutivos, se agrupan automáticamente en un flex-wrap responsive.

**Desactivar batching:** `batch="off"` en la primera card.

**Justificación:** El batching envuelve las cards consecutivas en un contenedor `.nr-card-grid` (flex-wrap). Usa `batch="off"` en la primera card si necesitas tu propio layout.

## Registry de Directivas

| String | Componente | Categoría |
|--------|-----------|-----------|
| `note`, `info`, `warning`, `danger`, `greentext` | AdmonitionDirective | Admoniciones |
| `card`, `card-m`, `card-b` | CardDirective | Cards |
| `details` | DetailsDirective | Interactivo |
| `modal` | ModalDirective | Interactivo |
| `button` | ButtonDirective | Interactivo |
| `div`, `style`, `custom`, `raw` | WrapperDirective | Layout |
| `slide` | SlideDirective | Animación |

## Directivas Desconocidas

Si un tipo no está en el registry, se renderiza como un `<div>` con la clase `nr-unknown-directive` y el contenido del slot default:

```html
<div class="nr-unknown-directive">
  {contenido del slot default}
</div>
```
