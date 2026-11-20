import { Suspense, use, useRef, useState } from "react";
import { fetchTip } from "./api";

// use() unwraps the promise during render; Suspense shows the fallback until
// it settles. Unlike other hooks, use() may sit inside conditions.
function Tip({ promise }) {
  const tip = use(promise);
  return (
    <p
      role="status"
      className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm leading-relaxed"
    >
      {tip}
    </p>
  );
}

// React 19: ref arrives as a plain prop. No forwardRef wrapper anywhere.
function FocusField({ ref }) {
  return (
    <input
      ref={ref}
      placeholder="Focus target"
      aria-label="Focus target"
      className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    />
  );
}

export default function Demo() {
  const [tipPromise, setTipPromise] = useState(null);
  const fieldRef = useRef(null);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setTipPromise(fetchTip())}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {tipPromise ? "Load another tip" : "Load a tip with use()"}
        </button>
        {tipPromise ? (
          <Suspense
            fallback={<p className="text-sm text-ink-muted">Loading tip…</p>}
          >
            <Tip promise={tipPromise} />
          </Suspense>
        ) : (
          <p className="text-sm text-ink-muted">
            Nothing requested yet — the promise is created in the handler, never
            during render.
          </p>
        )}
      </div>

      <div className="flex max-w-md gap-2">
        <FocusField ref={fieldRef} />
        <button
          type="button"
          onClick={() => fieldRef.current?.focus()}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          Focus via ref
        </button>
      </div>

      <p className="text-xs text-ink-muted">
        The field takes ref as an ordinary prop and hands it to the input, so
        the parent can focus it without forwardRef.
      </p>
    </div>
  );
}
