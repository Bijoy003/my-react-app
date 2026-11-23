export default function TaskRow({ task, busy, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2">
      <input
        type="checkbox"
        checked={task.done}
        disabled={busy}
        onChange={() => onToggle(task)}
        aria-label={`Mark ${task.title} as ${task.done ? "not done" : "done"}`}
        className="size-4 accent-accent"
      />
      <span
        className={`flex-1 text-sm ${
          task.done ? "text-ink-muted line-through" : "text-ink"
        }`}
      >
        {task.title}
      </span>
      <button
        type="button"
        disabled={busy}
        onClick={() => onDelete(task)}
        className="rounded-lg border border-line px-2 py-1 text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {busy ? "Working…" : "Delete"}
      </button>
    </li>
  );
}
