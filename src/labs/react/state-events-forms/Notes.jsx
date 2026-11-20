import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          State is a component's memory between renders. <Code>useState</Code>{" "}
          returns the current value and a setter; calling the setter schedules a
          re-render with the new value. A <em>controlled</em> input takes that
          value as its <Code>value</Code> prop, so React — not the DOM — owns
          what the field shows.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Every keystroke fires <Code>onChange</Code>; the handler reads{" "}
            <Code>event.target.name</Code> and <Code>value</Code> and stores
            them, so one handler serves every field.
          </li>
          <li>
            <Code>onSubmit</Code> fires for the button and the Enter key alike.{" "}
            <Code>event.preventDefault()</Code> stops the browser's full-page
            POST so the component can handle the data.
          </li>
          <li>
            Validation runs on submit, errors render next to their fields, and
            editing a field clears its error — feedback, not nagging.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>value</Code> without <Code>onChange</Code> makes a read-only
            input. React warns; the field simply will not type.
          </li>
          <li>
            Mutating state directly (<Code>fields.name = "…"</Code>) changes
            nothing on screen — only the setter triggers a render. When the next
            value depends on the previous one, pass a function:{" "}
            <Code>{"setFields((current) => …)"}</Code>.
          </li>
          <li>
            <Code>noValidate</Code> turns off the browser's own validation
            bubbles so the custom, accessible feedback is the only feedback.
            Labels need <Code>htmlFor</Code>, and errors are tied to fields with{" "}
            <Code>aria-describedby</Code>.
          </li>
        </ul>
      </section>
    </div>
  );
}
