# NoirMD — Agent Instructions

> Instrucciones para agentes AI que trabajan en el repositorio NoirMD. Sigue estos pasos en cada cambio.

## Estructura del repositorio

```
NoirMD/
├── markdown-v2/          # Paquete principal (@noirmd/previewer)
│   ├── core/             # Parser, tipos, utilidades
│   ├── vanilla/          # Motor de renderizado DOM (el corazón)
│   │   ├── directives/   # Implementación de cada directiva
│   │   ├── *.css         # Estilos por componente
│   │   ├── renderer.ts   # Pipeline principal de renderizado
│   │   └── components.ts # Componentes reutilizables
│   ├── react/            # Wrapper React (thin layer)
│   ├── vue/              # Wrapper Vue (thin layer)
│   ├── guide/            # Documentación interactiva (markdown)
│   │   ├── componentes/  # Guías de cada componente
│   │   └── build.mjs     # Genera guide/index.ts
│   ├── test/             # Editor de prueba
│   │   ├── main.jsx      # Contenido de prueba (markdown sample)
│   │   └── build.mjs     # Genera test/bundle.js
│   ├── dist/             # Build output (no editar directamente)
│   └── package.json
├── docs-site/            # Documentación web
│   └── public/llms.txt   # Documentación para LLMs
└── AGENTS.md             # Este archivo
```

## Checklist de cambios

Cuando modifiques cualquier componente o directiva, sigue estos pasos **en orden**:

### 1. Implementar el cambio

- **Directiva**: edita `markdown-v2/vanilla/directives/<nombre>.ts`
- **Estilos**: edita `markdown-v2/vanilla/<nombre>.css`
- **Renderer**: edita `markdown-v2/vanilla/renderer.ts` (solo si afecta el batching o el pipeline)
- **Parser**: edita `markdown-v2/core/parser.ts` (solo si cambia la sintaxis)

### 2. Actualizar la guía del componente

Edita `markdown-v2/guide/componentes/<nombre>.md`:
- Actualiza la tabla de props si hay nuevos props
- Actualiza la tabla de slots si hay nuevos slots
- Añade ejemplos que demuestren el cambio
- Los ejemplos deben usar `#description` para descripciones en cards (no el slot default)
- Los ejemplos de código en la guía usan backticks escapados: `\`\`\`md`

### 3. Actualizar llms.txt

Edita `docs-site/public/llms.txt`:
- Actualiza la sección del componente afectado
- Añade nuevos props a la descripción
- Mantén el formato consistente (tablas, listas)

### 4. Actualizar AGENTS.md (este archivo)

Si el cambio introduce nuevas convenciones, patrones o pasos:
- Añade la convención en la sección correspondiente
- Actualiza la estructura del repositorio si se crearon nuevas carpetas
- Actualiza el checklist si hay nuevos pasos obligatorios

### 5. Build de la guía

```bash
cd markdown-v2
npm run guide:build
```

Esto regenera `guide/index.ts` con los cambios de la guía.

### 6. Build de la librería

```bash
cd markdown-v2
npm run build
```

Esto compila TypeScript, CSS y genera los archivos en `dist/`.

### 7. Build del test (opcional)

Si el usuario quiere probar los cambios:

```bash
cd markdown-v2
npm run test:editor
```

Esto genera `test/bundle.js`. El usuario puede abrir `test/index.html` en un navegador.

**Nota**: `npm run test:editor` ya ejecuta `guide:build` automáticamente (via `pretest:editor`), pero es mejor ejecutar `guide:build` explícitamente para asegurar que la guía se actualiza.

## Convenciones

### Directivas

- Todas las directivas usan el patrón `:::type {props} ... :::`
- Los props se parsean como `key="value"` en el bloque `{...}`
- El contenido se divide en slots mediante líneas `#slotname` al inicio
- Los slots comunes: `default`, `#description`, `#content`

### CSS

- Clases usan prefijo `nr-` (NoirMD)
- Nomenclatura BEM: `.nr-component__element--modifier`
- Variables CSS: `--nr-*` para tokens del tema
- Colores del tema: `--nr-accent`, `--nr-secondary`, `--nr-info`, `--nr-success`, `--nr-warning`, `--nr-danger`

### Colores arbitrarios

Los componentes que aceptan `color` soportan dos modos:
1. **Tokens del tema**: `primary`, `secondary`, `info`, `success`, `warning`, `error` → clases CSS
2. **Colores CSS arbitrarios**: `blue`, `#ff0000`, `rgb(255,0,0)`, `oklch(...)` → inline styles

Implementación: detectar si el valor es un token conocido; si no, aplicar inline style.

### Grid de cards

Las cards usan CSS Grid (no flex) para igualar alturas:
```css
.nr-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
}
```

El prop `align` controla `justify-items`: `left` (default), `center`, `right`.

### Batching automático

Las directivas consecutivas del mismo tipo se agrupan automáticamente:
- `card`, `card-m`, `card-b` → `.nr-card-grid`
- `stat` → `.nr-stat-grid`

Usa `batch="off"` para desactivar.

## Archivos de memoria

- `/memories/` — Notas persistentes del usuario
- `/memories/session/` — Notas de la sesión actual
- `/memories/repo/` — Notas del repositorio (convenciones, build commands, etc.)
