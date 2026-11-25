import { Profiler, useRef, useState } from "react";
import ProfileTable from "./ProfileTable";
import { DirectRows, MemoisedRows } from "./RowList";

export default function Demo() {
  const [query, setQuery] = useState("");
  const [memoise, setMemoise] = useState(false);
  const [tick, setTick] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const samples = useRef([]);

  function capture() {
    const times = samples.current.slice(-20);
    samples.current = [];
    if (times.length === 0) return;

    const profile = {
      mode: memoise ? "Memoised filter" : "Direct filter",
      commits: times.length,
      average: times.reduce((total, time) => total + time, 0) / times.length,
      worst: Math.max(...times),
    };

    // Keep one previous capture so the two modes can be compared on screen.
    setProfiles((current) => [...current.slice(-1), profile]);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs text-ink-muted">
          Filter rows
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-1 block w-40 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
          />
        </label>

        <label className="flex items-center gap-2 pb-2 text-xs text-ink-muted">
          <input
            type="checkbox"
            checked={memoise}
            onChange={(event) => setMemoise(event.target.checked)}
          />
          Cache the filter with useMemo
        </label>

        <button
          type="button"
          onClick={() => setTick((value) => value + 1)}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          Re-render parent ({tick})
        </button>

        <button
          type="button"
          onClick={capture}
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          Capture profile
        </button>
      </div>

      <Profiler
        id="filtered-rows"
        onRender={(_id, _phase, actualDuration) => {
          // A ref keeps the measurement out of state: setting state here would
          // schedule the very commit that is being measured.
          samples.current.push(actualDuration);
        }}
      >
        {memoise ? (
          <MemoisedRows query={query} />
        ) : (
          <DirectRows query={query} />
        )}
      </Profiler>

      <ProfileTable profiles={profiles} />
    </div>
  );
}
