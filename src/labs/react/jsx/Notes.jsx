import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          JSX is JavaScript with a markup-shaped syntax, not a template
          language. Vite compiles it before the browser sees it: every tag
          becomes a function call, and its attributes become a single object
          argument. That is why braces can hold any expression — the compiler is
          only filling in an argument.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>{"{expression}"}</Code> — a variable, a sum, a comparison, a
            function call. Expressions only: no <Code>if</Code>, no{" "}
            <Code>const</Code> inside the braces.
          </li>
          <li>
            <Code>{'className={accent ? "text-accent" : "text-ink"}'}</Code> —
            an attribute value is either a quoted string or an expression in
            braces, never both at once.
          </li>
          <li>
            <Code>{"<>…</>"}</Code> — a fragment. It groups siblings so a
            component can return one root without adding a wrapping{" "}
            <Code>div</Code>.
          </li>
        </ul>
        <p className="mt-3">
          The demo uses all three: two inputs feed braces, the headline takes
          its colour from an attribute expression, and the controls and the
          preview share a fragment instead of a wrapper.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Attributes are camelCase because they become object keys:{" "}
            <Code>className</Code>, <Code>htmlFor</Code>, <Code>tabIndex</Code>,{" "}
            <Code>onChange</Code>. Writing <Code>class</Code> sends a prop that
            nothing reads.
          </li>
          <li>
            Every tag must close, including void elements:{" "}
            <Code>{"<input />"}</Code>, <Code>{"<br />"}</Code>,{" "}
            <Code>{"<img />"}</Code>.
          </li>
          <li>
            The capital letter decides the meaning. <Code>{"<hero />"}</Code>{" "}
            asks for an HTML tag called <Code>hero</Code>;{" "}
            <Code>{"<Hero />"}</Code> calls the function.
          </li>
          <li>
            Adjacent lines of text collapse into one space, so an explicit{" "}
            <Code>{'{" "}'}</Code> is how you ask for a space between an element
            and the words around it.
          </li>
        </ul>
      </section>
    </div>
  );
}
