import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, List, ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { NRpreviewer } from '@noirmd/previewer/react';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';
import clsx from 'clsx';

interface DocShellProps {
  slug: string;
  title: string;
  content: string;
  groupTitle?: string;
  isLoading?: boolean;
}

const panelClass =
  'nr-glass fixed top-6 w-64 z-20 rounded-3xl border-white/5 shadow-2xl';

const DocShell: React.FC<DocShellProps> = ({ slug, title, content, groupTitle, isLoading }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  const breadcrumbBtn =
    'btn btn-ghost btn-circle btn-xs text-white/50 hover:text-white hover:bg-white/10 bg-black/40 backdrop-blur shrink-0';

  return (
    <div className="relative w-full flex gap-4 p-4 lg:p-6">
      {/* ── Sidebar desktop (lg+) ── */}
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ opacity: { duration: 0.5 }, x: { duration: 0.5 } }}
        className={clsx(panelClass, 'nr-float hidden lg:block left-4 lg:left-6 h-[calc(100vh-3rem)] overflow-hidden')}
        style={{ '--float-duration': '5s' } as React.CSSProperties}
      >
        <Sidebar activeSlug={slug} />
      </motion.aside>

      {/* ── Sidebar drawer (< lg) ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div key="sidebar-drawer" className="lg:hidden fixed inset-0 z-[60]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="absolute left-4 top-4 bottom-4 w-72 rounded-3xl bg-[#0a0a0f]/95 border border-white/5 shadow-2xl overflow-hidden"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            >
              <Sidebar activeSlug={slug} onSelect={() => setSidebarOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOC desktop (xl+) ── */}
      <AnimatePresence>
        {content && (
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ opacity: { duration: 0.5, delay: 0.2 }, x: { duration: 0.5, delay: 0.2 } }}
            className={clsx(
              panelClass,
              'nr-float hidden xl:block right-4 xl:right-6 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto custom-scrollbar p-5'
            )}
            style={{ '--float-duration': '6s', '--float-delay': '1s' } as React.CSSProperties}
          >
            <TableOfContents content={content} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── TOC drawer (< xl) ── */}
      <AnimatePresence>
        {tocOpen && content && (
          <motion.div key="toc-drawer" className="xl:hidden fixed inset-0 z-[60]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={() => setTocOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="absolute right-4 top-4 bottom-4 w-72 rounded-3xl bg-[#0a0a0f]/95 border border-white/5 shadow-2xl overflow-y-auto custom-scrollbar p-5"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            >
              <TableOfContents content={content} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Contenido ── */}
      <div className="flex-1 min-w-0 lg:ml-72 xl:mr-72">
        <div className="nr-scale-in-center nr-glass-soft rounded-3xl p-6 md:p-8 lg:p-10">
          {/* Breadcrumbs + botones de menú */}
          <nav className="flex items-center gap-1.5 mb-6 flex-wrap text-xs">
            <button onClick={() => setSidebarOpen(true)} title="Índice" aria-label="Abrir índice"
              className={clsx(breadcrumbBtn, 'lg:hidden')}>
              <Menu size={14} />
            </button>

            <Link to="/" className="btn btn-ghost btn-circle btn-xs text-white/50 hover:text-white hover:bg-white/10 shrink-0"
              title="Inicio">
              <Home size={14} />
            </Link>

            <span className="text-white/20">›</span>
            <Link to="/docs/introduction" className="text-white/40 hover:text-white transition-colors">
              Guía
            </Link>

            {groupTitle && (
              <>
                <span className="text-white/20">›</span>
                <span className="text-white/40">{groupTitle}</span>
              </>
            )}

            <span className="text-white/20">›</span>
            <span className="text-primary font-semibold">{title}</span>

            <div className="flex-1" />

            {content && (
              <button onClick={() => setTocOpen(true)} title="Contenido" aria-label="Abrir contenido"
                className={clsx(breadcrumbBtn, 'xl:hidden')}>
                <List size={14} />
              </button>
            )}
          </nav>

          {/* Header */}
          <header className="space-y-1 mb-8 pb-4 border-b border-white/5">
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <span className="text-[9px] uppercase font-black tracking-[0.2em] text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                {groupTitle || 'Guía'}
              </span>
              <span className="text-[9px] uppercase font-black tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                @noirmd/previewer v2.0.0
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">{title}</h1>
          </header>

          {/* Artículo */}
          <section className="max-w-none">
            {isLoading ? (
              <div className="py-32 flex flex-col items-center justify-center gap-6 opacity-60">
                <span className="loading loading-spinner text-primary w-12 h-12"></span>
                <p className="font-mono text-sm tracking-widest uppercase animate-pulse text-white/40">
                  Cargando documentación...
                </p>
              </div>
            ) : content ? (
              <NRpreviewer content={content} tailwindCDN />
            ) : (
              <div className="py-20 text-center opacity-30 italic text-white/30 bg-white/5 rounded-3xl border border-dashed border-white/10">
                Esta página aún no tiene contenido.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DocShell;