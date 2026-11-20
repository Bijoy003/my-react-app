import { useState } from "react";
import Code from "../../../components/Code";

export default function Demo() {
  const [title, setTitle] = useState("Learn one topic at a time");
  const [name, setName] = useState("friend");
  const [accent, setAccent] = useState(true);

  // A fragment groups the controls and the preview into one root without
  // adding a wrapper element to the DOM.
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="block text-ink-muted">Headline</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink"
          />
        </label>

        <label className="space-y-1 text-sm">
          <span className="block text-ink-muted">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink"
          />
        </label>
      </div>

      <label className="mt-4 flex w-fit items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={accent}
          onChange={(event) => setAccent(event.target.checked)}
          className="size-4 accent-[var(--color-accent)]"
        />
        Highlight the headline
      </label>

      <section className="mt-6 rounded-xl border border-dashed border-line bg-surface p-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Hello, {name || "stranger"}
        </p>
        <h2
          className={`mt-3 text-2xl font-semibold ${
            accent ? "text-accent" : "text-ink"
          }`}
        >
          {title || "Untitled"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed">
          Both values above arrived through braces, the colour is a{" "}
          <Code>className</Code> expression, and the two blocks live side by
          side with no wrapper of their own.
        </p>
      </section>
    </>
  );
}
