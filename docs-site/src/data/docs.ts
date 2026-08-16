import { DOC_INDEX } from './docsIndex';

const rawModules = import.meta.glob('../../guide-llm/*.md', {
  query: '?raw',
  import: 'default',
});

const loaders: Record<string, () => Promise<string>> = {};

for (const [path, load] of Object.entries(rawModules)) {
  const fileName = path.split('/').pop() || '';
  loaders[fileName] = load as () => Promise<string>;
}

export async function loadDoc(slug: string): Promise<string> {
  const entry = DOC_INDEX[slug];
  if (!entry) throw new Error(`Doc desconocido: ${slug}`);
  const load = loaders[entry.file];
  if (!load) throw new Error(`Archivo no encontrado: ${entry.file}`);
  return load();
}

export function getDoc(slug: string) {
  return DOC_INDEX[slug];
}