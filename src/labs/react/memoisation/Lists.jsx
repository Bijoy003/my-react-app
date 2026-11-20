import { useMemo } from "react";
import { slowFilter } from "./compute";

// Two versions of the same list: one caches the slow filter, one recomputes
// it on every render. Comparing them is the whole lesson.
export function CachedList({ query }) {
  const { matches, total, ms } = useMemo(() => slowFilter(query), [query]);
  return <Result matches={matches} total={total} ms={ms} cached />;
}

export function PlainList({ query }) {
  const { matches, total, ms } = slowFilter(query);
  return <Result matches={matches} total={total} ms={ms} />;
}

function Result({ matches, total, ms, cached = false }) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs text-ink-muted">
        filter took {ms} ms · {total} matches
        {cached ? " · cached: unrelated re-renders reuse it" : ""}
      </p>
      <ul className="flex flex-wrap gap-2">
        {matches.map((word) => (
          <li
            key={word}
            className="rounded-lg border border-line bg-surface px-2 py-1 font-mono text-xs text-ink"
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}
