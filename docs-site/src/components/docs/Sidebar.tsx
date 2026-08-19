import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Code2, Settings2, Sparkles, FileText, Zap } from 'lucide-react';
import { DOC_GROUPS } from '../../data/docsIndex';
import type { DocGroup } from '../../data/docsIndex';
import clsx from 'clsx';

const GROUP_ICONS: Record<string, React.ReactNode> = {
  start: <BookOpen size={14} />,
  syntax: <Code2 size={14} />,
  config: <Settings2 size={14} />,
  advanced: <Sparkles size={14} />,
};

const SidebarGroup: React.FC<{
  group: DocGroup;
  activeSlug?: string;
  onSelect?: () => void;
  defaultOpen?: boolean;
}> = ({ group, activeSlug, onSelect, defaultOpen = false }) => {
  const hasActive = group.docs.some(d => d.slug === activeSlug);
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActive);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(o => !o)}
        className={clsx(
          'flex items-center justify-between py-1.5 px-3 rounded-lg transition-all duration-150 group mx-1 w-full',
          hasActive ? 'text-primary' : 'text-white/50 hover:bg-white/5 hover:text-white'
        )}
      >
        <span className="flex items-center gap-2 truncate flex-1">
          <span className={clsx('shrink-0 transition-colors', hasActive ? 'text-primary' : 'text-white/30 group-hover:text-primary')}>
            {GROUP_ICONS[group.id] || <FileText size={14} />}
          </span>
          <span className="truncate font-bold text-[11px] uppercase tracking-[0.15em]">{group.title}</span>
        </span>
        <ChevronRight
          size={13}
          className={clsx('shrink-0 transition-transform duration-200 opacity-30 group-hover:opacity-60', isOpen && 'rotate-90')}
        />
      </button>

      {isOpen && (
        <div className="flex flex-col mt-0.5 ml-4">
          <div className="border-l border-white/5 flex flex-col">
            {group.docs.map(doc => {
              const isActive = doc.slug === activeSlug;
              return (
                <Link
                  key={doc.slug}
                  to={`/docs/${doc.slug}`}
                  onClick={onSelect}
                  className={clsx(
                    'flex items-center gap-2 py-1.5 px-4 text-[12.5px] transition-all duration-150 relative group/item',
                    isActive
                      ? 'text-primary font-semibold bg-primary/10 before:absolute before:left-[-1px] before:top-0 before:bottom-0 before:w-[2px] before:bg-primary'
                      : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                  )}
                >
                  <FileText
                    size={11}
                    className={clsx(
                      'flex-shrink-0 transition-colors',
                      isActive ? 'text-primary opacity-100' : 'opacity-30 group-hover/item:opacity-70 group-hover/item:text-primary'
                    )}
                  />
                  <span className="truncate">{doc.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  activeSlug?: string;
  onSelect?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSlug, onSelect }) => {
  return (
    <div className="h-full flex flex-col w-full overflow-hidden">
      <div className="px-4 pt-5 pb-4 border-b border-white/5">
        <Link to="/" onClick={onSelect} className="flex items-center gap-2 mb-4 group">
          <span className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Zap size={16} />
          </span>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tight text-white">NoirMD</span>
            <span className="font-bold text-[9px] uppercase tracking-[0.18em] text-white/40">
              @noirmd/previewer <span className="text-primary">v2.0.0</span>
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
          <span className="w-1 h-1 rounded-full bg-primary" />
          Documentación
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar py-2 space-y-1">
        {DOC_GROUPS.map(group => (
          <SidebarGroup
            key={group.id}
            group={group}
            activeSlug={activeSlug}
            onSelect={onSelect}
            defaultOpen={group.id === 'start' || group.docs.some(d => d.slug === activeSlug)}
          />
        ))}
      </div>

      <div className="px-4 py-3 border-t border-white/5 flex flex-col gap-1.5">
        <a
          href="/llms.txt"
          title="LLM-readable site index"
          className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-primary transition-colors"
        >
          <FileText size={11} className="text-primary/60" />
          llms.txt
        </a>
        <div className="flex items-center gap-2 text-[10px] font-bold text-white/30">
          MIT License · Framework-agnostic
        </div>
      </div>
    </div>
  );
};

export default Sidebar;