import { useMemo } from "react";
import { filterRows, ROWS } from "./rows";

function RowList({ visible }) {
  return (
    <div className="space-y-2">
      <p role="status" className="text-sm text-ink-muted">
        {visible.length} of {ROWS.length} rows match.
      </p>
      <ul className="flex flex-wrap gap-1">
        {visible.slice(0, 12).map((row) => (
          <li
            key={row.id}
            className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-ink-muted"
          >
            {row.label}
          </li>
        ))}
      </ul>
      {visible.length > 12 && (
        <p className="text-xs text-ink-muted">Showing the first 12 matches.</p>
      )}
    </div>
  );
}

export function DirectRows({ query }) {
  return <RowList visible={filterRows(ROWS, query)} />;
}

export function MemoisedRows({ query }) {
  const visible = useMemo(() => filterRows(ROWS, query), [query]);
  return <RowList visible={visible} />;
}
