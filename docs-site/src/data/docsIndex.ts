export interface DocEntry {
  slug: string;
  title: string;
  file: string;
  description?: string;
}

export interface DocGroup {
  id: string;
  title: string;
  docs: DocEntry[];
}

export const DOC_GROUPS: DocGroup[] = [
  {
    id: 'start',
    title: 'Empezar',
    docs: [
      { slug: 'introduction', title: 'Introduction', file: 'introduction.md', description: 'Qué es NoirMD, arquitectura y entry points.' },
      { slug: 'setup-react', title: 'Setup — React', file: 'setup-react.md', description: 'Instalación y uso en proyectos React.' },
      { slug: 'setup-vue', title: 'Setup — Vue 3', file: 'setup-vue.md', description: 'Instalación y uso en proyectos Vue 3.' },
      { slug: 'setup-vanilla', title: 'Setup — Vanilla JS', file: 'setup-vanilla.md', description: 'Uso en JS puro o cualquier framework.' },
    ],
  },
  {
    id: 'syntax',
    title: 'Sintaxis',
    docs: [
      { slug: 'markdown-guide', title: 'Guía de markdown', file: 'markdown-guide.md', description: 'Markdown estándar soportado por NoirMD.' },
      { slug: 'inline-syntax', title: 'Inline Syntax', file: 'inline-syntax.md', description: 'Referencia completa de formato inline.' },
      { slug: 'block-syntax', title: 'Block Syntax', file: 'block-syntax.md', description: 'Headers, code blocks, tablas, listas.' },
      { slug: 'parser', title: 'Parser', file: 'parser.md', description: 'Orden de detección y AST.' },
    ],
  },
  {
    id: 'config',
    title: 'Configuración',
    docs: [
      { slug: 'configuracion', title: 'Configuración', file: 'configuracion.md', description: 'Props del editor y preview, modos, guía integrada, API vanilla y theming.' },
      { slug: 'styling-system', title: 'Styling System', file: 'styling-system.md', description: 'CSS variables, Tailwind y override pattern.' },
    ],
  },
  {
    id: 'advanced',
    title: 'Avanzado',
    docs: [
      { slug: 'html-raw', title: 'HTML Raw', file: 'html-raw.md', description: 'HTML nativo, <style> y <script>.' },
      { slug: 'limitaciones', title: 'Limitaciones', file: 'limitaciones.md', description: 'Restricciones de plataforma, seguridad y edge cases.' },
      { slug: 'best-practices', title: 'Best Practices', file: 'best-practices.md', description: 'Reglas, restricciones y pitfalls.' },
    ],
  },
];

export const DOC_INDEX: Record<string, DocEntry> = DOC_GROUPS.flatMap(g =>
  g.docs.map(d => [d.slug, d] as const)
).reduce((acc, [slug, entry]) => {
  acc[slug] = entry;
  return acc;
}, {} as Record<string, DocEntry>);

export const DEFAULT_SLUG = 'introduction';