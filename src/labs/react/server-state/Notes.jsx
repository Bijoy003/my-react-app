import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Server state is data the client does not own: it lives on a server,
          changes without asking, and every screen needs its own copy kept
          fresh. TanStack Query turns that into a cache keyed by query, with
          built-in loading and error flags, background refetching, and mutations
          that invalidate the affected keys.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>useQuery</Code> takes a <Code>queryKey</Code> and a{" "}
            <Code>queryFn</Code>. The key is the cache identity:{" "}
            <Code>["tasks"]</Code> here, and something like{" "}
            <Code>["task", id]</Code> for one record.
          </li>
          <li>
            While the first request is in flight the query is{" "}
            <Code>isPending</Code>. Later refetches keep the old{" "}
            <Code>data</Code> on screen and set <Code>isFetching</Code>, so the
            list never flashes back to a spinner.
          </li>
          <li>
            <Code>useMutation</Code> wraps create and delete. On success it
            calls <Code>invalidateQueries</Code>, which marks{" "}
            <Code>["tasks"]</Code> stale and refetches it — the server stays the
            source of truth.
          </li>
          <li>
            <Code>staleTime</Code> says how long a response is fresh. Within
            that window a remount reads the cache instead of the network; the
            query client is created once per demo in a <Code>useState</Code>{" "}
            initialiser.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Query keys are dependencies. Put every variable the fetcher reads
            into the key, or two different requests will share one cache entry.
          </li>
          <li>
            Do not copy <Code>data</Code> into <Code>useState</Code> "so it can
            be edited". That creates a second source of truth; mutate through
            the server and let the cache update.
          </li>
          <li>
            Mutations need a strategy: invalidate (simplest, refetches), update
            the cache directly with <Code>setQueryData</Code>, or show an
            optimistic update. Pick one deliberately.
          </li>
          <li>
            Server data belongs here, not in Context or a client store. The{" "}
            <Link
              to="/labs/react/api-integration"
              className="text-accent hover:underline"
            >
              API integration
            </Link>{" "}
            lesson shows the hand-rolled version this library replaces.
          </li>
        </ul>
      </section>
    </div>
  );
}
