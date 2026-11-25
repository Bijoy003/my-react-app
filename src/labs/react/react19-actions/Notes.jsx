import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          An <em>Action</em> is an async function passed to a form's{" "}
          <Code>action</Code> prop. React runs it inside a transition, resets
          the form when it settles, and tracks pending state for you.{" "}
          <Code>useActionState</Code> threads the previous state through each
          submission; <Code>useOptimistic</Code> shows the expected result
          immediately and reverts to the real state when the action finishes.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The action receives <Code>(previousState, formData)</Code> and
            returns the next state — here the message list plus an error or a
            rejected draft to preserve in the field. The fake server lives in{" "}
            <Code>api.js</Code>; swap it for a real fetch and the UI code does
            not change.
          </li>
          <li>
            The wrapper adds the optimistic row, then dispatches. On success the
            real row replaces it; on failure the optimistic row vanishes — that
            rollback is automatic, not code you write.
          </li>
          <li>
            <Code>useFormStatus</Code> reads the surrounding form's pending
            flag, so the submit button can disable itself. It must live in a
            child component of the form, not the component rendering it.
          </li>
          <li>
            Related React 19 additions: <Code>use()</Code> reads a promise or
            context during render (with Suspense for promises), and refs are now
            plain props — <Code>forwardRef</Code> is no longer needed. Both get
            a live demo in{" "}
            <Link
              to="/labs/react/use-and-ref-props"
              className="text-accent hover:underline"
            >
              use() and ref props
            </Link>
            .
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Optimistic state is a preview, never the source of truth. Render the
            list from <Code>useOptimistic</Code>, but keep the real data in the
            action's state.
          </li>
          <li>
            Submissions queue sequentially: each action waits for the previous
            result. Rapid clicks mean a growing queue, not parallel posts.
          </li>
          <li>
            Return known errors as state (as here); throwing cancels every
            queued action and surfaces in the nearest error boundary.
          </li>
        </ul>
      </section>
    </div>
  );
}
