import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CHEATSHEET } from '../data/sample';

interface CheatsheetModalProps {
  open: boolean;
  onClose: () => void;
}

const CheatsheetModal: React.FC<CheatsheetModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-2xl max-h-[82vh] flex flex-col nr-glass rounded-3xl overflow-hidden border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <span className="material-icons-round text-[16px] text-info">menu_book</span>
              <span className="font-bold uppercase tracking-[0.2em] text-[11px] text-base-content">
                Guía rápida de sintaxis
              </span>
              <div className="flex-1" />
              <button
                onClick={onClose}
                aria-label="Cerrar guía rápida"
                className="btn btn-ghost btn-circle btn-xs text-white/50 hover:text-white hover:bg-white/10"
              >
                <X size={14} />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar p-5">
              <table className="table table-sm w-full text-[12px]">
                <tbody>
                  {CHEATSHEET.map(([syntax, desc]) => (
                    <tr key={syntax}>
                      <td className="font-mono text-primary/80 whitespace-nowrap"><code>{syntax}</code></td>
                      <td className="text-white/60">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheatsheetModal;