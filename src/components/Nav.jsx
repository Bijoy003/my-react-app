import { Link } from "react-router-dom";
import { firstLab, labs } from "../labs/registry";

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between gap-6 px-6">
        <Link to="/" className="font-mono text-sm font-semibold text-ink">
          React<span className="text-accent">Basics</span>
        </Link>

        <nav aria-label="Site" className="flex items-center gap-4 text-sm">
          <span className="hidden text-ink-muted sm:inline">
            {labs.length} {labs.length === 1 ? "lesson" : "lessons"}
          </span>

          <Link to="/member" className="text-ink-muted hover:text-ink">
            Member area
          </Link>

          {firstLab && (
            <Link
              to={`/labs/${firstLab.track}/${firstLab.id}`}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Start learning
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
