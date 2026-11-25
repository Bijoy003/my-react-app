import { useState } from "react";

// Defined once, at module scope. React compares component types by identity,
// so this type survives every render of the parent and its state is kept.
export default function FixedField() {
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
