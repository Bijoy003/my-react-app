import { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { labs, tracks } from "../labs/registry";

function RouteChangeEffects() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Ignore the first run (and StrictMode's second setup): there is no new
    // page to announce yet.
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    // Focus follows the page so keyboard and screen-reader users start at the
    // new content, not at the link they just left.
    document.getElementById("main-content")?.focus();
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
      <div className="space-y-1">
        <NavLink to="/" end className={navLinkClass}>
          Overview
        </NavLink>
        <NavLink to="/hooks" className={navLinkClass}>
          Hooks reference
        </NavLink>
        <NavLink to="/practice" className={navLinkClass}>
          Recipe box practice
        </NavLink>
      </div>

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

      <NavLink
        to="/hooks"
        className={({ isActive }) =>
          `whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
            isActive
              ? "border-accent bg-accent/10 text-accent"
              : "border-line text-ink-muted"
          }`
        }
      >
        Hooks
      </NavLink>

      <NavLink
        to="/practice"
        className={({ isActive }) =>
          `whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
            isActive
              ? "border-accent bg-accent/10 text-accent"
              : "border-line text-ink-muted"
          }`
        }
      >
        Practice
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
  const { pathname } = useLocation();

  // The lesson rail lives inside the lesson page, beside the notes, so the
  // shell only ever needs the sidebar and one content column.
  const columns = "lg:grid-cols-[13rem_minmax(0,1fr)]";

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <RouteChangeEffects />
      <Nav />

      <div
        className={`mx-auto grid w-full max-w-[100rem] flex-1 grid-cols-1 gap-12 px-6 ${columns}`}
      >
        {/* The lesson list is taller than most viewports. Capping the sticky
            column to the space under the header keeps its own scrollbar, so
            the topics below stay reachable without scrolling the page. */}
        <aside className="sidebar-scroll sticky top-16 hidden max-h-[calc(100svh_-_4rem)] w-52 shrink-0 self-start overflow-y-auto overscroll-contain py-10 pr-2 lg:block">
          <Sidebar />
        </aside>

        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 py-10 focus:outline-none"
        >
          <MobileNav />
          <ErrorBoundary key={pathname}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      <Footer />
    </div>
  );
}
