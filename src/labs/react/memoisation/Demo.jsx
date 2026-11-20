import { memo, useCallback, useEffect, useRef, useState } from "react";
import { CachedList, PlainList } from "./Lists";

// memo() skips the render when props are unchanged. The counter is written
// straight to the DOM from an effect — a state update here would itself
// cause another render, so the count lives outside React.
const TickButton = memo(function TickButton({ onTick }) {
  const renders = useRef(0);
  const labelRef = useRef(null);
  useEffect(() => {
    renders.current += 1;
    labelRef.current.textContent = `${renders.current}×`;
  });
  return (
    <button
      type="button"
      onClick={onTick}
      className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
    >
      Re-render the parent · this button rendered <span ref={labelRef}>0×</span>
    </button>
  );
});

export default function Demo() {
  const [query, setQuery] = useState("");
  const [cached, setCached] = useState(true);
  const [, setTick] = useState(0);

  // A stable identity means memo(TickButton) sees the same prop every time.
  const onTick = useCallback(() => setTick((current) => current + 1), []);

  return (
    <div className="space-y-4">
      <div className="flex max-w-md flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter 2,000 words…"
          aria-label="Filter words"
          className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={cached}
            onChange={(event) => setCached(event.target.checked)}
          />
          Cache the work
        </label>
      </div>

      <TickButton onTick={cached ? onTick : () => setTick((c) => c + 1)} />

      {cached ? <CachedList query={query} /> : <PlainList query={query} />}

      <p className="text-xs text-ink-muted">
        Type to filter, then press the button with caching on and off. Off:
        every press re-runs the slow filter and re-renders the button. On: both
        are skipped.
      </p>
    </div>
  );
}
