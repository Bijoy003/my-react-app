// `actions` is a slot: the parent passes JSX and Hero just places it.
export default function Hero({ eyebrow, title, subtitle, actions }) {
  return (
    <section className="border-b border-line pb-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>

      <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
        {title}
      </h1>

      <p className="mt-5 max-w-xl leading-relaxed">{subtitle}</p>

      {actions && (
        <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
      )}
    </section>
  );
}
