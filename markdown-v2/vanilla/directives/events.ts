// ============================================================
// Event prop binding (vanilla)
//
// Generic `event` prop support for directives:
//
//   :::richlist-item {event="click: playSound; mouseover: hoverFn"}
//
// Syntax per binding: `eventName: functionName`, multiple
// bindings separated by `;`. The event name tolerates an `on`
// prefix (`onclick` → `click`). The function is resolved from
// the global scope at event time and invoked with the element
// as `this` and the DOM event as argument.
//
// Trust model: same as :::raw / :::style — author-owned content.
// ============================================================

export interface EventBinding {
  eventName: string;
  fnName: string;
}

export function parseEventProp(eventProp?: string): EventBinding[] {
  if (!eventProp) return [];
  const bindings: EventBinding[] = [];
  for (const part of eventProp.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const idx = trimmed.indexOf(':');
    if (idx === -1) continue;
    const eventName = trimmed.slice(0, idx).trim().replace(/^on/i, '');
    const fnName = trimmed.slice(idx + 1).trim();
    if (eventName && fnName) bindings.push({ eventName, fnName });
  }
  return bindings;
}

export function bindEventProp(el: HTMLElement, eventProp?: string): void {
  for (const { eventName, fnName } of parseEventProp(eventProp)) {
    el.addEventListener(eventName, (e) => {
      const fn = (window as unknown as Record<string, unknown>)[fnName];
      if (typeof fn === 'function') {
        (fn as (this: HTMLElement, ev: Event) => void).call(el, e);
      }
    });
  }
}