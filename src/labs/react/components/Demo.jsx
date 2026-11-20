import { useState } from "react";
import Code from "../../../components/Code";

// A component is a function that returns markup. React calls it, and the
// returned tree becomes part of the page.
function Badge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
      <span aria-hidden="true">f()</span>
      returns markup
    </span>
  );
}

function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3">
      <span className="font-mono text-sm font-semibold text-ink">
        React<span className="text-accent">Basics</span>
      </span>
      <Badge />
    </header>
  );
}

export default function Demo() {
  const [capitalised, setCapitalised] = useState(true);

  // The first letter decides how JSX reads the tag: `Badge` is this file's
  // function, while "badge" is a plain HTML element name.
  const Tag = capitalised ? Badge : "badge";

  return (
    <>
      <Header />

      <label className="mt-5 flex w-fit items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={capitalised}
          onChange={(event) => setCapitalised(event.target.checked)}
          className="size-4 accent-[var(--color-accent)]"
        />
        Write the tag with a capital letter
      </label>

      <div className="mt-4 rounded-xl border border-dashed border-line bg-surface p-4">
        <p className="mb-3 font-mono text-xs text-ink-muted">
          <Code>{capitalised ? "<Badge />" : "<badge />"}</Code>
        </p>
        <Tag />
      </div>

      <p className="mt-4 text-sm leading-relaxed">
        {capitalised
          ? "The capital B makes JSX call the Badge function, so the same markup appears here and inside the header."
          : "A lowercase tag is only an element name. There is no <badge> element, so nothing renders and the Badge function never runs."}
      </p>
    </>
  );
}
