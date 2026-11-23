import TaskList from "./TaskList";
import { useTaskBoard } from "./useTaskBoard";

export default function TaskBoard() {
  const {
    title,
    setTitle,
    offline,
    toggleOffline,
    tasks,
    addTask,
    removeTask,
    submit,
  } = useTaskBoard();

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
          disabled={addTask.isPending}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {addTask.isPending ? "Adding…" : "Add task"}
        </button>
      </form>

      {addTask.isError && (
        <p role="alert" className="text-sm text-accent">
          {addTask.error.message}
        </p>
      )}

      {tasks.isPending && <p className="text-sm">Loading tasks…</p>}

      {tasks.isError && (
        <div
          role="alert"
          className="space-y-2 rounded-lg border border-accent/40 bg-accent/5 px-3 py-2 text-sm text-accent"
        >
          <p>{tasks.error.message}</p>
          <button
            type="button"
            onClick={() => tasks.refetch()}
            className="rounded-lg border border-accent/40 px-2 py-1 text-xs hover:bg-accent/10"
          >
            Try again
          </button>
        </div>
      )}

      <TaskList tasks={tasks} removeTask={removeTask} />

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
        <button
          type="button"
          onClick={() => tasks.refetch()}
          disabled={tasks.isFetching}
          className="rounded-lg border border-line px-2 py-1 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {tasks.isFetching ? "Refetching…" : "Refetch"}
        </button>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={offline}
            onChange={(event) => toggleOffline(event.target.checked)}
            className="accent-accent"
          />
          Simulate a network failure
        </label>
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        Cached rows stay visible during a refetch. A failed refetch shows the
        error and keeps the last good data.
      </p>
    </div>
  );
}
