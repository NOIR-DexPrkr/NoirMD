import React from 'react';
import { NRpreviewer } from '@noirmd/previewer/react';
import '@noirmd/previewer/markdown.css';

interface ReactPreviewProps {
  content: string;
  className?: string;
}

export default function ReactPreview({ content, className = '' }: ReactPreviewProps) {
  return (
    <div className={`nr-prose ${className}`}>
      <NRpreviewer content={content} tailwindCDN />
    </div>
  );
}
