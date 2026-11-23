import { useState } from "react";
import BookRow from "./BookRow";
import { useReadingList } from "./store";

const FILTERS = ["all", "unread", "read"];

export default function Demo() {
  const books = useReadingList((state) => state.books);
  const filter = useReadingList((state) => state.filter);
  const add = useReadingList((state) => state.add);
  const toggle = useReadingList((state) => state.toggle);
  const remove = useReadingList((state) => state.remove);
  const setFilter = useReadingList((state) => state.setFilter);
  const [title, setTitle] = useState("");

  const visible =
    filter === "all"
      ? books
      : books.filter((book) => book.read === (filter === "read"));

  function submit(event) {
    event.preventDefault();
    const text = title.trim();
    if (!text) return;
    add(text);
    setTitle("");
  }

  return (
    <div className="max-w-xl space-y-4">
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a book…"
          aria-label="Book title"
          className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Add book
        </button>
      </form>

      <div role="group" aria-label="Filter books" className="flex gap-2">
        {FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
              filter === value
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-ink-muted hover:text-ink"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm">Nothing in this view.</p>
      ) : (
        <ul className="space-y-2">
          {visible.map((book) => (
            <BookRow
              key={book.id}
              book={book}
              onToggle={toggle}
              onRemove={remove}
            />
          ))}
        </ul>
      )}

      <p className="text-xs leading-relaxed text-ink-muted">
        {books.length} books in the store. Navigate to another lesson and back:
        the store keeps them, because it lives outside the component tree.
      </p>
    </div>
  );
}
