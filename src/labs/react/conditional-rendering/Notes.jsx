import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          JSX has no <Code>if</Code> statement. A component decides what to
          return while it builds the tree, so every conditional is either an
          expression inside braces or an early <Code>return</Code> before the
          JSX.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">The three shapes</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>condition ? a : b</Code> — pick one of two elements.
          </li>
          <li>
            <Code>condition && element</Code> — show one element or nothing.
          </li>
          <li>
            <Code>if (!data) return null</Code> — the whole component opts out.
          </li>
        </ul>
        <p className="mt-3">
          <Code>StatusBadge</Code> uses all three: it returns <Code>null</Code>{" "}
          for an unknown status, uses <Code>&amp;&amp;</Code> for the optional
          detail text, and keeps the label and colours in lookup objects instead
          of stacking ternaries.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>count &amp;&amp; &lt;Badge /&gt;</Code> renders a literal{" "}
            <Code>0</Code> when the count is zero. Compare first:{" "}
            <Code>count &gt; 0 &amp;&amp; …</Code>.
          </li>
          <li>
            Returning <Code>null</Code> hides the output but keeps the component
            mounted, so its state and effects survive.
          </li>
          <li>
            Braces accept expressions only — no statements, no declarations.
          </li>
        </ul>
      </section>
    </div>
  );
}
