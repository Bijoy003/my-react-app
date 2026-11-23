import { useState } from "react";
import type { ChangeEvent } from "react";
import MemberCard from "./MemberCard";
import { useMembers } from "./useMembers";

export default function Demo() {
  const { members, status, error } = useMembers();
  const [query, setQuery] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);

  if (status === "loading") return <p className="text-sm">Loading the team…</p>;

  if (status === "error")
    return (
      <p role="alert" className="text-sm text-accent">
        {error ?? "Could not load the team."}
      </p>
    );

  const needle = query.trim().toLowerCase();
  const visible = members.filter(
    (member) =>
      (!activeOnly || member.active) &&
      (member.name.toLowerCase().includes(needle) ||
        member.role.toLowerCase().includes(needle)),
  );

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleActiveOnly(event: ChangeEvent<HTMLInputElement>) {
    setActiveOnly(event.target.checked);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={handleSearch}
          placeholder="Search name or role…"
          aria-label="Search the team"
          className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={handleActiveOnly}
            className="accent-accent"
          />
          Active only
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm">No members match that search.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {visible.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </ul>
      )}

      <p className="text-xs leading-relaxed text-ink-muted">
        One <code className="font-mono">Member</code> type flows through the API
        response, the hook's state, the card's props and the filter — the editor
        catches a typo before the browser does.
      </p>
    </div>
  );
}
