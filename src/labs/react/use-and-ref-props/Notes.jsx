import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Two small React 19 additions. <Code>use()</Code> reads a promise or a
          context during render — with a promise, the component suspends until
          it settles and the nearest <Code>Suspense</Code> shows its fallback.
          And refs are now plain props: a component declares <Code>ref</Code> in
          its parameter list like any other input, so <Code>forwardRef</Code> is
          no longer needed.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The promise is created in the click handler and stored in state,
            then passed down. <Code>use()</Code> sees the same promise on every
            re-render, so React can track it: pending → fallback, fulfilled →
            the value, rejected → the nearest error boundary.
          </li>
          <li>
            Unlike other hooks, <Code>use()</Code> may be called inside
            conditions and loops — it is a read, not a slot in the hook list.
            That is why the demo can render <Code>Tip</Code> only once a promise
            exists.
          </li>
          <li>
            The focus button works because <Code>FocusField</Code> forwards its{" "}
            <Code>ref</Code> prop straight to the input. The parent's{" "}
            <Code>useRef</Code> box ends up holding the DOM node, exactly as
            with <Code>forwardRef</Code> — with one less wrapper.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Never create the promise inline during render (
            <Code>use(fetchTip())</Code>): every render makes a fresh promise,
            so the component suspends forever. Create it in a handler, an
            effect, or a module-level cache.
          </li>
          <li>
            A rejected promise read with <Code>use()</Code> throws to the
            nearest error boundary — there is no try/catch around a render.
            Boundaries are a Phase 5 module.
          </li>
          <li>
            <Code>use()</Code> with a context is just <Code>useContext</Code>{" "}
            with the conditional-call freedom; prefer whichever reads clearer.
          </li>
        </ul>
        <p className="mt-3">
          The form-side React 19 additions live in{" "}
          <Link
            to="/labs/react/react19-actions"
            className="text-accent hover:underline"
          >
            Actions and optimistic UI
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
