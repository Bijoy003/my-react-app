import { useState } from "react";
import Code from "../../../components/Code";
import StatusBadge from "../../../components/StatusBadge";

const STATUSES = ["open", "few-seats", "waitlist", "hidden"];

export default function Demo() {
  const [status, setStatus] = useState("open");
  const [showDetail, setShowDetail] = useState(true);

  const isHidden = status === "hidden";

  return (
    <div className="space-y-6">
      <div role="group" aria-label="Status" className="flex flex-wrap gap-2">
        {STATUSES.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={status === option}
            onClick={() => setStatus(option)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
              status === option
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-ink-muted hover:text-ink"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <label className="flex w-fit items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showDetail}
          onChange={(event) => setShowDetail(event.target.checked)}
          className="size-4 accent-[var(--color-accent)]"
        />
        Pass the <Code>detail</Code> prop
      </label>

      <div className="min-h-24 rounded-xl border border-dashed border-line bg-surface p-6">
        <StatusBadge
          status={isHidden ? undefined : status}
          detail={showDetail ? "3 seats left" : undefined}
        />
        <p className="mt-4 font-mono text-xs text-ink-muted">
          {isHidden
            ? "return null → this component renders nothing"
            : `<StatusBadge status="${status}" />`}
        </p>
      </div>
    </div>
  );
}
