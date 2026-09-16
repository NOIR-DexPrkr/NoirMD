import { linter, Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';

// ── NoirMD directive types (for validation) ──

const VALID_DIRECTIVES = new Set([
  'note', 'info', 'warning', 'danger', 'greentext',
  'card', 'card-m', 'card-b',
  'details', 'modal', 'button', 'slide',
  'keys', 'accordion', 'accordion-item',
  'carousel', 'countdown', 'diff',
  'hover-3d', 'hover-gallery',
  'chat', 'chat-item',
  'richlist', 'richlist-item',
  'stat',
  // Deprecated (valid but legacy)
  'div', 'style', 'custom', 'raw',
]);

// ── Known inline syntax issues ──

const INLINE_RULES: {
  regex: RegExp;
  message: string;
  severity: 'error' | 'warning' | 'info';
}[] = [
  {
    // *text* is NOT supported — use _text_ instead
    regex: /(?<!\*)\*(?!\*)([^*\s][^*]*[^*\s]|\S)\*(?!\*)/g,
    message: '*text* is not supported. Use _text_ for italic.',
    severity: 'warning',
  },
  {
    // Unclosed %color%text%% (missing closing %%)
    regex: /%([^%\s]+)%((?:(?!%%).)*)$/gm,
    message: 'Unclosed color syntax. Add %% to close: %color%text%%',
    severity: 'error',
  },
  {
    // Unclosed ===highlight==
    regex: /==([^=\s][^=]*[^=\s]|\S)(?!=)/g,
    message: 'Unclosed highlight. Add == to close.',
    severity: 'warning',
  },
];

// ── Main linter ──

export const noirmdLinter = linter((view) => {
  const diagnostics: Diagnostic[] = [];
  const doc = view.state.doc;
  const dirStack: { type: string; line: number; from: number }[] = [];

  for (let i = 1; i <= doc.lines; i++) {
    const line = doc.line(i);
    const trimmed = line.text.trim();

    // ── Unclosed directives ──
    const openMatch = trimmed.match(/^:::\s?(\S+)(?:\s|$)/);
    if (openMatch) {
      const type = openMatch[1].toLowerCase();
      if (!VALID_DIRECTIVES.has(type)) {
        diagnostics.push({
          from: line.from,
          to: line.to,
          severity: 'warning',
          message: `Unknown directive "${type}". Did you mean one of: ${[...VALID_DIRECTIVES].filter(d => d.startsWith(type.slice(0, 3))).join(', ')}?`,
        });
      }
      dirStack.push({ type, line: i, from: line.from });
      continue;
    }

    if (trimmed === ':::') {
      if (dirStack.length === 0) {
        diagnostics.push({
          from: line.from,
          to: line.to,
          severity: 'error',
          message: 'Unexpected closing ::: without opening directive.',
        });
      } else {
        dirStack.pop();
      }
      continue;
    }

    // ── Inline syntax checks (skip lines inside code blocks) ──
    if (trimmed.startsWith('```')) continue;
    if (trimmed.startsWith('---') || trimmed.startsWith('___') || trimmed.startsWith('***')) continue;

    for (const rule of INLINE_RULES) {
      rule.regex.lastIndex = 0;
      let match;
      while ((match = rule.regex.exec(line.text))) {
        // Skip if inside code spans
        const before = line.text.slice(0, match.index);
        const backtickCount = (before.match(/`/g) || []).length;
        if (backtickCount % 2 === 1) continue;

        diagnostics.push({
          from: line.from + match.index,
          to: line.from + match.index + match[0].length,
          severity: rule.severity,
          message: rule.message,
        });
      }
    }
  }

  // ── Unclosed directives at EOF ──
  for (const dir of dirStack) {
    diagnostics.push({
      from: dir.from,
      to: Math.min(dir.from + 50, doc.length),
      severity: 'error',
      message: `Unclosed :::${dir.type} (opened at line ${dir.line}). Add ::: on its own line to close.`,
    });
  }

  return diagnostics;
}, { delay: 500 });
