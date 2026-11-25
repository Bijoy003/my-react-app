import { Link } from "react-router-dom";
import Card from "../components/Card";
import Code from "../components/Code";
import Section from "../components/Section";
import { hookGroups } from "../data/hooks";

const totalHooks = hookGroups.reduce(
  (total, group) => total + group.hooks.length,
  0,
);

function HookCard({ hook }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-semibold text-ink">
          {hook.name}
        </h3>
        <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-ink-muted">
          {hook.source}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed">
        <strong className="font-medium text-ink">What it does. </strong>
        {hook.what}
      </p>

      <p className="mt-2 text-sm leading-relaxed">
        <strong className="font-medium text-ink">When to use it. </strong>
        {hook.when}
      </p>

      <Link
        to={hook.href}
        className="mt-auto pt-4 text-xs font-medium text-accent hover:underline"
      >
        See it in {hook.lesson} →
      </Link>
    </Card>
  );
}

export default function HooksPage() {
  return (
    <>
      <header className="border-b border-line pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Reference
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Every hook this lab uses.
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed">
          {totalHooks} hooks, grouped by the job they do. Each card explains the
          hook in plain language, says when to reach for it, and links to the
          lesson where it is working.
        </p>

        <nav aria-label="Hook groups" className="mt-8 flex flex-wrap gap-2">
          {hookGroups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {group.title}
            </a>
          ))}
        </nav>
      </header>

      <section className="border-b border-line py-10">
        <Card title="The two rules of hooks">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>
              Call hooks at the top level of a component or another hook, never
              inside a condition, a loop, or a nested function.
            </li>
            <li>
              Only call hooks from a React component or a custom hook whose name
              starts with <Code>use</Code>.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed">
            A custom hook is just a function that starts with <Code>use</Code>{" "}
            and calls other hooks. It shares logic, not state: each component
            that calls it gets its own copy of the values it returns.
          </p>
        </Card>
      </section>

      {hookGroups.map((group) => (
        <Section
          key={group.id}
          id={group.id}
          eyebrow={group.eyebrow}
          title={group.title}
          intro={group.intro}
        >
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {group.hooks.map((hook) => (
              <li key={hook.name}>
                <HookCard hook={hook} />
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </>
  );
}
