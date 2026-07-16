import React, { useId } from 'react';
import type { DirectiveComponentProps } from '../types';
import { IconRenderer, Modal } from '../ui-components';
import { parseCssString } from '../utils';

/**
 * Card Directive — renders card, card-m (modal), card-b (link) variants.
 * Uses Tailwind with override pattern.
 *
 * V2 syntax:
 *   :::card {title="Card Title" image="url" icon="star" class="custom"}
 *   #description
 *   Short description text
 *   #content
 *   Main card content (for card-m: shown in modal)
 *   :::
 */
const CardDirective: React.FC<DirectiveComponentProps> = ({
  directiveType,
  props,
  slots,
  renderSlot,
  context,
  options = {},
}) => {
  const stableId = useId();
  const { title, image, icon, class: customClass, url, target } = props;
  const hasDescription = !!slots.description;
  const { isSingleCard } = options;

  const isModal = directiveType === 'card-m';
  const isLink = directiveType === 'card-b';

  const modalId = `modal-card-${props.id || stableId}`;
  const wrapperClass = customClass || '';
  const inlineStyles = props.style ? parseCssString(props.style) : {};

  const description = hasDescription ? renderSlot('description') : null;
  const content = renderSlot('content') || renderSlot('default');

  return (
    <React.Fragment>
      <div
        className={`flex flex-col h-full rounded-3xl transition-all relative overflow-hidden group border min-w-[18rem] w-[18rem] max-w-[20rem] ${isModal || isLink ? 'cursor-pointer !border-accent-primary/10 hover:border-accent-primary/50' : 'border-border'} ${wrapperClass}`}
        style={inlineStyles}
        onClick={isModal
          ? (e) => { e.preventDefault(); e.stopPropagation(); context.setModals((prev: any) => ({ ...prev, [modalId]: true })); }
          : isLink && url
            ? () => window.open(url, '_blank')
            : undefined
        }
        role={isModal ? 'button' : undefined}
        tabIndex={isModal ? 0 : undefined}
        onKeyDown={isModal
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') context.setModals((prev: any) => ({ ...prev, [modalId]: true })); }
          : undefined
        }
      >
        {/* Image banner */}
        {image && (
          <div className={`w-full ${isSingleCard ? 'h-[240px]' : 'h-[160px]'} overflow-hidden relative transition-all duration-500`}>
            <img src={image} alt={title || ''} className="w-full h-full object-cover !m-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-primary/40 to-transparent" />
          </div>
        )}

        {/* Content body — overlaps image */}
        <div className={`flex flex-col flex-1 bg-background-primary/80 rounded-t-xl p-6 relative ${image ? '-mt-10' : ''} border-t border-white/5 shadow-2xl`}>
          {/* Header: Icon + Title */}
          <div className="flex items-center gap-3 mb-3">
            {icon && (
              <div className="w-10 h-10 text-[1.6em] rounded-xl bg-accent-primary/20 flex items-center justify-center shrink-0 text-accent-primary">
                <IconRenderer iconName={icon} />
              </div>
            )}
            <h3 className="text-base font-black tracking-tight leading-tight !m-0">
              {title}
            </h3>
          </div>

          {/* Content Body */}
          <div className="flex-1 flex flex-col gap-2">
            {description && (
              <div className="text-sm opacity-80 leading-relaxed font-medium">
                {description}
              </div>
            )}
            {directiveType === 'card' && content && (
              <div className="mt-2">{content}</div>
            )}
          </div>

          {/* Bottom: Action Link */}
          {(isModal || isLink) && (
            <div className="mt-6 flex justify-end">
              {isLink && url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-primary/20 hover:bg-accent-primary/30 px-4 py-2 rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 group-hover:text-accent-primary transition-all no-underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconRenderer iconName="open_in_new" /> Link
                </a>
              ) : isModal ? (
                <div className="bg-accent-primary/20 hover:bg-accent-primary/30 px-4 py-2 cursor-pointer rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 group-hover:text-accent-primary transition-all">
                  <IconRenderer iconName="arrow_forward" /> Abrir
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Modal for card-m */}
      {isModal && (
        <Modal
          title={title || 'Detalles'}
          isOpen={!!context.modals[modalId]}
          onClose={() => context.setModals((prev: any) => ({ ...prev, [modalId]: false }))}
        >
          <div className="prose prose-sm max-w-none">{content}</div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default CardDirective;
