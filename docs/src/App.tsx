import React, { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Landing from './components/Landing';
import Playground from './components/Playground';
import ExampleGallery from './components/ExampleGallery';
import UsageDocs from './components/UsageDocs';

// ── Theme Context ──
type Theme = 'light' | 'dark';
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});
export const useTheme = () => useContext(ThemeCtx);

// ── App ──
export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('nr-theme') as Theme) || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('nr-theme', theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-accent-primary/15 text-accent-primary'
        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
    }`;

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <div className="h-screen flex flex-col bg-background-primary text-text-primary overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background-primary/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <span className="material-symbols-rounded text-accent-primary text-lg">edit_document</span>
              </div>
              <div>
                <h1 className="text-base font-bold leading-tight">NoirMD Previewer</h1>
                <p className="text-[11px] text-text-secondary">Markdown renderer + editor for React</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <nav className="flex items-center gap-0.5 mr-2">
                <NavLink to="/" className={navLinkClass} end>
                  <span className="material-symbols-rounded text-base">home</span>
                  <span className="hidden sm:inline">Home</span>
                </NavLink>
                <NavLink to="/playground" className={navLinkClass}>
                  <span className="material-symbols-rounded text-base">play_arrow</span>
                  <span className="hidden sm:inline">Playground</span>
                </NavLink>
                <NavLink to="/examples" className={navLinkClass}>
                  <span className="material-symbols-rounded text-base">dashboard</span>
                  <span className="hidden sm:inline">Examples</span>
                </NavLink>
                <NavLink to="/docs" className={navLinkClass}>
                  <span className="material-symbols-rounded text-base">menu_book</span>
                  <span className="hidden sm:inline">Docs</span>
                </NavLink>
              </nav>

              <button
                onClick={toggle}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <span className="material-symbols-rounded text-lg">
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Routes */}
        <main className="flex-1 flex flex-col min-h-0">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/examples" element={<ExampleGallery />} />
            <Route path="/docs" element={<UsageDocs />} />
          </Routes>
        </main>
      </div>
    </ThemeCtx.Provider>
  );
}
