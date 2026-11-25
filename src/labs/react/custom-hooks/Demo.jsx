import NoteCard from "./NoteCard";

export default function Demo() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <NoteCard storageKey="lab.custom-hooks.lesson" title="Lesson idea" />
        <NoteCard storageKey="lab.custom-hooks.bug" title="Bug to fix" />
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        Both cards call the same hook, but each call has its own state. Type in
        either one and reload the page: the text comes back from localStorage.
        Inspect a card in React DevTools to see the useDebugValue label.
      </p>
    </div>
  );
}
