import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Props are the inputs a component receives, written as attributes at
          the call site. They arrive as one object argument, and they are
          read-only: a child renders what the parent provides and never edits
          it.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>{'<LessonCard title="Props" seats={3} />'}</Code> becomes a
            call with one object: <Code>{'{ title: "Props", seats: 3 }'}</Code>.
          </li>
          <li>
            Destructuring the parameter list names the props you use. A default
            such as <Code>{'note = "No note"'}</Code> fills in a missing prop.
          </li>
          <li>
            <Code>{"{...lesson}"}</Code> spreads an object into separate props.
            Order matters: a prop written after the spread overrides the same
            key from the object.
          </li>
          <li>
            Data flows one way. To change something, the child calls a function
            prop, and the parent updates its own state. In the demo,{" "}
            <Code>onEnrol</Code> lowers the <Code>seats</Code> count in the
            parent.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Props are frozen in development. Assigning to one throws an error,
            which is the framework pointing at the real fix: lift the changing
            value into state.
          </li>
          <li>
            Defaults only replace <Code>undefined</Code>. Passing{" "}
            <Code>null</Code>, <Code>""</Code> or <Code>0</Code> keeps that
            value, so the demo deliberately passes <Code>undefined</Code> to
            trigger its default.
          </li>
          <li>
            Do not spread unknown props onto a DOM element (
            <Code>{"<div {...props} />"}</Code>); invalid attributes and event
            names end up in the HTML. Pull out what the element understands.
          </li>
          <li>
            Every render builds a fresh props object, so an unchanged value is
            still a new object reference. Compare values, not object identity.
          </li>
        </ul>
      </section>
    </div>
  );
}
