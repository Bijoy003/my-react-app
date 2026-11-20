import Code from "../components/Code";
import { useAuth } from "../auth/auth-context";

export default function MemberPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="space-y-4 py-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        Protected route
      </p>
      <h1 className="text-3xl font-semibold text-ink">Member area</h1>
      <p className="max-w-xl text-sm leading-relaxed">
        Hello, {user.name}. You reached this page through{" "}
        <Code>RequireAuth</Code>: signed-out visitors are redirected to sign-in
        and sent back here afterwards. Signing out redirects immediately,
        because the guard re-renders with no user.
      </p>
      <button
        type="button"
        onClick={signOut}
        className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
      >
        Sign out
      </button>
    </div>
  );
}
