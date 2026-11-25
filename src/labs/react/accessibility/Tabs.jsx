import { useId, useRef } from "react";

// A tab list is a composite widget: one tab stop for the group, arrow keys to
// move inside it, and focus follows the selection.
export default function Tabs({ items, active, onChange }) {
  const id = useId();
  const refs = useRef([]);

  function handleKeyDown(event) {
    const last = items.length - 1;
    let next = null;

    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Accessibility topics"
        className="flex flex-wrap gap-2"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls={`${id}-panel-${item.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => onChange(index)}
            onKeyDown={handleKeyDown}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              index === active
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-ink-muted hover:border-accent hover:text-accent"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${id}-panel-${item.id}`}
          aria-labelledby={`${id}-tab-${item.id}`}
          tabIndex={0}
          hidden={index !== active}
          className="mt-4 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed"
        >
          {item.body}
        </div>
      ))}
    </div>
  );
}
