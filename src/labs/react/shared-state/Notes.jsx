import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          When two components need the same changing data, the state moves up to
          their closest common parent and flows back down as props —{" "}
          <em>lifting state up</em>. Context is the escape hatch when passing
          props through every intermediate layer (prop drilling) stops being
          worth it.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The parent owns the state and passes callbacks down; children report
            events, the parent decides what changes. Data flows one way, always.
          </li>
          <li>
            Here the provider wraps both siblings, so <Code>ProductRow</Code>{" "}
            and <Code>BasketPanel</Code> read the same basket through{" "}
            <Code>useContext</Code> without knowing about each other.
          </li>
          <li>
            <Code>useReducer</Code> suits state with related transitions:
            add/remove/clear live in one pure function, and components dispatch
            intentions instead of juggling setters.
          </li>
          <li>
            The state logic — data, context, reducer and hook — lives in{" "}
            <Code>basket.js</Code> beside the demo, so <Code>Demo.jsx</Code>{" "}
            stays pure presentation.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Every consumer re-renders when the context value changes. Context is
            for widely-read, slowly-changing data — not a dumping ground for all
            state.
          </li>
          <li>
            Lift only as high as needed. State shared by two siblings belongs in
            their parent, not at the app root "just in case".
          </li>
          <li>
            Server data is a different problem: caching, refetching and
            invalidation belong in a query library (Phase 4), not in Context.
          </li>
        </ul>
      </section>
    </div>
  );
}
