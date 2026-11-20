import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { labs, tracks } from "../labs/registry";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function navLinkClass({ isActive }) {
  return `block rounded-lg px-3 py-1.5 transition-colors ${
    isActive
      ? "bg-accent/10 font-medium text-accent"
      : "text-ink-muted hover:bg-surface-muted hover:text-ink"
  }`;
}

function Sidebar() {
  return (
    <nav aria-label="Lessons" className="space-y-8">
      <NavLink to="/" end className={navLinkClass}>
        Overview
      </NavLink>

      {tracks.map((track) => (
        <div key={track.id}>
          <p className="px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            {track.label}
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {track.labs.map((lab) => (
              <li key={lab.id}>
                <NavLink
                  to={`/labs/${track.id}/${lab.id}`}
                  className={navLinkClass}
                >
                  {lab.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function MobileNav() {
  return (
    <nav
      aria-label="Lessons"
      className="mb-8 flex gap-2 overflow-x-auto pb-1 lg:hidden"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
            isActive
              ? "border-accent bg-accent/10 text-accent"
              : "border-line text-ink-muted"
          }`
        }
      >
        Overview
      </NavLink>

      {labs.map((lab) => (
        <NavLink
          key={`${lab.track}/${lab.id}`}
          to={`/labs/${lab.track}/${lab.id}`}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
              isActive
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-ink-muted"
            }`
          }
        >
          {lab.title}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      <Nav />

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-12 px-6">
        <aside className="sticky top-16 hidden w-52 shrink-0 self-start py-10 lg:block">
          <Sidebar />
        </aside>

        <main className="min-w-0 flex-1 py-10">
          <MobileNav />
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
