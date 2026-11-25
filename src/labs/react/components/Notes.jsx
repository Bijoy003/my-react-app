import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          A component is a function that returns markup. React calls the
          function during a render, takes the JSX it returns, and turns that
          into DOM. There is no class to extend and no <Code>this</Code> to
          rebind: inputs arrive as an argument, and the output is the return
          value.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>function Badge()</Code> defines it; <Code>{"<Badge />"}</Code>{" "}
            renders it. The compiler decides from the first letter whether to
            pass a function or a string.
          </li>
          <li>
            Capitalisation is the whole rule: an uppercase tag is a component
            reference, a lowercase tag is an HTML element name.
          </li>
          <li>
            Nesting builds a tree. In the demo, <Code>Demo</Code> returns{" "}
            <Code>Header</Code>, which returns <Code>Badge</Code> — each
            function only has to describe its own piece.
          </li>
          <li>
            Components are pure: the same inputs produce the same markup, and
            rendering has no side effects. Development builds run every
            component twice to expose accidental impurity.
          </li>
        </ul>
        <p className="mt-3">
          The checkbox switches one tag between the component and an HTML
          element name, so the difference is visible rather than theoretical.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            A lowercase name never calls your function:{" "}
            <Code>{"<badge />"}</Code> asks for an element called{" "}
            <Code>badge</Code>, which does not exist, so React renders an empty
            tag and warns in the console.
          </li>
          <li>
            Render, don't call. <Code>Badge()</Code> runs the function inside
            the parent, so React does not own the result; hooks and updates will
            misbehave. Write <Code>{"<Badge />"}</Code> instead.
          </li>
          <li>
            Return something renderable. <Code>null</Code> is a valid "nothing";
            falling off the end and returning <Code>undefined</Code> throws.
          </li>
          <li>
            Two siblings still need one root: group them with a fragment (
            <Code>{"<>…</>"}</Code>) rather than adding a wrapper{" "}
            <Code>div</Code>.
          </li>
        </ul>
      </section>
    </div>
  );
}
