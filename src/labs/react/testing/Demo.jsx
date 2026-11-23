import { useState } from "react";
import { armFailure } from "./api";
import MemberList from "./MemberList";
import { useMembers } from "./useMembers";

export default function Demo() {
  const { members, status, error, retry } = useMembers();
  const [query, setQuery] = useState("");

  const visible = members.filter((member) =>
    member.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function simulateFailure() {
    armFailure(true);
    retry();
  }

  return (
    <div className="max-w-xl space-y-4">
      <label className="block text-xs text-ink-muted">
        Filter by name
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>

      {status === "loading" && (
        <p role="status" className="text-sm">
          Loading members…
        </p>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="space-y-2 rounded-lg border border-accent/40 bg-accent/5 px-3 py-2 text-sm text-accent"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={retry}
            className="rounded-lg border border-accent/40 px-2 py-1 text-xs hover:bg-accent/10"
          >
            Try again
          </button>
        </div>
      )}

      {status === "ready" && visible.length > 0 && (
        <MemberList members={visible} />
      )}

      {status === "ready" && visible.length === 0 && (
        <p className="text-sm text-ink-muted">No members match that filter.</p>
      )}

      <button
        type="button"
        onClick={simulateFailure}
        className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
      >
        Simulate a failure
      </button>
    </div>
  );
}
