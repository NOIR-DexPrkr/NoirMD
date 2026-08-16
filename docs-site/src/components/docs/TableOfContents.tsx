import { useEffect, useState } from 'react';
import { parseMarkdown } from '@noirmd/previewer/core';
import { List } from 'lucide-react';
import clsx from 'clsx';

interface TOCProps {
  content: string;
}

interface HeaderEntry {
  level: number;
  text: string;
  id: string;
}

const cleanText = (text: string) =>
  text
    .replace(/^->\s*/g, '')
    .replace(/\s*<-\s*$/g, '')
    .replace(/\s*->\s*$/g, '')
    .replace(/[*_`~=]/g, '')
    .trim();

const TableOfContents: React.FC<TOCProps> = ({ content }) => {
  const [headers, setHeaders] = useState<HeaderEntry[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const tokens = parseMarkdown(content);
    const extracted: HeaderEntry[] = [];
    for (const token of tokens) {
      if (token.type === 'header') {
        extracted.push({ level: token.level, text: token.text, id: token.id });
      }
    }
    setHeaders(extracted);
    setActiveId('');
  }, [content]);

  useEffect(() => {
    if (headers.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-5% 0% -80% 0%' }
    );

    headers.forEach(header => {
      const element = document.getElementById(header.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headers]);

  if (headers.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-6 text-sm">
      <div className="flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px] text-base-content pl-4">
        <List size={12} className="text-primary" /> Contenido
      </div>

      <nav className="flex flex-col gap-0.5 relative">
        {headers.map(header => (
          <a
            key={header.id}
            href={`#${header.id}`}
            onClick={e => {
              e.preventDefault();
              document.getElementById(header.id)?.scrollIntoView({ behavior: 'smooth' });
              setActiveId(header.id);
            }}
            className={clsx(
              'py-1.5 px-4 transition-all duration-200 border-l-2 text-[13px] leading-snug',
              activeId === header.id
                ? 'border-primary text-primary font-bold bg-primary/5'
                : 'border-white/5 text-base-content hover:text-base-content hover:border-white/10 hover:bg-white/5'
            )}
            style={{ paddingLeft: `${(header.level - 1) * 12 + 16}px` }}
          >
            {cleanText(header.text)}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;