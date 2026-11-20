import { Link, useParams } from "react-router-dom";
import { getLab, getTrack, labsByTrack } from "../labs/registry";
import NotFoundPage from "./NotFoundPage";

export default function LessonPage() {
  const { track: trackId, slug } = useParams();
  const lab = getLab(trackId, slug);
  const track = getTrack(trackId);

  if (!lab || !track) return <NotFoundPage />;

  const siblings = labsByTrack(trackId);
  const index = siblings.findIndex((item) => item.id === lab.id);
  const previous = index > 0 ? siblings[index - 1] : null;
  const next = index < siblings.length - 1 ? siblings[index + 1] : null;
  const { Demo, Notes } = lab;

  return (
    <article>
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link to="/" className="hover:text-ink">
          Overview
        </Link>
        <span className="mx-2 text-ink-muted">/</span>
        <span className="text-ink-muted">{track.label}</span>
      </nav>

      <header className="mt-4 border-b border-line pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {track.label} · {lab.level} · lesson {index + 1} of {siblings.length}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
          {lab.title}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed">{lab.summary}</p>
      </header>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          Try it
        </h2>
        <div className="mt-4 rounded-xl border border-line bg-surface-muted/50 p-6">
          <Demo />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          How it works
        </h2>
        <div className="mt-4">
          <Notes />
        </div>
      </section>

      <nav
        aria-label="Lesson pagination"
        className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6 text-sm"
      >
        {previous ? (
          <Link
            to={`/labs/${previous.track}/${previous.id}`}
            className="hover:text-ink"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            to={`/labs/${next.track}/${next.id}`}
            className="text-right hover:text-ink"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
