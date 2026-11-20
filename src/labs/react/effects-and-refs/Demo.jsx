import { useEffect, useRef, useState } from "react";

export default function Demo() {
  const [open, setOpen] = useState(false);
  const areaRef = useRef(null);

  // A document listener is an outside system: attach it in an effect and
  // always detach it in the cleanup, so re-runs and unmounts never leak.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event) {
      if (!areaRef.current?.contains(event.target)) setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div ref={areaRef} className="space-y-4">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
      >
        {open ? "Hide the panel" : "Show the panel"}
      </button>

      {open && (
        <div
          role="note"
          className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm leading-relaxed"
        >
          Click anywhere outside this area — the document listener closes the
          panel. The toggle button sits inside the ref, so it does not fight the
          listener.
        </div>
      )}

      <p className="font-mono text-xs text-ink-muted">
        effect: {open ? "listener attached" : "no listener"} · the cleanup ran
        on every close
      </p>
    </div>
  );
}
