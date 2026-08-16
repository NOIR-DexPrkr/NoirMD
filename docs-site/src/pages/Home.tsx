import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, Puzzle, Palette, Sparkles, Zap } from 'lucide-react';
import Playground from '../components/Playground';
import { DOC_GROUPS } from '../data/docsIndex';

const GROUP_ICONS: Record<string, React.ReactNode> = {
  start: <BookOpen size={16} />,
  syntax: <Code2 size={16} />,
  directives: <Puzzle size={16} />,
  styling: <Palette size={16} />,
  advanced: <Sparkles size={16} />,
};

const Home: React.FC = () => {
  return (
    <div className="relative w-full flex justify-center p-4 lg:p-6">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Hero */}
        <section className="nr-scale-in-center nr-glass-soft rounded-3xl p-6 md:p-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-[9px] uppercase font-black tracking-[0.25em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Documentación oficial
            </span>
            <span className="text-[9px] uppercase font-black tracking-[0.25em] text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              v2.0.0
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Zap size={28} />
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">NoirMD</h1>
          </div>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium max-w-2xl mx-auto">
            Renderer de markdown <strong className="text-white">framework-agnostic</strong>: un solo
            motor DOM con wrappers React/Vue, directivas, componentes interactivos y CSS puro.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            {['16 directivas', 'CSS modular', 'Syntax highlighting', 'Editor CodeMirror 6', 'MIT'].map(chip => (
              <span key={chip} className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              to="/docs/introduction"
              className="btn btn-primary rounded-xl gap-2 font-black tracking-wide border-none"
            >
              Empezar <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/NOIR-DexPrkr/NoirMD"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost border border-white/10 rounded-xl text-xs gap-2 text-white/50 hover:bg-white/5 hover:text-white transition-all"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* Playground — el hero es el editor+preview */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
              Pruébalo ahora — edita el markdown
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <Playground />
        </section>

        {/* Grupos de documentación */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DOC_GROUPS.map(group => {
            const first = group.docs[0];
            return (
              <Link
                key={group.id}
                to={`/docs/${first.slug}`}
                className="nr-glass rounded-3xl p-5 flex flex-col gap-3 group hover:border-primary/30 transition-all duration-200 no-underline"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {GROUP_ICONS[group.id]}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-black text-sm text-white">{group.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                      {group.docs.length} {group.docs.length === 1 ? 'guía' : 'guías'}
                    </span>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-[12px] text-white/40 leading-relaxed line-clamp-2">
                  {group.docs.map(d => d.title).join(' · ')}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Home;