import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          React Hook Form keeps form state in refs instead of re-rendering on
          every keystroke, and <Code>register</Code> wires an input to it. Zod
          describes the valid shape in one schema; the resolver runs that schema
          on submit (and on blur here) and hands back field-level messages.
          Rules live in one place, not scattered through JSX.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>
              useForm({"{"} resolver, mode: "onTouched" {"}"})
            </Code>{" "}
            returns <Code>register</Code>, <Code>handleSubmit</Code> and{" "}
            <Code>formState</Code>. Spreading{" "}
            <Code>{"{...register('email')}"}</Code> onto an input supplies its
            name, ref, onChange and onBlur.
          </li>
          <li>
            <Code>zodResolver(enrolSchema)</Code> validates the collected values
            and fills <Code>errors</Code>. <Code>handleSubmit</Code> only calls
            your handler when the schema passes, so <Code>submit</Code> can
            trust its argument.
          </li>
          <li>
            Each error is tied to its input with <Code>aria-invalid</Code> and{" "}
            <Code>aria-describedby</Code>, and the message sits next to the
            field. React Hook Form also focuses the first invalid field on a
            failed submit.
          </li>
          <li>
            <Code>mode: "onTouched"</Code> validates a field after the user
            leaves it, so a fresh form is not covered in red before anyone
            types.
            <Code>isSubmitting</Code> disables the button while the fake POST
            runs.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Client validation is UX, not security. The server must validate the
            same rules again — share the schema rather than trusting the
            browser.
          </li>
          <li>
            Zod's <Code>z.coerce.number()</Code> converts the input string
            before checking it. Without coercion every value from a form is a
            string and <Code>min(16)</Code> compares text.
          </li>
          <li>
            Uncontrolled does not mean unreadable: <Code>watch</Code> or{" "}
            <Code>getValues</Code> read current values when something must react
            to them. Reaching for <Code>useState</Code> per field gives the
            re-renders back.
          </li>
          <li>
            The same schema can type the data with{" "}
            <Code>z.infer&lt;typeof enrolSchema&gt;</Code>; the{" "}
            <Link
              to="/labs/react/typescript"
              className="text-accent hover:underline"
            >
              TypeScript
            </Link>{" "}
            lesson shows the typed end of this.
          </li>
        </ul>
      </section>
    </div>
  );
}
