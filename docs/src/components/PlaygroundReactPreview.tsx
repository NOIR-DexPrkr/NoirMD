import React, { useState, useEffect } from 'react';
import { NRpreviewer } from '@noirmd/previewer/react';
import '@noirmd/previewer/markdown.css';

interface Props {
  initialContent: string;
}

export default function PlaygroundReactPreview({ initialContent }: Props) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    const handler = (e: Event) => {
      const md = (e as CustomEvent).detail?.markdown;
      if (typeof md === 'string') setContent(md);
    };
    window.addEventListener('playground-change', handler);
    return () => window.removeEventListener('playground-change', handler);
  }, []);

  return (
    <div className="nr-prose">
      <NRpreviewer content={content} tailwindCDN />
    </div>
  );
}
