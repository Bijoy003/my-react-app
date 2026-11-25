import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          <strong>Suspense</strong> is a boundary that shows a fallback while
          something inside it is not ready. A lazy component throws its import
          promise, and <Code>use()</Code> can throw a data promise the same way.
          An <strong>error boundary</strong> is the failure counterpart: a class
          that catches errors thrown while rendering a subtree and shows a
          fallback instead of letting the whole app unmount.
        </p>
        <p className="mt-2">
          This lesson's deliverable runs in two places. The demo has one
          Suspense fallback and one boundary; the app wraps every lesson's demo
          panel in a boundary in <Code>LessonPage</Code> and the route outlet in
          a boundary in <Code>Layout</Code>, so a broken lesson cannot blank the
          whole page.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>lazy(() =&gt; import("./SlowPanel"))</Code> creates a
            component that loads on first render. React finds the nearest{" "}
            <Code>&lt;Suspense&gt;</Code> above it and shows{" "}
            <Code>fallback</Code> until the promise resolves, then renders the
            real component. The demo's one-second timer is only there so the
            fallback is visible.
          </li>
          <li>
            Put the boundary where the fallback makes sense: around a panel, not
            around the whole page. The rest of the screen stays interactive, and
            the layout does not jump while one region catches up.
          </li>
          <li>
            An error boundary needs two pieces:{" "}
            <Code>static getDerivedStateFromError</Code> stores the error and{" "}
            <Code>componentDidCatch</Code> logs it. React has no hook version; a
            small class is still the correct tool.{" "}
            <Code>src/components/ErrorBoundary.jsx</Code> is the shared one.
          </li>
          <li>
            The demo's “Try again” calls the parent to clear the condition that
            caused the throw, then resets the boundary. A boundary that only
            clears its own state would immediately catch the same error again.
          </li>
          <li>
            Nest boundaries for different granularities: a widget, a panel, then
            a route. In React 19, <Code>createRoot</Code> also accepts{" "}
            <Code>onCaughtError</Code> and <Code>onUncaughtError</Code> for
            logging what each level handles.
          </li>
          <li>
            Suspense and error boundaries compose with the app's code splitting:
            every <Code>lab.js</Code> now lazy-loads its demo and notes, and the{" "}
            <Link
              to="/labs/react/performance"
              className="text-accent hover:underline"
            >
              performance
            </Link>{" "}
            lesson explains the build-size payoff.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Error boundaries catch rendering, lifecycle and effect errors. They
            do <em>not</em> catch event handlers, timeouts, promise rejections
            or errors thrown in the boundary itself. A <Code>try/catch</Code> in
            the handler and a rejection handler for the promise are still
            required.
          </li>
          <li>
            A lazy module is cached after the first load. The fallback appears
            once per chunk, not on every mount; a manual reload or a new deploy
            is what fetches it again.
          </li>
          <li>
            A boundary stays in the error state until something resets it. Give
            it a <Code>key</Code> tied to the route or entity, or an{" "}
            <Code>onReset</Code> like the demo, rather than hoping a re-render
            clears it.
          </li>
          <li>
            Do not use a boundary to hide bugs. Log the error, keep the message
            human-readable, and give the visitor a way forward. The console and
            React DevTools still show the stack in development.
          </li>
          <li>
            React's development overlay and StrictMode remount effects once to
            expose missing cleanup. Production behaves differently, so verify a
            boundary in `npm run build` / `npm run preview` as well.
          </li>
          <li>
            A flash of fallback for a tiny chunk feels slower than waiting.
            Prefetch likely next steps or skip the boundary for chunks that
            resolve instantly; measure with the performance lesson's profiler
            before adding more.
          </li>
        </ul>
      </section>
    </div>
  );
}
