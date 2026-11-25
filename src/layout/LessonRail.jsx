import { Link } from "react-router-dom";

const label = "font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted";

// The right-hand column only exists for lesson routes. It gives the page's own
// sections a permanent index and turns the next lesson into a visible choice,
// so the space beside the reading column is navigation rather than margin.
export default function LessonRail({ lab, track, position, total, next }) {
  return (
    <div className="space-y-8 text-sm">
      <nav aria-label="On this page">
        <p className={label}>On this page</p>
        <ul className="mt-3 space-y-2">
          <li>
            <a href="#try-it" className="text-ink-muted hover:text-ink">
              Try it
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="text-ink-muted hover:text-ink">
              How it works
            </a>
          </li>
        </ul>
      </nav>

      <div className="border-t border-line pt-6">
        <p className={label}>
          Lesson {position} of {total}
        </p>
        <p className="mt-2 text-ink-muted">
          {track.label} · {lab.level}
        </p>
      </div>

      {next && (
        <div className="border-t border-line pt-6">
          <p className={label}>Next lesson</p>
          <Link
            to={`/labs/${next.track}/${next.id}`}
            className="mt-2 block font-medium text-ink hover:text-accent"
          >
            {next.title} →
          </Link>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            {next.summary}
          </p>
        </div>
      )}
    </div>
  );
}
