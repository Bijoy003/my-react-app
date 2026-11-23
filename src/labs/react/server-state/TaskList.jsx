export default function TaskList({ tasks, removeTask }) {
  if (!tasks.data) return null;

  if (tasks.data.length === 0) {
    return <p className="text-sm">No tasks yet — add the first one.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.data.map((task) => (
        <li
          key={task.id}
          className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2"
        >
          <span
            className={`flex-1 text-sm ${
              task.done ? "text-ink-muted line-through" : "text-ink"
            }`}
          >
            {task.title}
          </span>
          <button
            type="button"
            onClick={() => removeTask.mutate(task.id)}
            disabled={removeTask.isPending && removeTask.variables === task.id}
            className="rounded-lg border border-line px-2 py-1 text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
          >
            {removeTask.isPending && removeTask.variables === task.id
              ? "Removing…"
              : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
