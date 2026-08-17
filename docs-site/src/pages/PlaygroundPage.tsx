import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Trash2, Wand2 } from 'lucide-react';
import NReditor from '@noirmd/previewer/editor';
import clsx from 'clsx';
import CheatsheetModal from '../components/CheatsheetModal';
import { SAMPLE } from '../data/sample';

const toolBtn =
  'btn btn-xs btn-ghost border rounded-lg text-[10px] gap-1.5 transition-all';

const PlaygroundPage: React.FC = () => {
  const [md, setMd] = useState(SAMPLE);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="relative w-full flex justify-center p-4 lg:p-6">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* Header */}
        <header className="nr-scale-in-center flex flex-col gap-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[9px] uppercase font-black tracking-[0.25em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Playground
            </span>
            <span className="text-[9px] uppercase font-black tracking-[0.25em] text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              v2.0.0
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Experimenta con{' '}
            <span className="bg-gradient-to-r from-primary via-info to-secondary bg-clip-text text-transparent">
              NoirMD
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Escribe markdown a la izquierda y mira el render en tiempo real. Todas las
            directivas, componentes interactivos y estilos incluidos.
          </p>
        </header>

        {/* Editor */}
        <div className="nr-glass-soft rounded-3xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 flex-wrap">
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Editor en vivo
            </span>
            <div className="flex-1" />
            <button
              onClick={() => setMd(SAMPLE)}
              className={clsx(toolBtn, 'border-white/10 text-white/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30')}
            >
              <Wand2 size={12} /> Ejemplo
            </button>
            <button
              onClick={() => setMd('')}
              className={clsx(toolBtn, 'border-white/10 text-white/50 hover:bg-error/10 hover:text-error hover:border-error/30')}
            >
              <Trash2 size={12} /> Limpiar
            </button>
            <button
              onClick={() => setHelpOpen(true)}
              className={clsx(toolBtn, 'border-white/10 text-white/50 hover:bg-info/10 hover:text-info hover:border-info/30')}
            >
              <BookOpen size={12} /> Guía rápida
            </button>
          </div>

          <NReditor value={md} onChange={setMd} onGuide={() => setHelpOpen(true)} />
        </div>

        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">16 directivas</span>
          <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">TOC automático</span>
          <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">CodeMirror 6</span>
          <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">CSS modular</span>
          <Link
            to="/docs/block-syntax"
            className="bg-info/10 border border-info/20 text-info hover:bg-info/20 transition-colors px-2.5 py-1 rounded-full inline-flex items-center gap-1"
          >
            Ver sintaxis completa <ArrowRight size={10} />
          </Link>
        </footer>
      </div>

      <CheatsheetModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
};

export default PlaygroundPage;