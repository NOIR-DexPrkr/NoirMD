import { useState } from 'react';
import { NRpreviewer } from '@noirmd/previewer';
import '@noirmd/previewer/markdown.css';
import { examples } from '../data/examples';

export default function ExampleGallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Example Gallery</h2>
          <p className="text-text-secondary text-sm">
            Live examples of every directive and syntax feature. Click any card to expand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map(ex => (
            <button
              key={ex.id}
              onClick={() => setActive(active === ex.id ? null : ex.id)}
              className="text-left p-5 rounded-2xl border border-border bg-background-primary/5 hover:border-accent-primary/30 hover:bg-accent-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/15 flex items-center justify-center shrink-0 group-hover:bg-accent-primary/25 transition-colors">
                  <span className="material-symbols-rounded text-accent-primary">{ex.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold">{ex.title}</h3>
                  <p className="text-xs text-text-secondary">{ex.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-accent-primary opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-rounded text-sm">
                  {active === ex.id ? 'expand_less' : 'expand_more'}
                </span>
                {active === ex.id ? 'Collapse' : 'Expand'}
              </div>
            </button>
          ))}
        </div>

        {/* Expanded example */}
        {active && (
          <div className="mt-6 rounded-2xl border border-accent-primary/20 bg-background-primary/5 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background-secondary-solid/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-rounded text-accent-primary text-base">
                  {examples.find(e => e.id === active)?.icon}
                </span>
                <span className="text-sm font-semibold">
                  {examples.find(e => e.id === active)?.title}
                </span>
              </div>
              <button
                onClick={() => setActive(null)}
                className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-text-secondary"
              >
                <span className="material-symbols-rounded text-sm">close</span>
              </button>
            </div>
            <div className="p-6">
              <NRpreviewer content={examples.find(e => e.id === active)?.markdown || ''} tailwindCDN />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
