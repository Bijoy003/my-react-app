// Props (id, eyebrow, title, intro) plus composition (children).
// The eyebrow and intro are optional, so both are rendered conditionally.
export default function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-line py-14">
      <header className="mb-10 max-w-2xl">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
          {title}
        </h2>
        {intro && <p className="mt-3 leading-relaxed">{intro}</p>}
      </header>
      {children}
    </section>
  );
}
