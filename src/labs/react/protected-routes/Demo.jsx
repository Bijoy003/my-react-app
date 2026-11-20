import { Link } from "react-router-dom";
import { useAuth } from "../../../auth/auth-context";

// React Router forbids rendering one <Router> inside another, so a
// MemoryRouter sandbox cannot live inside the lab's BrowserRouter. Instead
// this panel drives the real guarded route: /member behind RequireAuth.
export default function Demo() {
  const { user, signIn, signOut } = useAuth();

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Current state:{" "}
        <span className="font-mono text-xs">
          {user ? `signed in as ${user.name}` : "signed out"}
        </span>
      </p>

      <p className="text-sm text-ink-muted">
        {user
          ? "The guard will let you straight into the member area."
          : "The guard will redirect you to sign-in, remember that you were heading to /member, and send you there after you sign in."}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/member"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Try to visit /member
        </Link>
        {user ? (
          <button
            type="button"
            onClick={signOut}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
          >
            Sign out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => signIn("Ada")}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
          >
            Sign in as Ada
          </button>
        )}
      </div>

      <p className="text-xs text-ink-muted">
        After signing in you land on /member, not back here — that is the
        redirect-back at work. Use the sidebar to return to this lesson, then
        flip the auth state and try the link again.
      </p>
    </div>
  );
}
