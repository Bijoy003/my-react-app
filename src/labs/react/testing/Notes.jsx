import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Four tools share the work. <strong>Vitest</strong> runs the files,{" "}
          <strong>jsdom</strong> supplies a browser-like DOM in Node,{" "}
          <strong>React Testing Library</strong> renders a component into that
          DOM and finds things the way a person would, and{" "}
          <strong>user-event</strong> performs the clicking and typing.{" "}
          <Code>@testing-library/jest-dom</Code> adds matchers such as{" "}
          <Code>toBeInTheDocument</Code> and <Code>toHaveTextContent</Code>.
        </p>
        <p className="mt-2">
          The tests in <Code>Demo.test.jsx</Code> are this lesson's deliverable:
          six cases for the member directory, covering loading, success and
          error, a retry, a typed filter, and the call into the fake API. They
          live beside the demo, so the whole folder stays self-contained.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>npm test</Code> runs Vitest once;{" "}
            <Code>npm run test:watch</Code> reruns on save. The config is the{" "}
            <Code>test</Code> key in <Code>vite.config.js</Code>: jsdom as the
            environment, <Code>src/test/setup.js</Code> for the matchers, and
            every <Code>*.test.*</Code> file next to its subject.
          </li>
          <li>
            <Code>render(&lt;Demo /&gt;)</Code> mounts the component and{" "}
            <Code>screen</Code> becomes the page. Queries are by role, label or
            text — the same hooks a screen reader uses — so the assert breaks
            when the user-facing contract breaks.
          </li>
          <li>
            <Code>getBy…</Code> throws when nothing matches,{" "}
            <Code>queryBy…</Code> returns <Code>null</Code>, and{" "}
            <Code>findBy…</Code> returns a promise that waits (1 s by default)
            for an element to appear. That is how the tests await a request
            without sleeping, and why the success case uses{" "}
            <Code>findByText</Code> for the first member.
          </li>
          <li>
            <Code>vi.mock("./api")</Code> replaces the module before the
            component can import it.{" "}
            <Code>mockReturnValue(new Promise(() =&gt; {}))</Code> keeps the
            component loading forever, <Code>mockResolvedValue</Code> scripts a
            success, and <Code>mockRejectedValue</Code> scripts a failure.{" "}
            <Code>mockRejectedValueOnce(…).mockResolvedValueOnce(…)</Code> sets
            up the retry test. The fake server's delay never runs.
          </li>
          <li>
            <Code>userEvent.setup()</Code> then <Code>await user.click(…)</Code>{" "}
            or <Code>await user.type(…)</Code> fires the events a browser would,
            including focus and pointer events, so the handlers run exactly as
            they do for a person. It is always asynchronous.
          </li>
          <li>
            <Code>beforeEach(() =&gt; vi.clearAllMocks())</Code> resets the call
            history between tests; the setup file unmounts each tree, so a
            previous test cannot answer this one's queries.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Pick the query by what it guarantees: <Code>getBy</Code> when the
            element must be there, <Code>queryBy</Code> for "it must not be
            there", <Code>findBy</Code> when an update is still in flight.
            Mixing them up produces a passing test that asserts nothing.
          </li>
          <li>
            A state update that lands outside your <Code>await</Code> triggers
            React's "not wrapped in <Code>act(…)</Code>" warning. The fix is
            almost always to <Code>await</Code> the <Code>findBy…</Code> before
            asserting, not to silence the warning.
          </li>
          <li>
            Mock at the seam the component already has. This demo talks to{" "}
            <Code>api.js</Code>, so the tests replace that module and never
            touch <Code>fetch</Code>, timers or the network. If you do mock{" "}
            <Code>fetch</Code>, restore it in <Code>afterEach</Code>.
          </li>
          <li>
            Do not assert class names, internal state or how many times a
            component rendered — those are implementation details the tests
            would freeze in place. Assert what is on screen.{" "}
            <Code>getByTestId</Code> is the last resort, and a role that cannot
            be found is often a real accessibility bug.
          </li>
          <li>
            React 19's StrictMode runs effects twice in development. The app
            wraps its routes in it; these tests render the demo directly, which
            is why <Code>toHaveBeenCalledTimes(1)</Code> holds. Wrapping a test
            in <Code>&lt;StrictMode&gt;</Code> would double the calls.
          </li>
          <li>
            These tests are the same three states the{" "}
            <Link
              to="/labs/react/api-integration"
              className="text-accent hover:underline"
            >
              API integration
            </Link>{" "}
            lesson renders. That is the payoff: once the states exist in the
            component, testing them is a render and a query, not a browser.
          </li>
        </ul>
      </section>
    </div>
  );
}
