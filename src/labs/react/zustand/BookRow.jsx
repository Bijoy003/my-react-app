export default function BookRow({ book, onToggle, onRemove }) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2">
      <input
        type="checkbox"
        checked={book.read}
        onChange={() => onToggle(book.id)}
        aria-label={`Mark ${book.title} as ${book.read ? "unread" : "read"}`}
        className="size-4 accent-accent"
      />
      <span
        className={`flex-1 text-sm ${
          book.read ? "text-ink-muted line-through" : "text-ink"
        }`}
      >
        {book.title}
      </span>
      <button
        type="button"
        onClick={() => onRemove(book.id)}
        className="rounded-lg border border-line px-2 py-1 text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
      >
        Remove
      </button>
    </li>
  );
}
