import React from 'react';
import CustomMarkdownRenderer from './CustomMarkdownRenderer';
import RawHtmlRenderer from './RawHtmlRenderer';
import { useLazyTailwindCDN } from './useTailwindCDN';

export interface NRpreviewerProps {
  /** Markdown string to render */
  content?: string;
  /** Raw HTML string to render (used when content is not provided) */
  html?: string;
  /** Inject Tailwind v4 browser CDN at runtime for directive styling. Default: false */
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
 * import { NRpreviewer } from '@noirmd/previewer';
 * import '@noirmd/previewer/markdown.css';
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

  if (content) {
    return (
      <div className={`nr-prose${className ? ` ${className}` : ''}`} style={style}>
        <CustomMarkdownRenderer content={content} />
      </div>
    );
  }

  if (html) {
    return (
      <div className={`nr-prose${className ? ` ${className}` : ''}`} style={style}>
        <RawHtmlRenderer content={html} wrapperClassName="nr-preview-html" />
      </div>
    );
  }

  return null;
};

export default NRpreviewer;
