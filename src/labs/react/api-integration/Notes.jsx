import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          A REST call turns a URL and an HTTP verb into JSON. The component's
          job is not just to show the data: every request has four visible
          states — <em>loading</em>, <em>error</em>, <em>empty</em> and{" "}
          <em>ready</em> — and a mutation has to put the list back in sync
          afterwards. This demo runs a full create, update and delete flow
          against <Code>api.js</Code>, a fake server with latency and a failure
          switch.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            A <Code>useEffect</Code> owns the initial <Code>GET</Code>. It runs{" "}
            <Code>listTasks()</Code>, flips <Code>status</Code> from{" "}
            <Code>"loading"</Code> to <Code>"ready"</Code> or{" "}
            <Code>"error"</Code>, and returns a cleanup that ignores a response
            arriving after unmount.
          </li>
          <li>
            Create, update and delete are event handlers, not effects. Each one
            awaits its request, then updates the local copy of the list —
            append, replace the row, or filter it out.
          </li>
          <li>
            The fake server lives in <Code>api.js</Code> and the request logic
            in <Code>useTasks.js</Code>, so <Code>Demo.jsx</Code> only maps
            state to markup. Swapping in real <Code>fetch</Code> calls means
            editing the API module, not the UI.
          </li>
          <li>
            The failure switch makes the error path testable without unplugging
            the network. A real app would also distinguish network failures from
            a <Code>404</Code> or <Code>500</Code>.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>fetch</Code> only rejects when the request itself fails. Check{" "}
            <Code>response.ok</Code> before calling <Code>response.json()</Code>
            , or a <Code>500</Code> will look like success with a broken body.
          </li>
          <li>
            Rapid clicks can race: two updates may resolve out of order. Disable
            the row while it is busy (as here) or send a request id and ignore
            stale responses.
          </li>
          <li>
            The client's copy is a cache, not the truth. After a mutation,
            either refetch or apply the server's returned row; do both and you
            invite drift.
          </li>
          <li>
            Caching, background refetching and invalidation get repetitive by
            hand. That is exactly what a query library handles — see{" "}
            <Link
              to="/labs/react/server-state"
              className="text-accent hover:underline"
            >
              Server state with TanStack Query
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
