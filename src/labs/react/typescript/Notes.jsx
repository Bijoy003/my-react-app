import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          TypeScript adds static types to JavaScript. React components are
          functions, so types describe their props, their state, the events they
          handle and the data they fetch. The editor and{" "}
          <Code>npm run typecheck</Code> flag a wrong prop or a missing field
          before the app runs. This lesson is written in <Code>.tsx</Code>; the
          rest of the lab stays JavaScript until a conversion is worth it.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>interface Member</Code> is the data contract. The API function
            returns <Code>Promise&lt;Member[]&gt;</Code>, and{" "}
            <Code>useState&lt;Member[]&gt;([])</Code> keeps the hook honest. A
            misspelt field becomes a compile error, not an empty cell.
          </li>
          <li>
            Props are typed with an interface:{" "}
            <Code>{"function MemberCard({ member }: MemberCardProps)"}</Code>.
            Callers now get autocomplete and a warning if they pass the wrong
            shape.
          </li>
          <li>
            Events are typed too.{" "}
            <Code>ChangeEvent&lt;HTMLInputElement&gt;</Code> gives{" "}
            <Code>event.target.value</Code> the right type; a form submit uses{" "}
            <Code>FormEvent&lt;HTMLFormElement&gt;</Code>.
          </li>
          <li>
            The custom hook declares{" "}
            <Code>function useMembers(): MembersState</Code>, so its return
            value is documented and checked. Catch clauses receive{" "}
            <Code>unknown</Code> under <Code>strict</Code>; narrow it with{" "}
            <Code>instanceof Error</Code> before reading <Code>message</Code>.
          </li>
          <li>
            Vite strips the types with esbuild — nothing type-related ships to
            the browser. <Code>tsc --noEmit</Code> does the checking separately.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Types vanish at runtime. A response typed as{" "}
            <Code>Promise&lt;Member[]&gt;</Code> can still be malformed JSON;
            validate at the boundary (the Zod lesson does exactly that) instead
            of trusting the annotation.
          </li>
          <li>
            Avoid <Code>any</Code>. Use <Code>unknown</Code> and narrow, or
            write the real shape. One <Code>any</Code> disables checking for
            everything it touches.
          </li>
          <li>
            A component's file extension matters: JSX in a <Code>.ts</Code> file
            is a syntax error, so components use <Code>.tsx</Code>.
          </li>
          <li>
            Types are not tests. They catch shape mistakes, not wrong behaviour
            — the next phase adds React Testing Library for that.
          </li>
        </ul>
      </section>
    </div>
  );
}
