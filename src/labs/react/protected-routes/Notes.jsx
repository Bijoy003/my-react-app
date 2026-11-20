import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          A protected route is a route wrapped in a guard component. The guard
          checks auth state during render: signed in, it renders the page;
          signed out, it returns <Code>Navigate</Code> to the sign-in page
          instead. The lab's real example is <Code>/member</Code>, guarded by{" "}
          <Code>src/auth/RequireAuth.jsx</Code>.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The demo above drives the real thing: it reads and flips the app's
            auth state (Context from <Code>src/auth/</Code>), then sends you to{" "}
            <Code>/member</Code>. Watch the URL bar — the guard redirects during
            render, before any protected markup appears.
          </li>
          <li>
            The guard passes the attempted location in navigation state:{" "}
            <Code>{"state={{ from: location }}"}</Code>. Sign-in reads it and
            sends the user back where they were heading.
          </li>
          <li>
            <Code>replace</Code> swaps the current history entry instead of
            pushing a new one, so the Back button does not bounce the user into
            the guard again.
          </li>
          <li>
            To guard a whole group, wrap a layout route's element and render{" "}
            <Code>Outlet</Code> inside the guard — every child route inherits
            the check.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            A client-side guard is UX, not security. Anyone can read the bundle;
            real protection happens on the server, which must check every
            request itself.
          </li>
          <li>
            Redirect during render with <Code>Navigate</Code>, not from an
            effect — the effect version flashes the protected content first.
          </li>
          <li>
            You cannot nest routers: React Router throws if a second{" "}
            <Code>Router</Code> (even a <Code>MemoryRouter</Code>) renders
            inside the app's router. That is why this demo drives the real{" "}
            <Code>/member</Code> route instead of a sandbox.
          </li>
          <li>
            The lab's auth is pretend (a name in memory, gone on refresh). That
            is deliberate: the pattern is the lesson, not the credentials.
          </li>
        </ul>
      </section>
    </div>
  );
}
