import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { guideData, type GuideEntry } from '../guide/index';
import CustomMarkdownRenderer from './CustomMarkdownRenderer';

export interface GuideProps {
  open: boolean;
  onClose: () => void;
  initialDirective?: string;
  search?: boolean;
}

/**
 * Guide — in-editor syntax guide.
 *
 * Populated by guideData (generated from guide/**\/*.md at build time by
 * guide/build.mjs). Each entry is rendered live with the same markdown
 * engine used by the preview, so directives inside the guide are real
 * working examples.
 */
const Guide: React.FC<GuideProps> = ({
  open,
  onClose,
  initialDirective,
  search = true,
}) => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [navOpen, setNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => {
    const map = new Map<string, GuideEntry[]>();
    for (const e of guideData) {
      const arr = map.get(e.category) ?? [];
      arr.push(e);
      map.set(e.category, arr);
    }
    return [...map.entries()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map(([cat, entries]) => [
        cat,
        entries.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.id.toLowerCase().includes(q) ||
            e.category.toLowerCase().includes(q) ||
            e.md.slice(0, 400).toLowerCase().includes(q)
        ),
      ] as const)
      .filter(([, entries]) => entries.length > 0);
  }, [groups, query]);

  const selected = useMemo(
    () => guideData.find((e) => e.id === selectedId) ?? null,
    [selectedId]
  );

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setNavOpen(false);
    if (!selectedId) {
      const initial =
        guideData.find((e) => e.id === initialDirective) ??
        guideData.find((e) => e.id === 'introduccion') ??
        guideData[0];
      setSelectedId(initial?.id ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Lock page scroll while the guide is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Each entry opens at the top of its content
    contentRef.current?.scrollTo({ top: 0 });
  }, [selectedId, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggleCategory = (cat: string) =>
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return createPortal(
    <div className="nr-guide" role="dialog" aria-modal="true" aria-label="Guía de sintaxis">
      <div className="nr-guide__overlay" onClick={onClose} />
      <div className="nr-guide__panel">
        <header className="nr-guide__head">
          <button
            className="nr-guide__nav-toggle"
            onClick={() => setNavOpen(true)}
            aria-label="Abrir navegación"
          >
            <span className="material-icons-round">menu</span>
          </button>
          <span className="material-icons-round">menu_book</span>
          <h2>Guía de sintaxis</h2>
          {search && (
            <input
              className="nr-guide__search"
              type="search"
              placeholder="Buscar directiva…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          <button
            className="nr-guide__close"
            onClick={onClose}
            aria-label="Cerrar guía"
          >
            ×
          </button>
        </header>
        <div className="nr-guide__body">
          {/* Nav drawer (mobile) */}
          {navOpen && (
            <>
              <div className="nr-guide__nav-overlay" onClick={() => setNavOpen(false)} />
              <div className="nr-guide__nav-drawer nr-guide__nav-drawer--open">
                <nav>
                  {filtered.map(([cat, entries]) => (
                    <div className="nr-guide__cat" key={cat}>
                      <button
                        className="nr-guide__cat-head"
                        onClick={() => toggleCategory(cat)}
                      >
                        <span className="material-icons-round nr-guide__cat-chevron">
                          {collapsed[cat] ? 'chevron_right' : 'expand_more'}
                        </span>
                        {cat}
                      </button>
                      {!collapsed[cat] && (
                        <ul className="nr-guide__items">
                          {entries.map((e) => (
                            <li key={e.id}>
                              <button
                                className={`nr-guide__item${
                                  selectedId === e.id ? ' nr-guide__item--active' : ''
                                }`}
                                onClick={() => {
                                  setSelectedId(e.id);
                                  setNavOpen(false);
                                }}
                              >
                                {e.icon && (
                                  <span className="material-icons-round nr-guide__item-icon">
                                    {e.icon}
                                  </span>
                                )}
                                {e.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="nr-guide__empty">Sin resultados para «{query}».</div>
                  )}
                </nav>
              </div>
            </>
          )}
          {/* Nav inline (desktop) */}
          <nav className="nr-guide__nav">
            {filtered.map(([cat, entries]) => (
              <div className="nr-guide__cat" key={cat}>
                <button
                  className="nr-guide__cat-head"
                  onClick={() => toggleCategory(cat)}
                >
                  <span className="material-icons-round nr-guide__cat-chevron">
                    {collapsed[cat] ? 'chevron_right' : 'expand_more'}
                  </span>
                  {cat}
                </button>
                {!collapsed[cat] && (
                  <ul className="nr-guide__items">
                    {entries.map((e) => (
                      <li key={e.id}>
                        <button
                          className={`nr-guide__item${
                            selectedId === e.id ? ' nr-guide__item--active' : ''
                          }`}
                          onClick={() => setSelectedId(e.id)}
                        >
                          {e.icon && (
                            <span className="material-icons-round nr-guide__item-icon">
                              {e.icon}
                            </span>
                          )}
                          {e.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="nr-guide__empty">Sin resultados para «{query}».</div>
            )}
          </nav>
          <div className="nr-guide__content" ref={contentRef}>
            {selected ? (
              <CustomMarkdownRenderer key={selected.id} content={selected.md} />
            ) : (
              <div className="nr-guide__empty">
                Selecciona una directiva de la lista.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Guide;
