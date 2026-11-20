import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Memoisation means remembering a result so repeated work can be
          skipped. React gives three tools: <Code>useMemo</Code> caches a
          computed value, <Code>useCallback</Code> caches a function's identity,
          and <Code>memo</Code> skips a component's re-render when its props are
          unchanged. All three are performance hints, never semantics.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            React compares the dependency array with <Code>Object.is</Code>.
            Nothing changed → the previous result is reused. The demo ships two
            versions of the same list — <Code>CachedList</Code> wraps the slow
            filter in <Code>useMemo</Code>, <Code>PlainList</Code> calls it bare
            — and the toggle swaps between them.
          </li>
          <li>
            <Code>useCallback</Code> alone stops nothing — it stabilises a
            function's identity so a <Code>memo</Code> child (or an effect's
            deps) can skip work. The three tools cooperate: with a stable
            callback the button's render counter stays put; with a fresh inline
            arrow it climbs on every parent render.
          </li>
          <li>
            The counter writes straight to the DOM from an effect instead of
            using state — a <Code>setState</Code> there would cause the very
            re-render it is trying to count. Imperative DOM writes are a
            legitimate effect; see{" "}
            <Link
              to="/labs/react/effects-and-refs"
              className="text-accent hover:underline"
            >
              Effects and refs
            </Link>
            .
          </li>
          <li>
            With caching on, pressing the button re-renders the parent but
            neither re-runs the filter nor re-renders the button. With it off,
            both happen on every press — and the millisecond readout shows what
            the cache saves.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The code must behave identically with the memoisation removed. If
            deleting <Code>useMemo</Code> breaks the app, that is a bug, not an
            optimisation.
          </li>
          <li>
            Measure first. Memoising cheap work adds comparison overhead and
            reading cost; the Phase 5 performance module profiles this properly.
          </li>
          <li>
            The React Compiler automates most of this memoisation, so current
            guidance is to let it work and intervene only when a profiler shows
            a problem — not to wrap everything by hand.
          </li>
        </ul>
        <p className="mt-3">
          The conceptual companion is{" "}
          <Link
            to="/labs/react/effects-and-refs"
            className="text-accent hover:underline"
          >
            Effects and refs
          </Link>
          , which covers when work belongs in render at all.
        </p>
      </section>
    </div>
  );
}
