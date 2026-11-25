import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Zustand is a tiny client-state store. <Code>create()</Code> returns a
          hook; components call it with a selector and subscribe to just the
          slice they read. The store lives outside React, so it needs no
          provider and survives route changes. State and the actions that change
          it sit together in one plain object.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>create((set) =&gt; ({"{ … }"}))</Code> defines the initial
            state and the actions. Each action calls <Code>set</Code> with a new
            slice — the same immutable updates <Code>useState</Code> taught,
            just in a shared place.
          </li>
          <li>
            <Code>useReadingList((state) =&gt; state.books)</Code> subscribes to
            one value. A component re-renders only when its selected value
            changes, so the add form does not re-render when the filter changes.
          </li>
          <li>
            Actions are part of the store, so components call{" "}
            <Code>add(text)</Code> directly instead of passing callbacks down.
            No prop drilling, no context provider, no dispatch boilerplate.
          </li>
          <li>
            The store is plain JavaScript:{" "}
            <Code>useReadingList.getState()</Code> and <Code>subscribe</Code>{" "}
            work outside components, which is handy for tests and non-React
            code.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            A selector that builds a new object or array on every call ({" "}
            <Code>{"(state) => ({ a: state.a, b: state.b })"}</Code>) never
            compares equal. Select primitives, or wrap it with{" "}
            <Code>useShallow</Code> from <Code>zustand/react/shallow</Code>.
          </li>
          <li>
            The store is a module singleton. That is the point here, but tests
            need a reset between cases, and per-page data should not leak
            between users.
          </li>
          <li>
            Choosing: local <Code>useState</Code> for one component, Context for
            slow app-wide values like theme or auth, Zustand for frequently
            updated shared UI state, and TanStack Query for anything that came
            from a server. Server data in a store means hand-writing the cache
            again — see{" "}
            <Link
              to="/labs/react/server-state"
              className="text-accent hover:underline"
            >
              Server state
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
