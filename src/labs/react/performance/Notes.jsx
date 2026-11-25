import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Performance work has two halves: finding the slow render, then
          removing the work that causes it. React is usually fast enough, so the
          expensive part is almost always unnecessary work — a filter that
          recomputes on every parent render, a list that re-renders when one row
          changes, or a bundle that ships code the visitor never opens. The demo
          makes the first case visible with <Code>&lt;Profiler&gt;</Code>, the
          same API behind React DevTools' flame graph.
        </p>
        <p className="mt-2">
          The deliverable is a before/after profile: press “Re-render parent”
          several times, capture with the cache off, switch it on, repeat, and
          capture again. The two rows in the table are the same interaction
          measured both ways.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>&lt;Profiler onRender=…&gt;</Code> wraps a subtree and reports
            each commit's <Code>actualDuration</Code> — how long React spent
            rendering that subtree. The demo pushes samples into a ref and
            summarises them only when you press capture, because calling{" "}
            <Code>setState</Code> inside <Code>onRender</Code> would schedule
            another commit.
          </li>
          <li>
            “Re-render parent” changes state the list does not care about. With
            the direct filter, the 4,000-row scan runs again anyway; with{" "}
            <Code>useMemo</Code> and the same <Code>query</Code>, React returns
            the cached array. That is the whole difference between the two
            captures.
          </li>
          <li>
            In React DevTools, open the <strong>Profiler</strong> tab, record,
            interact, stop. The flame graph colours components by render time
            and “Ranked” sorts the slowest. Clicking a component shows why it
            rendered. The in-app <Code>&lt;Profiler&gt;</Code> is the same data
            without the extension.
          </li>
          <li>
            <strong className="font-medium text-ink">Code splitting.</strong>{" "}
            This lab used to ship all twenty-six demos and notes in the entry
            chunk. Every <Code>lab.js</Code> now wraps its two panels in{" "}
            <Code>React.lazy</Code>, so the registry loads metadata eagerly and
            each lesson arrives on demand through the{" "}
            <Code>&lt;Suspense&gt;</Code> boundary in <Code>LessonPage</Code>.
            The practice app is split the same way.
          </li>
          <li>
            The React Compiler does this work automatically in projects that
            enable it: it inserts memoisation where it can prove the result is
            safe. The guidance is to let the compiler work and to hand-write{" "}
            <Code>useMemo</Code>/<Code>useCallback</Code>/<Code>memo</Code> only
            when a profile shows a problem.
          </li>
          <li>
            Measure production builds. Development React is dramatically slower
            and StrictMode double-invokes work on purpose; run{" "}
            <Code>npm run build</Code> and <Code>npm run preview</Code> before
            trusting a number.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Memoise last, not first. Adding <Code>useMemo</Code> to cheap work
            adds a dependency comparison and makes the code harder to read for
            no gain. The{" "}
            <Link
              to="/labs/react/memoisation"
              className="text-accent hover:underline"
            >
              Memoisation
            </Link>{" "}
            lesson shows the same rule from the other side.
          </li>
          <li>
            A cached value must stay correct. If a dependency is missing from
            the array, the function returns stale data — that is a bug the
            profiler cannot see. Test the behaviour, not the timer.
          </li>
          <li>
            <Code>memo</Code> only helps when props are stable. A fresh object
            or inline arrow defeats it, so memoise the callback or move the
            value out of render before wrapping the child.
          </li>
          <li>
            Lazy loading moves bytes, it does not delete them. Total download is
            roughly the same; what improves is time to first paint and the
            chance a visitor never pays for a lesson they did not open. Keep
            fallbacks short and stable so the layout does not jump.
          </li>
          <li>
            A Suspense fallback that flashes for a 20 ms chunk feels slower than
            no fallback. In production, prefetch the next likely chunk on a
            hover or idle callback if the flash is real.
          </li>
          <li>
            DevTools adds overhead while recording. Compare like with like, use
            several presses per capture, and look at the trend rather than a
            single millisecond.
          </li>
        </ul>
      </section>
    </div>
  );
}
