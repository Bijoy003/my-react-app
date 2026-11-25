import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

function navClass({ isActive }: { isActive: boolean }) {
  return `rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
    isActive
      ? "border-accent bg-accent/10 text-accent"
      : "border-line text-ink-muted hover:border-accent hover:text-accent"
  }`;
}

export default function PracticeLayout() {
  return (
    <section aria-labelledby="practice-heading">
      <header className="border-b border-line pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Practice
        </p>
        <h1
          id="practice-heading"
          className="mt-3 text-3xl font-semibold text-ink sm:text-4xl"
        >
          Recipe box
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed">
          The Phase 5 exercise: routing, TanStack Query, a validated form,
          TypeScript and tests in one small CRUD feature.
        </p>

        <nav aria-label="Recipe box" className="mt-6 flex flex-wrap gap-2">
          <NavLink to="/practice" end className={navClass}>
            All recipes
          </NavLink>
          <NavLink to="/practice/new" className={navClass}>
            New recipe
          </NavLink>
        </nav>
      </header>

      <div className="mt-8">
        <Suspense
          fallback={
            <p role="status" className="text-sm text-ink-muted">
              Loading the recipe view…
            </p>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
}
