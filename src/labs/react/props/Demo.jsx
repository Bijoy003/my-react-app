import { useState } from "react";
import Code from "../../../components/Code";

// Destructuring in the parameter list is the usual way to read props.
// `level` and `note` have defaults, so the parent may leave them out.
function LessonCard({
  title,
  level = "core",
  seats,
  note = "No note passed",
  onEnrol,
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {level}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-ink">
        {title || "Untitled lesson"}
      </h3>
      <p className="mt-1 text-sm">
        {seats} {seats === 1 ? "seat" : "seats"} left
      </p>
      <p className="mt-2 flex-1 text-sm text-ink-muted">{note}</p>
      <button
        type="button"
        onClick={onEnrol}
        disabled={seats === 0}
        className="mt-4 w-fit rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {seats === 0 ? "Full" : "Enrol"}
      </button>
    </article>
  );
}

export default function Demo() {
  const [lesson, setLesson] = useState({
    title: "Props",
    level: "core",
    seats: 3,
    note: "Changing the parent updates the child.",
  });
  const [showNote, setShowNote] = useState(true);

  // The child asks; the parent decides. Props flow down, changes flow up
  // through a callback rather than a write.
  const enrol = () =>
    setLesson((current) => ({
      ...current,
      seats: Math.max(0, current.seats - 1),
    }));

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4 text-sm">
        <label className="block space-y-1">
          <span className="block text-ink-muted">
            Title, owned by the parent
          </span>
          <input
            value={lesson.title}
            onChange={(event) =>
              setLesson({ ...lesson, title: event.target.value })
            }
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink"
          />
        </label>

        <label className="flex w-fit items-center gap-2">
          <input
            type="checkbox"
            checked={showNote}
            onChange={(event) => setShowNote(event.target.checked)}
            className="size-4 accent-[var(--color-accent)]"
          />
          Pass the optional note
        </label>

        <p className="font-mono text-xs leading-relaxed text-ink-muted">
          <Code>{"<LessonCard {...lesson} onEnrol={enrol} />"}</Code>
        </p>
      </div>

      <LessonCard
        {...lesson}
        note={showNote ? lesson.note : undefined}
        onEnrol={enrol}
      />
    </div>
  );
}
