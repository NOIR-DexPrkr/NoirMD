import { useState } from 'react';
import NReditor from '@noirmd/previewer/editor';
import '@noirmd/previewer/markdown.css';
import { defaultMarkdown } from '../data/examples';

export default function Playground() {
  const [value, setValue] = useState(defaultMarkdown);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <NReditor
        value={value}
        onChange={setValue}
        className="h-full"
        tailwindCDN
      />
    </div>
  );
}
