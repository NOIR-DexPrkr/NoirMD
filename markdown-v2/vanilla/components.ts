// ============================================================
// Vanilla UI Component Factories
//
// Each function returns a native HTMLElement. No React, no Tailwind.
// Styling comes from vanilla.css via class names.
// ============================================================

import hljs from './highlightSetup';

// ── Icon ──────────────────────────────────────────────────

/**
 * Create a Material Icons Round icon element.
 */
export function createIcon(iconName: string, extraClasses?: string): HTMLElement {
  const span = document.createElement('span');
  const cls = `nr-icon material-icons-round${extraClasses ? ` ${extraClasses}` : ''}`;
  span.className = cls;
  span.setAttribute('aria-hidden', 'true');

  const isCodepoint = /^[eE][0-9a-fA-F]{3,4}$/.test(iconName);
  if (isCodepoint) {
    span.innerHTML = `&#x${iconName};`;
  } else {
    span.textContent = iconName;
  }
  return span;
}

// ── CodeBlock ─────────────────────────────────────────────

/**
 * Create a syntax-highlighted code block with copy button.
 */
export function createCodeBlock(code: string, language: string, title?: string): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'nr-codeblock';

  const lang = language?.split(/[\s{]/)[0]?.trim() || '';

  // Title bar
  if (title) {
    const header = document.createElement('div');
    header.className = 'nr-codeblock__header';
    header.appendChild(createIcon('description'));
    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    header.appendChild(titleSpan);
    wrapper.appendChild(header);
  }

  // Code area
  const pre = document.createElement('pre');
  pre.className = 'nr-codeblock__pre';
  const codeEl = document.createElement('code');
  codeEl.className = `language-${lang || 'plaintext'}`;

  try {
    if (lang && hljs.getLanguage(lang)) {
      codeEl.innerHTML = hljs.highlight(code, { language: lang }).value;
    } else {
      codeEl.innerHTML = hljs.highlightAuto(code).value;
    }
  } catch {
    codeEl.textContent = code;
  }

  pre.appendChild(codeEl);
  wrapper.appendChild(pre);

  // Copy button
  const copyBtn = document.createElement('button');
  copyBtn.className = 'nr-codeblock__copy';
  copyBtn.title = 'Copy code';
  const copyIcon = createIcon('content_copy');
  copyIcon.style.fontSize = '1rem';
  copyBtn.appendChild(copyIcon);

  let timer: ReturnType<typeof setTimeout> | null = null;
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(code);
    copyIcon.textContent = 'check';
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { copyIcon.textContent = 'content_copy'; }, 1800);
  });

  wrapper.appendChild(copyBtn);
  return wrapper;
}

// ── Admonition ────────────────────────────────────────────

const DEFAULT_ADMONITION_ICONS: Record<string, string> = {
  note: 'info',
  info: 'lightbulb',
  warning: 'warning',
  danger: 'report',
  greentext: 'subdirectory_arrow_right',
};

/**
 * Create an admonition (alert) box.
 * Content should be appended by the caller.
 */
export function createAdmonition(
  type: string,
  title?: string,
  icon?: string,
): HTMLElement {
  const el = document.createElement('div');
  el.className = `nr-admonition nr-admonition--${type || 'note'}`;

  if (title) {
    const header = document.createElement('h5');
    header.className = 'nr-admonition__title';
    const iconToRender = icon || DEFAULT_ADMONITION_ICONS[type] || 'info';
    header.appendChild(createIcon(iconToRender, 'nr-admonition__icon'));
    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    header.appendChild(titleSpan);
    el.appendChild(header);
  }

  const body = document.createElement('div');
  body.className = 'nr-admonition__body';
  el.appendChild(body);

  return el;
}

// ── Details (Collapsible) ─────────────────────────────────

/**
 * Create a native <details> collapsible section.
 * Content should be appended to the body div.
 */
export function createDetails(
  title: string,
  icon?: string,
  defaultOpen?: boolean,
): HTMLElement {
  const details = document.createElement('details');
  details.className = 'nr-details';
  if (defaultOpen) details.open = true;

  const summary = document.createElement('summary');
  summary.className = 'nr-details__summary';

  const iconToRender = icon || 'play_arrow';
  const iconEl = createIcon(iconToRender, 'nr-details__icon');
  summary.appendChild(iconEl);

  const titleSpan = document.createElement('span');
  titleSpan.textContent = title || 'Details';
  summary.appendChild(titleSpan);

  // Rotate icon on toggle
  details.addEventListener('toggle', () => {
    iconEl.classList.toggle('nr-details__icon--open', details.open);
  });

  details.appendChild(summary);

  const body = document.createElement('div');
  body.className = 'nr-details__body';
  details.appendChild(body);

  return details;
}

// ── Modal (Native <dialog>) ───────────────────────────────

/**
 * Create a native <dialog> modal.
 * Content should be appended to the body div.
 */
export function createModal(title: string): HTMLDialogElement {
  const dialog = document.createElement('dialog');
  dialog.className = 'nr-modal';

  // Backdrop click to close
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });

  const popup = document.createElement('div');
  popup.className = 'nr-modal__popup';

  // Header
  const header = document.createElement('div');
  header.className = 'nr-modal__header';

  const titleEl = document.createElement('h2');
  titleEl.className = 'nr-modal__title';
  titleEl.textContent = title;
  header.appendChild(titleEl);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'nr-modal__close';
  closeBtn.appendChild(createIcon('close'));
  closeBtn.addEventListener('click', () => dialog.close());
  header.appendChild(closeBtn);

  popup.appendChild(header);

  // Body
  const body = document.createElement('div');
  body.className = 'nr-modal__body';
  popup.appendChild(body);

  dialog.appendChild(popup);
  return dialog;
}

// ── Table ─────────────────────────────────────────────────

/**
 * Render a pipe-delimited markdown table into an HTML table element.
 * Returns the outer wrapper div.
 */
export function createTable(
  content: string,
  renderInline: (text: string) => DocumentFragment,
): HTMLElement {
  const rows = content.split('\n').filter(r => r.trim());
  if (rows.length < 2) {
    const p = document.createElement('p');
    p.textContent = content;
    return p;
  }

  const parseRow = (row: string) =>
    row.split('|').map(c => c.trim()).filter(Boolean);

  const headerCells = parseRow(rows[0]);
  const bodyRows = rows.slice(2).map(parseRow);

  const wrapper = document.createElement('div');
  wrapper.className = 'nr-table-wrap';

  const table = document.createElement('table');
  table.className = 'nr-table';

  // Thead
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  for (const cell of headerCells) {
    const th = document.createElement('th');
    th.className = 'nr-table__th';
    th.appendChild(renderInline(cell));
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);

  // Tbody
  const tbody = document.createElement('tbody');
  for (const cells of bodyRows) {
    const tr = document.createElement('tr');
    for (const cell of cells) {
      const td = document.createElement('td');
      td.className = 'nr-table__td';
      td.appendChild(renderInline(cell));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrapper.appendChild(table);

  return wrapper;
}

// ── List ──────────────────────────────────────────────────

/**
 * Render a markdown list (ordered or unordered) into HTML.
 */
export function createList(
  content: string,
  renderInline: (text: string) => DocumentFragment,
): HTMLElement {
  const lines = content.split('\n');
  const items: { indent: number; marker: string; text: string }[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const match = line.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
    if (match) {
      items.push({ indent: match[1].length, marker: match[2], text: match[3] });
    }
  }

  if (items.length === 0) {
    const p = document.createElement('p');
    p.textContent = content;
    return p;
  }

  const isOrdered = /^\d+\.$/.test(items[0].marker);
  const list = document.createElement(isOrdered ? 'ol' : 'ul');
  list.className = 'nr-list';

  for (const item of items) {
    const li = document.createElement('li');
    li.className = 'nr-list__item';
    li.appendChild(renderInline(item.text));
    list.appendChild(li);
  }

  return list;
}

// ── TOC (Table of Contents) ───────────────────────────────

interface TocHeader {
  level: number;
  text: string;
  id: string;
}

/**
 * Create a table of contents from an array of headers.
 */
export function createTOC(
  headers: TocHeader[],
  renderInline: (text: string) => DocumentFragment,
): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'nr-toc';

  const title = document.createElement('div');
  title.className = 'nr-toc__title';
  title.textContent = 'Table of Contents';
  nav.appendChild(title);

  const ul = document.createElement('ul');
  ul.className = 'nr-toc__list';

  for (const h of headers) {
    const li = document.createElement('li');
    li.className = `nr-toc__item nr-toc__item--h${h.level}`;

    const a = document.createElement('a');
    a.className = 'nr-toc__link';
    a.href = `#${h.id}`;
    a.appendChild(renderInline(h.text.replace(/->|<-/g, '').trim()));
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(h.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    li.appendChild(a);
    ul.appendChild(li);
  }

  nav.appendChild(ul);
  return nav;
}

// ── Blockquote ────────────────────────────────────────────

/**
 * Create a blockquote element.
 */
export function createBlockquote(
  content: string,
  classes: string | undefined,
  renderInline: (text: string) => DocumentFragment,
): HTMLElement {
  const el = document.createElement('blockquote');
  el.className = `nr-blockquote${classes ? ` ${classes}` : ''}`;
  el.appendChild(renderInline(content));
  return el;
}
