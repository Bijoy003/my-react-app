import { useLocalStorage } from "./useLocalStorage";

// Presentation only: the state, persistence and storage error handling live
// in the hook, so this file reads like markup.
export default function NoteCard({ storageKey, title }) {
  const [text, setText] = useLocalStorage(storageKey, "");

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <label className="block text-xs font-medium text-ink">
        {title}
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          className="mt-2 w-full resize-y rounded-lg border border-line bg-surface px-3 py-2 text-sm font-normal text-ink"
        />
      </label>

      <div className="mt-2 flex items-center justify-between text-xs text-ink-muted">
        <span>{text.length} characters</span>
        <button
          type="button"
          onClick={() => setText("")}
          disabled={text.length === 0}
          aria-label={`Clear ${title}`}
          className="rounded-lg border border-line px-2 py-1 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
