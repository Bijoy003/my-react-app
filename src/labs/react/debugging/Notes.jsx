import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Debugging is a loop, not a talent: reproduce the problem, observe what
          actually happens, isolate the smallest part that still fails, fix the
          cause, then verify with the same steps. The demo ships a prepared bug.
          Type a name, press “Re-render the parent”, and the input empties: the
          component was declared <em>inside</em> the parent, so each parent
          render creates a new component type and React remounts it. Tick “Use
          the fix” to compare with the version defined at module scope.
        </p>
        <p className="mt-2">
          The deliverable is that fix plus the steps that find it, not a lucky
          edit. React DevTools' Components panel shows the input unmounting and
          remounting on every press, which is the evidence that separates this
          from a value or event-handler bug.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="font-medium text-ink">
              Reproduce reliably.
            </strong>{" "}
            Write the smallest sequence that fails, in order. A bug you cannot
            trigger twice cannot be fixed with confidence.
          </li>
          <li>
            <strong className="font-medium text-ink">
              Console and Sources.
            </strong>{" "}
            <Code>console.log</Code> values, not labels; use the Sources panel
            for a real breakpoint when a handler runs too often to read logs.
            Pause on exceptions turns a silent failure into a stack trace.
          </li>
          <li>
            <strong className="font-medium text-ink">Network.</strong> Check the
            request before blaming the component: URL, method, status, payload,
            response, timing. Throttle to see the loading state a fast local
            fake API hides.
          </li>
          <li>
            <strong className="font-medium text-ink">React DevTools.</strong>{" "}
            Components shows the tree, current props and hook state; the gear
            menu can highlight every component that re-renders. The Profiler
            shows which commit was slow and why it happened. If an element
            remounts, the Components tree flickers: identity, not values,
            changed.
          </li>
          <li>
            <strong className="font-medium text-ink">Read the error.</strong>{" "}
            React's stack points at the component that threw. When the console
            says “Each child in a list should have a unique key”, it means the
            reconciliation is guessing, not that a warning is optional.
          </li>
          <li>
            <strong className="font-medium text-ink">Verify.</strong> Repeat the
            original steps, then keep the fix honest with a test. The{" "}
            <Link
              to="/labs/react/testing"
              className="text-accent hover:underline"
            >
              Testing
            </Link>{" "}
            lesson covers rendering, querying and driving the interaction.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Development StrictMode runs effects twice and re-renders once more
            on purpose. A double request in the Network panel is not a bug; a
            missing cleanup is.
          </li>
          <li>
            A stale closure is a function that kept an old value. The symptom is
            an interval or listener that always sees the first{" "}
            <Code>count</Code>. Fix the dependency array or use the updater
            form; the{" "}
            <Link
              to="/labs/react/effects-and-refs"
              className="text-accent hover:underline"
            >
              Effects and refs
            </Link>{" "}
            lesson shows both.
          </li>
          <li>
            Mutating state (<Code>items.push(…)</Code>,{" "}
            <Code>user.name = …</Code>) often "works" on screen and fails later:
            React compares references, so the update is skipped. Return new
            objects and arrays.
          </li>
          <li>
            A component defined inside another component is a new type on every
            render. Hoist it, or keep it as a plain function that returns JSX
            rather than a component with its own hooks.
          </li>
          <li>
            An effect that sets state it also depends on loops. Log the
            dependencies and ask whether the value can be computed during render
            instead.
          </li>
          <li>
            Async responses can land out of order. Ignore late results with a
            cleanup flag, as the fake APIs in this lab do, or move the request
            into TanStack Query and let it own cancellation and caching.
          </li>
        </ul>
      </section>
    </div>
  );
}
