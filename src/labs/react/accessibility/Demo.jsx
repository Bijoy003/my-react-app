import { useState } from "react";
import Tabs from "./Tabs";
import { topics } from "./topics";

export default function Demo() {
  const [active, setActive] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6">
      <Tabs items={topics} active={active} onChange={setActive} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() =>
            setMessage(`Saved “${topics[active].label}” to your plan.`)
          }
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Save to plan
        </button>
        <p role="status" className="text-sm text-accent">
          {message}
        </p>
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        Tab to the tab list, then use ← → Home End. A screen reader hears each
        tab's role, name and selected state. The save message arrives through a
        live region even though nothing moves on screen.
      </p>
    </div>
  );
}
