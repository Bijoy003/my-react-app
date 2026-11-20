import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          React Router maps URLs to components. The whole table lives in{" "}
          <Code>src/App.jsx</Code>: a handful of <Code>Route</Code> elements
          inside <Code>Routes</Code>, all nested in one layout route. The demo
          above reads that real router live — the params it shows are this
          page's own URL.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            A <Code>Route</Code> with an element but no path is a{" "}
            <em>layout route</em>: it renders <Code>Outlet</Code> where the
            matched child goes. That is how the header and sidebar stay mounted
            while pages swap underneath them.
          </li>
          <li>
            <Code>:track</Code> and <Code>:slug</Code> are URL parameters.{" "}
            <Code>useParams</Code> returns them as strings —{" "}
            <Code>LessonPage</Code> uses exactly this to look up the lesson.
          </li>
          <li>
            <Code>Link</Code> renders an anchor and navigates client-side;{" "}
            <Code>useNavigate</Code> is for navigating after an event, like a
            submit or a redirect. <Code>navigate(-1)</Code> walks the history
            stack, like the Back button.
          </li>
          <li>
            <Code>useSearchParams</Code> reads and writes the query string as
            state — the demo's <Code>?highlight=</Code> param. And{" "}
            <Code>navigate(to, {"{ state }"})</Code> carries invisible data
            between routes; the sign-in redirect-back uses it.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            You cannot nest routers — a second <Code>Router</Code> inside the
            app's one throws. That is why this demo reads the real router
            instead of rendering a sandbox.
          </li>
          <li>
            Params are always strings; parse numbers yourself. And v7 ranks
            routes by specificity, not declaration order — the <Code>*</Code>{" "}
            catch-all only matches when nothing else does.
          </li>
          <li>
            Search params are URL state: shareable and refresh-proof, unlike{" "}
            <Code>useState</Code>. Put view options there when a link should
            reproduce the view.
          </li>
        </ul>
        <p className="mt-3">
          Guards build on these same primitives — see{" "}
          <Link
            to="/labs/react/protected-routes"
            className="text-accent hover:underline"
          >
            Protected routes
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
