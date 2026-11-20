import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

// No sandbox router here: React Router forbids nesting routers, so this
// panel reads the app's real one — the same hooks the pages themselves use.
export default function Demo() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="space-y-4">
      <ul className="space-y-1 font-mono text-xs text-ink">
        <li>pathname: {location.pathname}</li>
        <li>
          params: track={params.track} · slug={params.slug}
        </li>
        <li>search: {location.search || "(none)"}</li>
        <li>highlight: {searchParams.get("highlight") ?? "(unset)"}</li>
        <li>
          location.state:{" "}
          {location.state ? JSON.stringify(location.state) : "null"}
        </li>
      </ul>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSearchParams({ highlight: "demo" })}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          Set ?highlight=demo
        </button>
        <button
          type="button"
          onClick={() => setSearchParams({})}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          Clear search
        </button>
        <Link
          to="/"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Link to home
        </Link>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          navigate(-1)
        </button>
      </div>

      <p className="text-xs text-ink-muted">
        Watch the URL bar: the buttons rewrite the query string without a
        reload, and the params above come straight from this lesson's own
        /labs/:track/:slug route.
      </p>
    </div>
  );
}
