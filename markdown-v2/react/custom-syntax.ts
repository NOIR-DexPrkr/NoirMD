import { StreamLanguage } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

/**
 * V2 Custom Syntax Highlighter for CodeMirror 6.
 */

interface V2State {
  inCodeBlock: boolean;
  inDirectiveHeader: boolean;
  inPropsBlock: boolean;
  braceDepth: number;
  blockStack: string[];
  imageState: 'none' | 'expectUrl' | 'expectOptions';
  linkState: 'none' | 'expectUrl';
  lastPropKey: string;
  inHtmlBlock: boolean;
  htmlTagName: string;
  isClosingHtmlTag: boolean;
  embeddedLang: 'none' | 'script' | 'style';
}

export const customStreamParserV2 = StreamLanguage.define<V2State>({
  startState: () => ({
    inCodeBlock: false,
    inDirectiveHeader: false,
    inPropsBlock: false,
    braceDepth: 0,
    blockStack: [],
    imageState: 'none',
    linkState: 'none',
    lastPropKey: '',
    inHtmlBlock: false,
    htmlTagName: '',
    isClosingHtmlTag: false,
    embeddedLang: 'none',
  }),

  token(stream, state) {
    // ── Line start resets ──
    if (stream.sol()) {
      state.inDirectiveHeader = false;
      state.imageState = 'none';
      state.linkState = 'none';

      // Close code block
      if (state.inCodeBlock && stream.match(/^\s*```/)) {
        state.inCodeBlock = false;
        return 'comment';
      }
      
      // ELIMINADO: El reinicio de state.inHtmlBlock aquí para permitir atributos multilínea
    }

    // Inside HTML block opening tag (soporta atributos multilínea)
    if (state.inHtmlBlock) {
      stream.eatSpace();
      
      // Self-closing: />
      if (stream.match(/^\/>/)) {
        state.inHtmlBlock = false;
        state.htmlTagName = '';
        state.isClosingHtmlTag = false;
        return 'typeName';
      }
      // Closing >
      if (stream.match(/^>/)) {
        state.inHtmlBlock = false;
        // Enter embedded mode for <script> / <style> blocks
        if (!state.isClosingHtmlTag && (state.htmlTagName === 'script' || state.htmlTagName === 'style')) {
          state.embeddedLang = state.htmlTagName;
        }
        state.htmlTagName = '';
        state.isClosingHtmlTag = false;
        return 'typeName';
      }
      
      // Nombre de atributo
      if (stream.match(/^[a-zA-Z_:][\w-.:]*/)) return 'attributeName';
      // Signo igual
      if (stream.match(/^=/)) return 'keyword';
      // Valor entre comillas dobles (cerradas o abiertas en esta línea)
      if (stream.match(/^"[^"]*"/)) return 'string';
      if (stream.match(/^"[^"]*$/)) return 'string';
      // Valor entre comillas simples (cerradas o abiertas)
      if (stream.match(/^'[^']*'/)) return 'string';
      if (stream.match(/^'[^']*$/)) return 'string';
      // Valor sin comillas
      if (stream.match(/^[^\s>]+/)) return 'string';
      
      if (stream.eatSpace()) return null;
      stream.next();
      return null;
    }

    // ── Inside embedded <script> / <style> ──
    if (state.embeddedLang !== 'none') {
      // Detect closing tag to exit embedded mode
      if (stream.match(/^<\/(script|style)\b/i)) {
        const closeTag = stream.current().replace(/^<\//, '').toLowerCase();
        state.embeddedLang = 'none';
        state.inHtmlBlock = true;
        state.htmlTagName = closeTag;
        state.isClosingHtmlTag = true;
        return 'typeName';
      }

      if (state.embeddedLang === 'script') {
        // ── JavaScript tokenizer ──
        // Line comments
        if (stream.match(/^\/\//)) { stream.skipToEnd(); return 'comment'; }
        // Block comments
        if (stream.match(/^\/\*/)) {
          while (!stream.eol()) {
            if (stream.match(/\*\//)) return 'comment';
            stream.next();
          }
          return 'comment';
        }
        // Strings (single / double quotes)
        if (stream.match(/^["']/)) {
          const q = stream.current();
          while (!stream.eol()) {
            const ch = stream.next();
            if (ch === q && stream.string[stream.pos - 2] !== '\\') break;
          }
          return 'string';
        }
        // Template literals
        if (stream.match(/^`/)) {
          while (!stream.eol()) {
            if (stream.next() === '`') break;
          }
          return 'string';
        }
        // Keywords
        if (stream.match(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|default|from|try|catch|finally|throw|async|await|typeof|instanceof|in|of|void|null|undefined|true|false)\b/)) return 'keyword';
        // Numbers
        if (stream.match(/^\d+(\.\d+)?/)) return 'number';
        // Function call
        if (stream.match(/^[a-zA-Z_$][\w$]*(?=\s*\()/)) return 'function';
        // Identifier
        if (stream.match(/^[a-zA-Z_$][\w$]*/)) return 'variableName';
        // Operators
        if (stream.match(/^[+\-*\/%=!<>&|^~?:]+/)) return 'keyword';
        stream.next();
        return null;
      }

      if (state.embeddedLang === 'style') {
        // ── CSS tokenizer ──
        // Comments
        if (stream.match(/^\/\*/)) {
          while (!stream.eol()) {
            if (stream.match(/\*\//)) return 'comment';
            stream.next();
          }
          return 'comment';
        }
        // Strings
        if (stream.match(/^["']/)) {
          const q = stream.current();
          while (!stream.eol()) {
            const ch = stream.next();
            if (ch === q && stream.string[stream.pos - 2] !== '\\') break;
          }
          return 'string';
        }
        // At-rules
        if (stream.match(/^@[a-zA-Z-]+/)) return 'keyword';
        // Hex colors
        if (stream.match(/^#[0-9a-fA-F]{3,8}\b/)) return 'string';
        // Numbers with optional units
        if (stream.match(/^\d+(\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|s|ms|deg|fr)?\b/)) return 'number';
        // Property name (word before colon)
        if (stream.match(/^[a-zA-Z-]+(?=\s*:)/)) return 'propertyName';
        // Selectors: .class / #id
        if (stream.match(/^[.#][a-zA-Z][\w-]*/)) return 'className';
        // CSS keywords
        if (stream.match(/\b(none|auto|inherit|initial|unset|normal|bold|italic|center|left|right|flex|grid|block|inline|relative|absolute|fixed|sticky|hidden|visible|scroll|cover|contain)\b/)) return 'keyword';
        // Tag selectors
        if (stream.match(/^[a-zA-Z][\w-]*/)) return 'typeName';
        // Punctuation
        if (stream.match(/^[{}();:,]/)) return 'keyword';
        stream.next();
        return null;
      }
    }

    // Inside code block → everything is comment
    if (state.inCodeBlock) {
      stream.skipToEnd();
      return 'comment';
    }

    // Inside {props} block
    if (state.inPropsBlock) {
      stream.eatSpace();

      if (stream.peek() === '}') {
        stream.next();
        state.inPropsBlock = false;
        state.inDirectiveHeader = false;
        state.lastPropKey = '';
        return 'keyword';
      }

      if (stream.match(/^\.[a-zA-Z0-9_-]+/)) return 'className';
      if (stream.match(/^#[a-zA-Z0-9_-]+/)) return 'propertyName';

      const urlKeys = /^(url|href|image|src|icon)$/i;
      if (stream.match(/^[a-zA-Z][\w-]*(?==)/)) {
        state.lastPropKey = stream.current();
        return 'propertyName';
      }
      if (stream.match(/^=/)) return 'keyword';
      if (stream.match(/^"[^"]*"|^'[^']*'/)) {
        return urlKeys.test(state.lastPropKey) ? 'url' : 'string';
      }

      stream.next();
      return null;
    }

    // ── Line-start rules ──
    if (stream.sol()) {
      let match;
      if ((match = stream.match(/^\s*(:::)\s*/))) {
        const rest = stream.string.slice(stream.pos).trim();

        if (rest === '') {
          state.blockStack.pop();
        } else {
          const typeMatch = rest.match(/^([\w-]+)/);
          state.blockStack.push(typeMatch ? typeMatch[1].toLowerCase() : 'generic');
        }

        state.inDirectiveHeader = true;
        return 'keyword';
      }

      if (stream.match(/^\s*#[a-zA-Z][\w-]*\s*$/) && !stream.match(/^\s*#{1,6}\s/)) {
        return 'propertyName';
      }
      if (stream.match(/^\s*(#{1,6})\s+/)) return 'heading';
      if (stream.match(/^\s*```/)) {
        state.inCodeBlock = true;
        stream.skipToEnd();
        return 'comment';
      }
      if (stream.match(/^\s*([-*+]|\d+\.)\s+/)) return 'variableName';
      if (stream.match(/^\s*(---|___|(\*\s*){3,})\s*$/)) return 'meta';
      if (stream.match(/^\s*\[TOC\d?\]/)) return 'keyword';
    }

    // ── Directive header ──
    if (state.inDirectiveHeader) {
      stream.eatSpace();
      if (stream.match(/^[\w-]+/)) return 'typeName';
      if (stream.peek() === '{') {
        stream.next();
        state.inPropsBlock = true;
        state.inDirectiveHeader = true;
        return 'keyword';
      }
      state.inDirectiveHeader = false;
    }

    // ── Raw block content (HTML/CSS/JS) ──
    const currentBlockType = state.blockStack[state.blockStack.length - 1];
    if (currentBlockType === 'raw' && !state.inDirectiveHeader) {
      if (stream.eatSpace()) return null;
      if (stream.match(/^<\/?[a-zA-Z0-9-]+/)) return 'typeName';
      if (stream.match(/^>/)) return 'typeName';
      if (stream.match(/^[{}]/)) return 'keyword';
      if (stream.match(/^--[a-zA-Z0-9_-]+/)) return 'variableName';
      if (stream.match(/^[a-zA-Z-]+(?=\s*:)/)) return 'propertyName';
      if (stream.match(/^var\([^)]+\)/)) return 'variableName';
      if (stream.match(/^['"`][^'"`]*['"`]/)) return 'string';
      if (stream.match(/^[#.][a-zA-Z0-9_-]+/)) return 'className';
      if (stream.match(/^:[a-zA-Z0-9_-]+/)) return 'keyword';
      if (stream.match(/\b(const|let|var|function|return|if|else|for|while)\b/)) return 'keyword';
      stream.next();
      return null;
    }

    // ── Image & Links ──
    if (state.imageState === 'expectUrl') {
      state.imageState = 'expectOptions';
      if (stream.eat('(')) {
        let parenLevel = 1;
        while (!stream.eol() && parenLevel > 0) {
          const next = stream.next();
          if (next === '(') parenLevel++;
          else if (next === ')' && stream.string[stream.pos - 2] !== '\\') parenLevel--;
        }
        return 'url';
      } else {
        state.imageState = 'none';
      }
    }
    if (state.imageState === 'expectOptions') {
      state.imageState = 'none';
      if (stream.eat('{')) {
        stream.eatWhile(/[^}]/);
        stream.eat('}');
        return 'attributeName';
      }
    }
    if (state.linkState === 'expectUrl') {
      state.linkState = 'none';
      if (stream.eat('(')) {
        let parenLevel = 1;
        while (!stream.eol() && parenLevel > 0) {
          const next = stream.next();
          if (next === '(') parenLevel++;
          else if (next === ')' && stream.string[stream.pos - 2] !== '\\') parenLevel--;
        }
        return 'url';
      }
    }

    // ── HTML tags (inline & block) - Mejorado con |$ para EOL ──
    if (stream.match(/^<\/?[a-zA-Z][\w-]*(?=[>\s/]|$)/)) {
      const raw = stream.current();
      state.htmlTagName = raw.replace(/^<\/?/, '').toLowerCase();
      state.isClosingHtmlTag = raw.startsWith('</');
      state.inHtmlBlock = true;
      return 'typeName';
    }

    // ── Inline formatting ──
    if (stream.match(/\*\*\*.+?\*\*\*/)) return 'strongEmphasis';
    if (stream.match(/\*\*.+?\*\*/)) return 'strong';
    if (stream.match(/!\[[^\]]*?\]/)) {
      if (stream.peek() === '(') state.imageState = 'expectUrl';
      return 'string';
    }
    if (stream.match(/\[[^\]]+?\]/)) {
      if (stream.peek() === '(') state.linkState = 'expectUrl';
      return 'string';
    }
    if (stream.match(/\|\[[^\]]+?\]\|/)) return 'keyword';
    if (stream.match(/`[^`]+`/)) return 'comment';
    if (stream.match(/_(.+?)_/)) return 'emphasis';
    if (stream.match(/~~(.+?)~~/)) return 'strikethrough';
    if (stream.match(/!~(.+?)~!/)) return 'underline';
    if (stream.match(/==(.+?)==/)) return 'highlight';
    if (stream.match(/!>.+?<!/)) return 'comment';
    if (stream.match(/%[^%\s]+?%[^%]+?%%/)) return 'string';
    if (stream.match(/->|<-|\|/)) return 'meta';

    stream.next();
    return null;
  },

  tokenTable: {
    heading: t.heading,
    keyword: t.keyword,
    typeName: t.typeName,
    string: t.string,
    attributeName: t.attributeName,
    propertyName: t.propertyName,
    className: t.className,
    comment: t.comment,
    variableName: t.variableName,
    meta: t.meta,
    strong: t.strong,
    emphasis: t.emphasis,
    strongEmphasis: [t.strong, t.emphasis],
    strikethrough: t.strikethrough,
    underline: t.special(t.emphasis),
    highlight: t.special(t.comment),
    url: t.url,
    link: t.string,
    number: t.number,
    function: t.function(t.variableName),
  },
});