import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Composition means building a component out of other components instead
          of copying their markup. <Code>children</Code> carries whatever JSX
          sits between a component's tags, so the same frame can hold a
          paragraph, a list or a form without knowing which.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>{"<Panel>…</Panel>"}</Code> becomes{" "}
            <Code>Panel({"{ children: … }"})</Code>. The component places{" "}
            <Code>{"{children}"}</Code> where the content belongs.
          </li>
          <li>
            A named slot is just another prop whose value is JSX:{" "}
            <Code>{"footer={<span>…</span>}"}</Code>. The name is a convention,
            not a React feature.
          </li>
          <li>
            The demo's two panels use the same frame with different bodies, and
            the second one adds a footer only when the checkbox passes it.
          </li>
          <li>
            React has no component inheritance. Shared layout comes from
            composition; shared logic comes from hooks. A component tree is
            assembled, not subclassed.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Forget <Code>{"{children}"}</Code> in the frame and the content
            vanishes silently — the JSX is passed but never placed.
          </li>
          <li>
            <Code>children</Code> is opaque. The frame can wrap or position it,
            but it cannot restyle what the parent wrote.
          </li>
          <li>
            Pass an element, not a component function.{" "}
            <Code>{"footer={<Footer />}"}</Code> renders it;{" "}
            <Code>{"footer={Footer}"}</Code> puts the function itself in the
            tree, which React cannot render.
          </li>
          <li>
            A slot does not share state automatically. If two slots must react
            to each other, the state lives in their common parent and arrives as
            props.
          </li>
        </ul>
      </section>
    </div>
  );
}
