import React from 'react';
import CustomMarkdownRenderer from './CustomMarkdownRenderer';
import RawHtmlRenderer from './RawHtmlRenderer';
import { useLazyTailwindCDN } from './useTailwindCDN';

export interface NRpreviewerProps {
  /** Markdown string to render */
  content?: string;
  /** Raw HTML string to render (used when content is not provided) */
  html?: string;
  /** Inject Tailwind v4 browser CDN at runtime for user-authored Tailwind classes. Default: false */
  tailwindCDN?: boolean;
  /** Additional CSS class on the wrapper element */
  className?: string;
  /** Inline styles on the wrapper element */
  style?: React.CSSProperties;
}

/**
 * NRpreviewer — drop-in markdown/HTML preview component.
 *
 * @example
 * ```tsx
 * import { NRpreviewer } from '@noirmd/previewer/react';
 * import '@noirmd/previewer/vanilla/vanilla.css';
 *
 * <NRpreviewer content="# Hello **world**" />
 * <NRpreviewer content=":::note Title\nContent\n:::" tailwindCDN />
 * <NRpreviewer html="<h1>Raw HTML</h1>" />
 * ```
 */
const NRpreviewer: React.FC<NRpreviewerProps> = ({
  content,
  html,
  tailwindCDN = false,
  className,
  style,
}) => {
  useLazyTailwindCDN(tailwindCDN);

  const wrapperClass = `nr-prose${className ? ` ${className}` : ''}`;

  if (content) {
    return (
      <div className={wrapperClass} style={style}>
        <CustomMarkdownRenderer content={content} />
      </div>
    );
  }

  if (html) {
    return (
      <div className={wrapperClass} style={style}>
        <RawHtmlRenderer content={html} />
      </div>
    );
  }

  return null;
};

export default NRpreviewer;