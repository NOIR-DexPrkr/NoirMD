import { CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import { EditorView } from '@codemirror/view';

// ── NoirMD directive types (español) ──

const DIRECTIVES: { label: string; detail: string; info: string; snippet: string }[] = [
  // Admoniciones
  { label: 'note', detail: 'Admonición — nota', info: 'Caja de información neutral. Props: title, icon', snippet: 'note {title="$0"}\n\n:::' },
  { label: 'info', detail: 'Admonición — info', info: 'Información (ícono de bombilla). Props: title, icon', snippet: 'info {title="$0"}\n\n:::' },
  { label: 'warning', detail: 'Admonición — warning', info: 'Caja de precaución ámbar. Props: title, icon', snippet: 'warning {title="$0"}\n\n:::' },
  { label: 'danger', detail: 'Admonición — danger', info: 'Caja de error/crítico roja. Props: title, icon', snippet: 'danger {title="$0"}\n\n:::' },
  { label: 'greentext', detail: 'Admonición — greentext', info: 'Cita estilo foro verde. Props: title, icon', snippet: 'greentext {title="$0"}\n\n:::' },
  // Tarjetas
  { label: 'card', detail: 'Tarjeta estática', info: 'Tarjeta con ícono, título y contenido markdown. Props: title, icon, image, align', snippet: 'card {title="$0" icon=""}\n\n#description\n\n:::' },
  { label: 'card-m', detail: 'Tarjeta modal', info: 'Click abre modal con slot #content. Props: title, icon, image', snippet: 'card-m {title="$0" icon=""}\n\n#description\n\n#content\n\n:::' },
  { label: 'card-b', detail: 'Tarjeta enlace', info: 'Click navega a url. Props: title, icon, image, url (requerido)', snippet: 'card-b {title="$0" icon="" url=""}\n\n#description\n\n:::' },
  // Interactivos
  { label: 'details', detail: 'Sección colapsable', info: 'Sección colapsable. Props: title, icon, defaultOpen', snippet: 'details {title="$0" icon="expand_more"}\n\n:::' },
  { label: 'modal', detail: 'Diálogo modal', info: 'Modal nativo con botón trigger. Props: title, label, icon, color', snippet: 'modal {title="$0" label="Abrir" icon="open_in_full"}\n\n:::' },
  { label: 'button', detail: 'Botón/enlace', info: 'Botón/enlace con ícono. Props: label, url, icon, color, target', snippet: 'button {label="$0" url="" icon="touch_app" color="primary"}' },
  { label: 'slide', detail: 'Carrusel de texto', info: 'Carrusel de texto auto-avanzando. Props: interval, speed. Una línea = un slide', snippet: 'slide {interval="$0" speed="500"}\n\n:::' },
  // Componentes
  { label: 'keys', detail: 'Teclas de teclado', info: 'Muestra teclas de teclado. Se divide por +. Prop: size (xs/sm/md/lg/xl)', snippet: 'keys {size="$0"}' },
  { label: 'accordion', detail: 'Contenedor accordion', info: 'Acordeón colapsable. Prop: mode (radio/checkbox)', snippet: 'accordion {mode="$0"}\n\n:::' },
  { label: 'accordion-item', detail: 'Item del accordion', info: 'Item dentro de accordion. Props: title, checked', snippet: 'accordion-item {title="$0"}' },
  { label: 'carousel', detail: 'Carrusel de imágenes', info: 'Carrusel con flechas, puntos y loop infinito. Props: height, aspect', snippet: 'carousel {height="$0"}\n\n:::' },
  { label: 'countdown', detail: 'Temporizador', info: 'Countdown estático o en vivo. Props: days, hours, min, sec, target', snippet: 'countdown {days="$0" hours="1" min="30" sec="0"}' },
  { label: 'diff', detail: 'Comparador antes/después', info: 'Slider de comparación de imágenes. Props: before, after, height', snippet: 'diff {height="$0"}\n\n:::' },
  { label: 'hover-3d', detail: 'Tarjeta 3D tilt', info: 'Tarjeta 3D que sigue el cursor. Contenido: HTML o markdown', snippet: 'hover-3d\n\n$0\n\n:::' },
  { label: 'hover-gallery', detail: 'Galería hover', info: 'Galería grid — imágenes se expanden al hacer hover. Prop: aspect', snippet: 'hover-gallery {aspect="$0"}\n\n:::' },
  { label: 'chat', detail: 'Burbujas de chat', info: 'Contenedor de burbujas de chat. Contiene :::chat-item', snippet: 'chat\n\n$0\n\n:::' },
  { label: 'chat-item', detail: 'Mensaje de chat', info: 'Mensaje dentro de chat. Props: side, name, time, avatar, color', snippet: 'chat-item {side="$0" name=""}' },
  { label: 'richlist', detail: 'Lista enriquecida', info: 'Lista con avatares/acciones. Contiene :::richlist-item', snippet: 'richlist\n\n$0\n\n:::' },
  { label: 'richlist-item', detail: 'Item de lista', info: 'Item dentro de richlist. Props: title, subtitle, image, icon', snippet: 'richlist-item {title="$0" subtitle=""}' },
  { label: 'stat', detail: 'Tarjeta de estadística', info: 'Ícono, valor, descripción. Props: title, value, desc, icon, color', snippet: 'stat {title="$0" value="" desc="" icon="" color="primary"}' },
];

// ── Slot completions (español) ──

const SLOTS = [
  { label: '#description', detail: 'Slot — descripción', info: 'Contenido del slot de descripción' },
  { label: '#content', detail: 'Slot — contenido', info: 'Slot de contenido (usado por card-m, modal)' },
  { label: '#default', detail: 'Slot — predeterminado', info: 'Contenido del slot predeterminado' },
];

// ── Props universales (todas las directivas) ──

const UNIVERSAL_PROPS = [
  { label: 'class', detail: 'texto', info: 'Clase CSS adicional', type: 'property' as const },
  { label: 'style', detail: 'texto', info: 'Estilos CSS inline', type: 'property' as const },
];

function p(label: string, detail: string, info: string) {
  return {
    label, detail, info, type: 'property' as const,
    apply(view: EditorView, completion: any, from: number, to: number) {
      const insert = `${label}=""`;
      const cursorOffset = from + label.length + 2; // after key="
      view.dispatch({
        changes: { from, to, insert },
        selection: { anchor: cursorOffset },
      });
      return true;
    },
  };
}

// ── Props por directiva (español) ──

const DIRECTIVE_PROPS: Record<string, { label: string; detail: string; info: string; type: 'property' }[]> = {
  // Admoniciones: todas comparten title, icon
  note:      [p('title', 'texto', 'Título de la nota'), p('icon', 'texto', 'Ícono Material')],
  info:      [p('title', 'texto', 'Título informativo'), p('icon', 'texto', 'Ícono Material')],
  warning:   [p('title', 'texto', 'Título de advertencia'), p('icon', 'texto', 'Ícono Material')],
  danger:    [p('title', 'texto', 'Título de peligro'), p('icon', 'texto', 'Ícono Material')],
  greentext: [p('title', 'texto', 'Título de cita verde'), p('icon', 'texto', 'Ícono Material')],

  // Cards
  card:    [p('title', 'texto', 'Título de la tarjeta'), p('icon', 'texto', 'Ícono Material'), p('image', 'url', 'URL de imagen banner'), p('align', 'left|center|right', 'Alineación del contenido'), p('batch', 'on|off', 'Auto-agrupar con tarjetas vecinas')],
  'card-m': [p('title', 'texto', 'Título de la tarjeta'), p('icon', 'texto', 'Ícono Material'), p('image', 'url', 'URL de imagen banner'), p('align', 'left|center|right', 'Alineación del contenido'), p('batch', 'on|off', 'Auto-agrupar con tarjetas vecinas')],
  'card-b': [p('title', 'texto', 'Título de la tarjeta'), p('icon', 'texto', 'Ícono Material'), p('image', 'url', 'URL de imagen banner'), p('url', 'url (requerido)', 'URL de destino al hacer click'), p('target', 'texto', 'Target del enlace (_blank, etc.)'), p('align', 'left|center|right', 'Alineación del contenido'), p('batch', 'on|off', 'Auto-agrupar con tarjetas vecinas')],

  // Interactivos
  details:  [p('title', 'texto', 'Título del encabezado'), p('icon', 'texto', 'Ícono Material'), p('defaultOpen', 'true|false', 'Iniciar abierto')],
  modal:    [p('title', 'texto', 'Título del modal'), p('label', 'texto', 'Texto del botón trigger'), p('icon', 'texto', 'Ícono del botón (open_in_full)'), p('color', 'token|color', 'Color del botón'), p('align', 'left|center|right', 'Alineación del contenido')],
  button:   [p('label', 'texto', 'Texto del botón'), p('url', 'url', 'URL de destino'), p('icon', 'texto', 'Ícono Material'), p('color', 'token|color', 'Color del botón'), p('target', 'texto', 'Target del enlace'), p('align', 'left|center|right', 'Alineación')],
  slide:    [p('interval', 'número (ms)', 'Tiempo entre slides'), p('speed', 'número (ms)', 'Velocidad de transición')],

  // Componentes
  keys:          [p('size', 'xs|sm|md|lg|xl', 'Tamaño de las teclas')],
  accordion:     [p('mode', 'radio|checkbox', 'Comportamiento de apertura')],
  'accordion-item': [p('title', 'texto', 'Título del item'), p('checked', 'true|false', 'Iniciar abierto')],
  carousel:      [p('height', 'texto', 'Altura del carrusel'), p('aspect', 'texto', 'Relación de aspecto'), p('width', 'texto', 'Ancho del carrusel'), p('float', 'left|right|center', 'Posición flotante')],
  countdown:     [p('days', 'número', 'Días'), p('hours', 'número', 'Horas'), p('min', 'número', 'Minutos'), p('sec', 'número', 'Segundos'), p('target', 'fecha ISO', 'Fecha objetivo (countdown en vivo)'), p('labels', 'texto', 'Etiquetas personalizadas'), p('digits', 'texto', 'Formato de dígitos')],
  diff:          [p('before', 'url', 'URL imagen antes'), p('after', 'url', 'URL imagen después'), p('height', 'texto', 'Altura del slider'), p('aspect', 'texto', 'Relación de aspecto'), p('width', 'texto', 'Ancho'), p('float', 'left|right|center', 'Posición flotante')],
  'hover-3d':    [],
  'hover-gallery': [p('aspect', 'texto', 'Relación de aspecto de las imágenes')],
  chat:          [],
  'chat-item':    [p('side', 'start|end', 'Lado del mensaje'), p('name', 'texto', 'Nombre del remitente'), p('time', 'texto', 'Hora del mensaje'), p('avatar', 'url', 'URL del avatar'), p('color', 'token|color', 'Color del avatar/burbuja'), p('footer', 'texto', 'Texto del pie')],
  richlist:      [],
  'richlist-item': [p('title', 'texto', 'Título principal'), p('subtitle', 'texto', 'Subtítulo'), p('image', 'url', 'URL de imagen'), p('icon', 'texto', 'Ícono Material'), p('icon2', 'texto', 'Segundo ícono')],
  stat:          [p('title', 'texto', 'Título de la estadística'), p('value', 'texto', 'Valor principal'), p('desc', 'texto', 'Descripción'), p('icon', 'texto', 'Ícono Material'), p('color', 'token|color', 'Color del ícono')],
};

// ── Main completion source ──

export function noirmdCompletionSource(ctx: CompletionContext): CompletionResult | null {
  const line = ctx.state.doc.lineAt(ctx.pos);
  const textBefore = line.text.slice(0, ctx.pos - line.from);

  // ── After ::: → suggest directive types ──
  const directiveMatch = textBefore.match(/^(:::\s?)(\w*)$/);
  if (directiveMatch) {
    const from = line.from + directiveMatch[1].length;
    const filter = directiveMatch[2];
    return {
      from,
      options: DIRECTIVES.map(d => ({
        label: d.label,
        detail: d.detail,
        info: d.info,
        type: 'keyword' as const,
        apply(view: EditorView, completion: any, from: number, to: number) {
          // Parse snippet: text before $0, $0 marks cursor, text after $0
          const raw = d.snippet;
          const dollar0 = raw.indexOf('$0');
          const before = dollar0 >= 0 ? raw.slice(0, dollar0) : raw;
          const after = dollar0 >= 0 ? raw.slice(dollar0 + 2) : '';
          const cursorOffset = from + before.length;
          view.dispatch({
            changes: { from, to, insert: before + after },
            selection: { anchor: cursorOffset },
          });
          return true;
        },
      })),
      filter: filter.length > 0,
    };
  }

  // ── After { inside directive header → suggest props (solo las de esa directiva) ──
  const propsMatch = textBefore.match(/:::([\w][\w-]*)\s+\{(.*)$/);
  if (propsMatch) {
    const directiveName = propsMatch[1];
    const afterBrace = propsMatch[2];

    // Walk chars to find where the current token starts.
    // After a complete prop like title="test" the cursor is after the closing ".
    // The next space means a new token starts after it.
    let inQuotes = false;
    let tokenStart = 0;
    for (let i = 0; i < afterBrace.length; i++) {
      if (afterBrace[i] === '"') {
        inQuotes = !inQuotes;
      } else if (afterBrace[i] === ' ' && !inQuotes) {
        tokenStart = i + 1;
      }
    }
    const currentToken = afterBrace.slice(tokenStart);
    const from = ctx.pos - currentToken.length;

    const specificProps = DIRECTIVE_PROPS[directiveName] || [];
    const allProps = [...specificProps, ...UNIVERSAL_PROPS];
    return {
      from,
      options: allProps,
      filter: currentToken.length > 0,
    };
  }

  // ── After # at start of line (slot) ──
  const slotMatch = textBefore.match(/^#(\w*)$/);
  if (slotMatch) {
    const from = line.from + 1;
    const filter = slotMatch[1];
    return {
      from,
      options: SLOTS,
      filter: filter.length > 0,
    };
  }

  return null;
}
