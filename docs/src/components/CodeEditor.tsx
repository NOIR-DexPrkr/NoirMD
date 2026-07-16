import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown as markdownExtension } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';

interface CodeEditorProps {
  initialMarkdown: string;
}

export default function CodeEditor({ initialMarkdown }: CodeEditorProps) {
  const onChange = useCallback((value: string) => {
    // Dispatch custom event so Astro preview islands can listen
    window.dispatchEvent(new CustomEvent('playground-change', { detail: { markdown: value } }));
  }, []);

  return (
    <CodeMirror
      value={initialMarkdown}
      onChange={onChange}
      extensions={[markdownExtension(), EditorView.lineWrapping]}
      theme="dark"
      className="h-full text-sm"
    />
  );
}
