import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Code from "../components/Code";
import { useAuth } from "../auth/auth-context";

export default function SignInPage() {
  const { user, signIn, signOut } = useAuth();
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? "/member";

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    signIn(name.trim());
    navigate(from, { replace: true });
  }

  if (user) {
    return (
      <div className="space-y-4 py-10">
        <h1 className="text-3xl font-semibold text-ink">You are signed in.</h1>
        <p className="max-w-xl text-sm leading-relaxed">
          Signed in as {user.name}. This is pretend auth — no server involved.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/member"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Go to the member area
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm py-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        Sign in
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-ink">
        {location.state?.from ? "Sign in to continue." : "Welcome back."}
      </h1>
      <p className="mt-3 text-sm leading-relaxed">
        The lab has no backend, so any name works. The guard around{" "}
        <Code>/member</Code> is the point, not the credentials.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="sign-in-name"
            className="block text-sm font-medium text-ink"
          >
            Name
          </label>
          <input
            id="sign-in-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
