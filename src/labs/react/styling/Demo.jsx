import Code from "../../../components/Code";

const STATS = [
  { id: "lessons", label: "Lessons read", value: "6", hint: "of 12 written" },
  { id: "demos", label: "Demos tried", value: "12", hint: "keep clicking" },
  {
    id: "streak",
    label: "Study streak",
    value: "4 days",
    hint: "personal best",
  },
];

// One reusable tile: every stat inherits the same border, spacing and type.
function Stat({ label, value, hint }) {
  return (
    <li className="rounded-xl border border-line bg-surface p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink-muted">{hint}</p>
    </li>
  );
}

export default function Demo() {
  return (
    <section aria-labelledby="week-heading" className="space-y-6">
      <header>
        <h3 id="week-heading" className="text-lg font-semibold text-ink">
          Your week at a glance
        </h3>
        <p className="mt-1 text-sm leading-relaxed">
          Resize the window: the tiles stack on phones and sit in a row from the{" "}
          <Code>sm</Code> breakpoint up.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <Stat key={stat.id} {...stat} />
        ))}
      </ul>

      <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          One reusable tile keeps every stat consistent.
        </p>
        <a
          href="https://tailwindcss.com/docs/responsive-design"
          className="w-fit rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Responsive docs
        </a>
      </div>
    </section>
  );
}
