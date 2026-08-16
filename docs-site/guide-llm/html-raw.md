# HTML Raw — HTML Nativo, `<style>`, `<script>`

> Cómo funcionan los bloques HTML raw en el renderer V2.

## HTML Blocks

El parser V2 detecta bloques HTML y parsea recursivamente el contenido interno como markdown.

**Reglas:**
1. **Líneas en blanco** dentro de tags HTML para procesar markdown
2. Void elements (`br`, `img`, `input`, `hr`, etc.) se manejan inline
3. Tags no-void usan matching nesting-aware para encontrar `</tag>`
4. Contenido interno se parsea via `parseMarkdown()`

## `<style>` Injection

Todo bloque `<style>` se inyecta como **CSS global en `<head>`**, independientemente de si usa `scoped`, `paste`, `global`, o ningún atributo. El CSS se limpia automáticamente al desmontar el componente.

**No hay reescritura de selectores** — tu CSS se aplica tal cual.

## `<script>` Execution

Los scripts se re-ejecutan tras cada renderizado porque `RawHtmlRenderer` **reemplaza** los nodos `<script>` después de montar el DOM.

## Tailwind Re-scan

Después de renderizar contenido HTML dinámico, `window.tailwind.scan()` se llama para detectar nuevas clases de Tailwind en el HTML dinámicamente añadido.

## Tailwind CDN

El renderer auto-inyecta el **Tailwind Play CDN** en runtime.

**Configuración:**
- `darkMode: 'class'`
- `corePlugins: { preflight: false }` — no sobreescribe estilos base de la app
- Colores extendidos del tema: `bg-background-primary`, `text-accent-primary`, `border-border`, etc.

**Limitaciones:**
- Preflight deshabilitado intencionalmente
- No soporta plugins de Tailwind (excepto Typography básico)
- El CDN resuelve clases en runtime — puede haber delay inicial
- Classes construidas dinámicamente pueden no resolverse

## Interacciones

- HTML blocks pueden contener directivas anidadas (`:::note`, `:::card`, etc.)
- El contenido HTML se parsea recursivamente como markdown
- Scripts inline y `<script>` blocks ambos funcionan
- `<style>` se inyecta globalmente, no tiene scope
- CSS variables del tema (`var(--color-*)`) funcionan dentro de HTML blocks

**⚠️ `<style>` y `<script>` van al token `html` (RawHtmlRenderer)**, NO al token `html-block`. Esto significa que su contenido NO se parsea como markdown — se renderiza raw.

**⚠️ Tags HTML sin cerrar se tratan como self-closing** — `<div>` sin `</div>` solo toma el tag de apertura, el contenido después se parsea normalmente. No consume el resto del documento.

**⚠️ Los atributos se aplican tal cual con el DOM API** (no hay renombrado de atributos estilo React: `class`, `for`, `tabindex` se aplican como atributos HTML nativos).

### ⚠️ Directivas dentro de containers flex/grid

Las directivas (`:::note`, `:::card`, `:::info`, etc.) tienen su propio padding, bordes, rounded corners, y anchos fijos. Cuando las pones dentro de un hijo de flex (`<div class="flex-1">`) o grid (`<div class="grid-child">`), el estilo de la directiva puede:

- No llenar la altura del contenedor padre (dejando espacio vacío)
- Romper la alineación del layout
- Crear UI/UX defectuoso en pantallas intermedias

**Solución:** Si necesitas layout flex/grid con contenido visual, usa HTML puro + Tailwind sin directivas. Si necesitas la funcionalidad de la directiva (modal, admonición), ponla fuera del flex/grid container.

**Ejemplo problemático:**
```html
<div class="flex gap-4">
  <div class="flex-1"> contenido markdown </div>
  <div class="flex-1"> :::info {class="h-full"} ... ::: </div>  ← MAL: la directiva no llena flex-1
</div>
```

**Solución:** Usa un div con markdown inline en vez de la directiva, o pon la directiva fuera del flex.
