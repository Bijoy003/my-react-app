import { Suspense, lazy, useState } from "react";
import ErrorBoundary from "../../../components/ErrorBoundary";

// The timer stands in for a slow network. Once the module resolves, React
// caches it, so a second mount does not show the fallback again.
const SlowPanel = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./SlowPanel")), 900),
    ),
);

function CrashPanel({ crash }) {
  if (crash) throw new Error("The panel could not load its data.");

  return (
    <p className="text-sm text-ink-muted">
      This panel is fine. Press “Throw an error” and only this box is replaced.
    </p>
  );
}

export default function Demo() {
  const [showPanel, setShowPanel] = useState(false);
  const [crash, setCrash] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowPanel(true)}
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          Load the slow panel
        </button>
        <button
          type="button"
          onClick={() => setCrash(true)}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          Throw an error
        </button>
      </div>

      <div className="rounded-xl border border-line bg-surface p-4">
        <Suspense
          fallback={
            <p role="status" className="text-sm text-ink-muted">
              Loading the panel…
            </p>
          }
        >
          {showPanel ? (
            <SlowPanel />
          ) : (
            <p className="text-sm text-ink-muted">Nothing loaded yet.</p>
          )}
        </Suspense>
      </div>

      <ErrorBoundary onReset={() => setCrash(false)}>
        <CrashPanel crash={crash} />
      </ErrorBoundary>
    </div>
  );
}
