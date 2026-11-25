import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          An effect synchronises the component with something outside React — a
          document listener, a timer, a subscription, a network connection. It
          runs <em>after</em> render, never during it. A ref is a plain mutable
          box (<Code>ref.current</Code>) that survives re-renders without
          causing any; here it holds the DOM node the listener checks against.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The dependency array decides re-runs: this effect re-attaches only
            when <Code>open</Code> changes. Setters and refs are stable, so they
            do not belong in the array.
          </li>
          <li>
            The returned cleanup runs before the next effect run and on unmount.
            That is what makes StrictMode's dev-only setup → cleanup → setup
            double-run harmless.
          </li>
          <li>
            <Code>useMemo</Code> caches a computed value and{" "}
            <Code>useCallback</Code> caches a function identity between renders
            — both are performance hints, not semantics. Reach for them when a
            profiler shows a problem; the React Compiler automates most of this
            memoisation. Practise both in the{" "}
            <Link
              to="/labs/react/memoisation"
              className="text-accent hover:underline"
            >
              Memoisation
            </Link>{" "}
            lesson.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Most "I need an effect" moments are actually derivations: filtering
            a list or formatting a value belongs in render, not in an effect
            that copies props into state.
          </li>
          <li>
            A missing dependency gives a stale closure — the effect keeps
            reading an old value. An empty array does not mean "run once" in
            development; StrictMode mounts twice on purpose.
          </li>
          <li>
            Writing <Code>ref.current</Code> does not re-render. If the UI
            should react to the change, it is state, not a ref.
          </li>
        </ul>
      </section>
    </div>
  );
}
