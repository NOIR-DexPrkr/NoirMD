import React, { useState, useRef } from 'react';
import hljs from './highlightSetup';
import { Dialog } from '@base-ui/react/dialog';

// ─────────────────────────────────────────────
// IconRenderer — Material Icons by name or codepoint
// ─────────────────────────────────────────────

interface IconRendererProps {
  iconName: string;
  extraClasses?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ iconName, extraClasses = '' }) => {
  if (!iconName) return null;

  const baseClass = `material-symbols-rounded !text-[1em] leading-none align-top ${extraClasses}`;
  const isCodepoint = /^[eE][0-9a-fA-F]{3,4}$/.test(iconName);

  if (isCodepoint) {
    return (
      <span
        className={baseClass}
        dangerouslySetInnerHTML={{ __html: `&#x${iconName};` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <span className={baseClass} aria-hidden="true">
      {iconName}
    </span>
  );
};

// ─────────────────────────────────────────────
// CodeBlock — synchronous syntax highlighting + copy
// ─────────────────────────────────────────────

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lang = language?.split(/[\s{]/)[0]?.trim() || '';

  let html: string;
  try {
    if (lang && hljs.getLanguage(lang)) {
      html = hljs.highlight(code, { language: lang }).value;
    } else {
      html = hljs.highlightAuto(code).value;
    }
  } catch {
    html = '';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="not-prose my-4 rounded-2xl border border-border overflow-hidden bg-background-secondary-solid/5">
      {title && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-background-secondary-solid/10 text-xs sm:text-sm font-mono text-text-secondary">
          <span className="material-symbols-rounded text-base">description</span>
          {title}
        </div>
      )}
      <div className="overflow-auto [&_pre]:m-0 [&_pre]:p-4 [&_pre]:text-xs sm:[&_pre]:text-sm">
        <pre className="m-0"><code className={`language-${lang || 'plaintext'}`} dangerouslySetInnerHTML={{ __html: html }} /></pre>
      </div>
      <button className="absolute top-2 right-2 p-1.5 rounded-lg bg-background-secondary-solid/20 hover:bg-background-secondary-solid/40 transition-colors cursor-pointer border-none text-text-secondary hover:text-text-primary" onClick={handleCopy} title="Copy code">
        <span className="material-symbols-rounded" style={{ fontSize: '1rem' }}>
          {copied ? 'check' : 'content_copy'}
        </span>
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────
// Admonition — styled alert box (Tailwind)
// ─────────────────────────────────────────────

interface AdmonitionProps {
  type: string;
  title?: string;
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const defaultIcons: Record<string, string> = {
  note: 'info',
  info: 'lightbulb',
  warning: 'warning',
  danger: 'report',
  greentext: 'subdirectory_play_arrow',
};

const typeClasses: Record<string, string> = {
  note: 'border-info/20 bg-info/5 text-info',
  info: 'border-info/30 bg-info/10 text-info',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
  danger: 'border-danger/30 bg-danger/10 text-danger',
  greentext: 'border-success/30 bg-success/10 text-success',
};

export const Admonition: React.FC<AdmonitionProps> = ({ type, title, icon, className = '', style, children }) => {
  const iconToRender = icon || defaultIcons[type] || 'info';

  return (
    <div
      className={`not-prose rounded-2xl mb-6 border shadow-xs p-4 ${typeClasses[type] || typeClasses.note} ${className}`}
      style={style}
    >
      {title && (
        <h5 className="font-bold text-base mb-2 m-0 flex items-center gap-2">
          <IconRenderer iconName={iconToRender} extraClasses="shrink-0" />
          <span>{title}</span>
        </h5>
      )}
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Details — collapsible section (Tailwind)
// ─────────────────────────────────────────────

interface DetailsProps {
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Details: React.FC<DetailsProps> = ({
  title,
  icon,
  defaultOpen = false,
  className = '',
  style,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const iconToRender = icon || 'play_arrow';

  return (
    <details
      className={`not-prose rounded-2xl border border-border mb-4 bg-background-primary/5 ${className}`}
      open={isOpen}
      style={style}
    >
      <summary
        className="cursor-pointer p-4 font-bold flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden hover:text-accent-primary transition-colors"
        onClick={e => {
          e.preventDefault();
          setIsOpen(prev => !prev);
        }}
      >
        <IconRenderer
          iconName={iconToRender}
          extraClasses={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
        <span>{title}</span>
      </summary>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-border pt-3 text-sm leading-relaxed opacity-90 overflow-hidden min-w-0">
          {children}
        </div>
      )}
    </details>
  );
};

// ─────────────────────────────────────────────
// Modal — overlay dialog (Base UI Dialog + Tailwind)
// ─────────────────────────────────────────────

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[9999] bg-black/60" />
        <Dialog.Viewport className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <Dialog.Popup className="bg-background-primary border border-border shadow-2xl rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-border bg-background-secondary-solid/20">
              <Dialog.Title className="text-lg font-bold !m-0">{title}</Dialog.Title>
              <Dialog.Close className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer border-none bg-transparent">
                <span className="material-symbols-rounded text-base">close</span>
              </Dialog.Close>
            </div>
            <div className="p-6 overflow-auto min-h-0 text-text-primary [&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0 [&_h4:first-child]:mt-0 [&_h5:first-child]:mt-0 [&_h6:first-child]:mt-0">
              {children}
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
