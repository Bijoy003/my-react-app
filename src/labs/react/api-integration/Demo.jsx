import { useEffect, useState } from "react";
import { isOffline, setOffline } from "./api";
import TaskRow from "./TaskRow";
import { useTasks } from "./useTasks";

export default function Demo() {
  const { tasks, status, error, busyId, retry, add, toggle, remove } =
    useTasks();
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [offline, setOfflineState] = useState(isOffline);

  // The fake server's flag is module-level, so reset it when the lesson closes.
  useEffect(() => () => setOffline(false), []);

  function toggleOffline(next) {
    setOfflineState(next);
    setOffline(next);
  }

  async function submit(event) {
    event.preventDefault();
    const text = title.trim();
    if (!text) return;
    setSaving(true);
    await add(text);
    setTitle("");
    setSaving(false);
  }

  return (
    <div className="max-w-xl space-y-4">
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New task…"
          aria-label="New task"
          className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Add task"}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="space-y-2 rounded-lg border border-accent/40 bg-accent/5 px-3 py-2 text-sm text-accent"
        >
          <p>{error}</p>
          {status === "error" && (
            <button
              type="button"
              onClick={retry}
              className="rounded-lg border border-accent/40 px-2 py-1 text-xs hover:bg-accent/10"
            >
              Try again
            </button>
          )}
        </div>
      )}

      {status === "loading" && <p className="text-sm">Loading tasks…</p>}

      {status === "ready" && tasks.length === 0 && (
        <p className="text-sm">No tasks yet — add the first one.</p>
      )}

      {status === "ready" && tasks.length > 0 && (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              busy={busyId === task.id}
              onToggle={toggle}
              onDelete={remove}
            />
          ))}
        </ul>
      )}

      <label className="flex items-center gap-2 text-xs text-ink-muted">
        <input
          type="checkbox"
          checked={offline}
          onChange={(event) => toggleOffline(event.target.checked)}
          className="accent-accent"
        />
        Simulate a network failure
      </label>
    </div>
  );
}
