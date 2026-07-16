import { Link } from 'react-router-dom';

const features = [
  {
    icon: 'markdown',
    title: 'Markdown Renderer',
    description: 'Full markdown with tables, lists, blockquotes, code blocks, and inline formatting — all rendered as React components.',
  },
  {
    icon: 'edit',
    title: 'Live Editor',
    description: 'CodeMirror 6 editor with syntax highlighting, live preview, split view, and custom NoirMD syntax support.',
  },
  {
    icon: 'widgets',
    title: 'Extensible Directives',
    description: 'Admonitions, cards, modals, buttons, slides, and more — all via a simple `:::directive` syntax.',
  },
];

const quickStart = `import { NRpreviewer } from '@noirmd/previewer';
import '@noirmd/previewer/markdown.css';

function App() {
  return (
    <NRpreviewer
      content="# Hello **NoirMD**"
      tailwindCDN
    />
  );
}`;

export default function Landing() {
  return (
    <div className="flex-1 overflow-auto">
      {/* Hero */}
      <section className="relative px-4 py-20 sm:py-28 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-accent-primary/5 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-medium mb-6">
            <span className="material-symbols-rounded text-sm">auto_awesome</span>
            Markdown renderer + editor for React
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-accent-primary via-accent-hover to-accent-primary bg-clip-text text-transparent">
              NoirMD
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            A powerful markdown renderer with directives, inline extensions, and a live CodeMirror editor — built for React.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-white font-semibold text-sm hover:bg-accent-hover transition-colors shadow-lg shadow-accent-primary/20"
            >
              <span className="material-symbols-rounded text-base">play_arrow</span>
              Try Playground
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background-primary/50 font-semibold text-sm hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-rounded text-base">menu_book</span>
              Read Docs
            </Link>
            <Link
              to="/examples"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background-primary/50 font-semibold text-sm hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-rounded text-base">dashboard</span>
              Examples
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-border bg-background-primary/5 hover:border-accent-primary/20 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-primary/15 flex items-center justify-center mb-4">
                <span className="material-symbols-rounded text-accent-primary text-xl">{f.icon}</span>
              </div>
              <h3 className="text-sm font-bold mb-2">{f.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="px-4 pb-20 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6">Quick Start</h2>
        <div className="rounded-2xl border border-border bg-background-secondary-solid/20 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30 bg-background-secondary-solid/10">
            <span className="text-[10px] font-mono text-text-secondary uppercase">tsx</span>
          </div>
          <pre className="p-4 overflow-auto text-xs leading-relaxed">
            <code>{quickStart}</code>
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-6 text-center">
        <p className="text-xs text-text-secondary">
          NoirMD Previewer &middot; Built with React + Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
