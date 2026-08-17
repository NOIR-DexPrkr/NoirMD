# Best Practices — Reglas y Restricciones

> Guías para generar contenido CNR-Paste V2 correcto y bien estructurado.

## Reglas Generales

### Siempre

1. **Cierra cada directiva** con `:::` en su propia línea
2. **Usa `{props}`** para props explícitos, short-form para títulos simples
3. **Usa `#slotname`** para regiones de contenido nombradas (solo al nivel superior)
4. **Líneas en blanco** dentro de tags HTML para procesar markdown
5. **CSS variables** (`var(--color-*)`) para estilos del tema
6. **Mantén directivas simples** — un propósito claro por directiva

### Nunca

1. ❌ Dejes directivas sin cerrar
2. ❌ Pongas `#slot` dentro de directivas anidadas
3. ❌ Mezcles sintaxis V1 (args posicionales) con V2 (props)
4. ❌ Uses `:::div` cuando `<div>` nativo funciona (prefiere HTML en V2)
5. ❌ Uses `<style>` para estilos de componentes (todo `<style>` es global)
6. ❌ Pongas información crítica SOLO en modales o details
7. ❌ Uses `!important` salvo que sea absolutamente necesario
8. ❌ Uses grid/flex en un contenedor que contiene `:::card` — las cards ya tienen su propio flex-wrap. Solo usa tu propio grid si desactivas el wrapper con `batch="off"`
9. ❌ Pongas directivas dentro de `<div class="flex-1">` o hijos de flex/grid — las directivas tienen su propio padding, bordes y rounded corners que pueden quebrar el layout del contenedor padre

## Uso de Directivas

### Admonitions

- Usa `note` para información general
- Usa `warning` para notas cautelares
- Usa `danger` para errores críticos o acciones destructivas
- Usa `greentext` para mensajes de éxito o resultados positivos
- Short-form para títulos rápidos: `:::note Quick Title`
- Customiza colores con `class="bg-*/10 border-*/30 text-*"`

### Cards

- Coloca cards consecutivas para auto-flex-wrap
- Usa `batch="off"` para cards aisladas
- `card-m` para contenido expandible via modal
- `card-b` como link button (requiere `url`)
- `#description` para texto corto en todas las variantes
- `#content` solo en `card-m` para contenido modal detallado

### Button/Modal

- Usa `label` para botones individuales
- Usa slot para múltiples links
- `icon` para contexto visual

### Slide

- Mantén líneas cortas para legibilidad
- Ajusta `interval` para velocidad de lectura (3000-5000ms típico)
- Contenido largo en slides dificulta la legibilidad

### Wrapper

- Usa `<div>` nativo en vez de `:::div` en contenido V2 nuevo
- `:::div` principalmente para compatibilidad V1

## HTML & CSS

### Layout: HTML vs Directivas

**Regla fundamental:** HTML+Tailwind es para **visual** (colores, bordes, spacing). Las directivas son para **componentes** (cards, admoniciones, modales). **No mezcles ambos para layout.**

- ✅ **HTML puro + Tailwind** para layouts complejos (grid, flex, positioning)
- ✅ **Directivas** para contenido con comportamiento (cards, modales, details)
- ❌ **Directivas dentro de flex/grid containers** — las directivas tienen su propio estilo que puede quebrar el layout del padre
- ❌ **Grid/flex sobre cards consecutivas** — el auto-batching ya maneja el layout

**Cuándo usar cada uno:**
- Layout visual simple → `<div class="flex gap-4">` + markdown interno
- Componentes interactivos → directivas (`:::card`, `:::note`, etc.)
- Layout complejo con contenido mixto → HTML puro + Tailwind, sin directivas

### Estilos

- **`<style>`** inyecta CSS global en `<head>` — sin scope, sin rewrite
- CSS variables para theme-aware: `var(--color-*)`
- Tailwind para layout estático, CSS custom para keyframes/animaciones
- Deja líneas en blanco dentro de tags HTML para procesar markdown

### Footer

- El footer global es hermano flex de `<main>`, **fuera** del article
- Usa `mt-auto` para pegarse al fondo
- **Nunca lo cubras** con `z-index`, `position: fixed`, etc.
- Si cambias el body con `<style>`, respeta el footer
- Footer local (si lo usas) es un `:::div` al final del paste

## Estructura del Contenido

### Flujo del Documento

1. **Título** — `# H1` para el título principal
2. **Secciones** — `## H2` para secciones mayores
3. **Subsecciones** — `### H3` para subsecciones
4. **Contenido** — párrafos, listas, code blocks, directivas

### Jerarquía Visual

Mantén una jerarquía clara: H1 → H2 → H3. Usa admoniciones para callouts, cards para features, details para FAQs.

## Checklist de Entrega

- [ ] Cada `:::type` tiene su `:::` de cierre
- [ ] Props en formato `key="value"`
- [ ] Slots `#name` al nivel superior
- [ ] HTML tiene líneas en blanco para markdown
- [ ] Cards consecutivas para auto-flex-wrap
- [ ] Jerarquía visual clara
- [ ] Inline formatting correctamente anidado
- [ ] Imágenes con modificadores de posición correctos
- [ ] Tablas con fila separadora `---`
- [ ] Footer global no está obstructado
- [ ] CSS se inyecta globalmente via `<style>`
