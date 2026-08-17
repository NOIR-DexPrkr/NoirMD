import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Code2,
  Github,
  Puzzle,
  Palette,
  Sparkles,
  Zap,
} from 'lucide-react';
import { NRpreviewer } from '@noirmd/previewer/react';
import { DOC_GROUPS } from '../data/docsIndex';
import { HERO_SAMPLE } from '../data/sample';

const GROUP_ICONS: Record<string, React.ReactNode> = {
  start: <BookOpen size={16} />,
  syntax: <Code2 size={16} />,
  directives: <Puzzle size={16} />,
  styling: <Palette size={16} />,
  advanced: <Sparkles size={16} />,
};

const MOCK_EDITOR = (
  <pre className="font-mono text-[11px] leading-[1.75] overflow-hidden select-none">
    <div><span className="text-white/20"># </span><span className="text-white font-bold">NoirMD</span></div>
    <div>
      <span className="text-white/50">**Bold** · *italic* · ==highlight== · </span>
      <span className="text-orange-300">%orange%texto%%</span>
    </div>
    <div>
      <span className="text-white/50">&#62; Cita con </span>
      <span className="text-emerald-300">`código`</span>
      <span className="text-white/50"> y </span>
      <span className="text-sky-300">[links](https://github.com/NOIR-DexPrkr/NoirMD)</span>
      <span className="text-white/50">.</span>
    </div>
    <div className="h-2" />
    <div><span className="text-amber-300">:::note Nota</span></div>
    <div><span className="text-white/50">Renderizado con el mismo motor que tu app.</span></div>
    <div><span className="text-amber-300">:::</span></div>
    <div className="h-2" />
    <div><span className="text-white/25">| Feature  | Valor   |</span></div>
    <div><span className="text-white/25">|----------|---------|</span></div>
    <div>
      <span className="text-white/25">| Directivas | </span><span className="text-white/70">16</span>
      <span className="text-white/25">    |</span>
    </div>
    <div>
      <span className="text-white/25">| Frameworks | </span><span className="text-white/70">Todos</span>
      <span className="text-white/25">  |</span>
    </div>
    <div className="h-2" />
    <div><span className="text-white/20">```</span><span className="text-emerald-300">ts</span></div>
    <div><span className="text-emerald-200/80">const md = parseMarkdown(source);</span></div>
    <div><span className="text-white/20">```</span></div>
  </pre>
);

const Home: React.FC = () => {
  return (
    <div className="relative w-full flex justify-center p-4 lg:p-6">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* ── Hero ── */}
        <section className="nr-scale-in-center nr-glass-soft rounded-3xl p-6 md:p-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-[9px] uppercase font-black tracking-[0.25em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Documentación oficial
            </span>
            <span className="text-[9px] uppercase font-black tracking-[0.25em] text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              v2.0.0
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-5">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
                NoirMD
              </span>
            </h1>
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
              to="/playground"
              className="btn btn-primary rounded-xl gap-2 font-black tracking-wide border-none"
            >
              Probar playground <Zap size={16} />
            </Link>
            <Link
              to="/docs/introduction"
              className="btn btn-ghost border border-white/10 rounded-xl text-xs gap-2 text-white/50 hover:bg-white/5 hover:text-white transition-all"
            >
              <BookOpen size={14} /> Leer la guía
            </Link>
            <a
              href="https://github.com/NOIR-DexPrkr/NoirMD"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost border border-white/10 rounded-xl text-xs gap-2 text-white/50 hover:bg-white/5 hover:text-white transition-all"
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </section>

        {/* ── Demo editor → preview ── */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
              De markdown a DOM — en vivo
            </span>
            <div className="flex-1 h-px bg-white/5" />
            <Link
              to="/playground"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-info transition-colors flex items-center gap-1"
            >
              Abrir playground completo <ArrowRight size={11} />
            </Link>
          </div>

          <div className="nr-fade-in nr-glass rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-error/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/70" />
              <span className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                ejemplo.md — motor real
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="p-5 bg-black/30">{MOCK_EDITOR}</div>
              <div className="p-5 max-h-[420px] overflow-y-auto custom-scrollbar">
                <NRpreviewer content={HERO_SAMPLE} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Grupos de documentación ── */}
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