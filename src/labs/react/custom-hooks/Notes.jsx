import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          A custom hook is a function whose name starts with <Code>use</Code>{" "}
          and that calls other hooks. It packages behaviour — state, effects,
          derived values — behind a smaller API. It shares <em>logic</em>, not
          state: each caller gets its own copy. The demo extracts{" "}
          <Code>useLocalStorage</Code>, so two note cards persist independently
          while the component files stay presentation-only.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The name is load-bearing: <Code>useLocalStorage</Code> tells React
            and ESLint that hooks may appear inside it. Drop the prefix and the{" "}
            <Code>react-hooks</Code> rules stop checking it, which is how hook
            bugs get into production.
          </li>
          <li>
            The body is ordinary function code. This hook creates one{" "}
            <Code>useState</Code>, reads once through a lazy initialiser, writes
            through an effect, and returns a tuple. Swapping it for a different
            storage backend changes nothing at the call site.
          </li>
          <li>
            Returning a tuple — <Code>[value, setValue]</Code> — keeps the call
            site readable and lets the caller rename, as{" "}
            <Code>const [text, setText] = useLocalStorage(…)</Code> does. Return
            an object when there are several named values and the order would be
            hard to remember.
          </li>
          <li>
            <Code>useDebugValue(value)</Code> adds a label to the hook in React
            DevTools. It runs only when the panel is open, so it costs nothing
            in production and is worth adding to any hook whose internals are
            not obvious.
          </li>
          <li>
            Hooks compose. A <Code>useDebouncedValue</Code>, a{" "}
            <Code>useOnlineStatus</Code> or a <Code>useMediaQuery</Code> would
            be written the same way, and a larger hook can call several smaller
            ones. The{" "}
            <Link to="/hooks" className="text-accent hover:underline">
              hooks reference
            </Link>{" "}
            lists every hook in this lab, including every custom hook extracted
            so far.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            A custom hook does not share state between callers. Two components
            calling <Code>useLocalStorage</Code> read different keys and keep
            different values. Sharing state needs a provider or a store; the{" "}
            <Link
              to="/labs/react/shared-state"
              className="text-accent hover:underline"
            >
              Shared state
            </Link>{" "}
            and{" "}
            <Link
              to="/labs/react/zustand"
              className="text-accent hover:underline"
            >
              Zustand
            </Link>{" "}
            lessons cover those.
          </li>
          <li>
            All the rules of hooks still apply inside: top level only, no calls
            inside conditions or loops, and every hook used unconditionally. The
            linter enforces both the rule and the dependency arrays.
          </li>
          <li>
            Do not hide a side effect behind a getter. A hook that writes on
            render breaks StrictMode and can loop. Effects belong in{" "}
            <Code>useEffect</Code>; the storage write here is one.
          </li>
          <li>
            If the hook returns JSX, it is a component, not a hook, and should
            be capitalised and rendered rather than called. The{" "}
            <Code>react-hooks</Code> rule cannot help you decide that.
          </li>
          <li>
            Extract on the second use, or when it separates a real concern from
            presentation. A hook with one caller and no complexity is just an
            indirection with a new file.
          </li>
          <li>
            <Code>localStorage</Code> does not exist during server rendering.
            The lazy initialiser and the try/catch keep this demo safe in the
            browser; an SSR app would read storage inside an effect instead.
          </li>
        </ul>
      </section>
    </div>
  );
}
