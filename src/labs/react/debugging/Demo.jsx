import { useState } from "react";
import FixedField from "./FixedField";

export default function Demo() {
  const [fixed, setFixed] = useState(false);
  const [renders, setRenders] = useState(0);

  // The prepared bug: this component is recreated during every render of Demo.
  // React sees a new component type each time, so it unmounts the old input —
  // and its state — instead of updating it.
  function BuggyField() {
    const [name, setName] = useState("");

    return (
      <label className="block text-xs text-ink-muted">
        Display name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Type a name, then re-render the parent"
          className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
        />
      </label>
    );
  }

  return (
    <div className="max-w-md space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setRenders((value) => value + 1)}
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          Re-render the parent ({renders})
        </button>

        <label className="flex items-center gap-2 text-xs text-ink-muted">
          <input
            type="checkbox"
            checked={fixed}
            onChange={(event) => setFixed(event.target.checked)}
          />
          Use the fix
        </label>
      </div>

      {/* eslint-disable-next-line react-hooks/static-components -- the prepared bug: creating a component during render is exactly what resets the input */}
      {fixed ? <FixedField /> : <BuggyField />}

      <p className="text-xs leading-relaxed text-ink-muted">
        {fixed
          ? "The field is defined once at module scope. Typing, focus and value now survive a parent render."
          : "Type in the field, then press the button. The input empties because a new component type replaced the old one."}
      </p>
    </div>
  );
}
