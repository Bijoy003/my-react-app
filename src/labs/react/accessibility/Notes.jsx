import { Link } from "react-router-dom";
import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Accessibility means the interface works for someone who cannot see the
          screen, use a mouse, or both. Most of it is not an add-on: a real{" "}
          <Code>&lt;button&gt;</Code> is keyboard-operable before you write a
          line of JavaScript, and a real <Code>&lt;label&gt;</Code> names its
          input for free. The rest is discipline — a sensible tab order, visible
          focus, announced status messages, and semantics that match the widget
          you built.
        </p>
        <p className="mt-2">
          The demo is a tab list built the long way and the short way at once:
          semantic buttons, <Code>aria-selected</Code>, roving{" "}
          <Code>tabIndex</Code>, arrow-key handling, a labelled panel and a live
          region for the save message. It is this app's keyboard audit target as
          well; the findings and fixes are written up in{" "}
          <Code>docs/keyboard-audit.md</Code>.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="font-medium text-ink">Start with HTML.</strong>{" "}
            Use <Code>button</Code> for actions, <Code>a</Code> for navigation,{" "}
            <Code>ul</Code>/<Code>li</Code> for lists, and a <Code>form</Code>{" "}
            for submissions. ARIA only fills the gaps HTML cannot express — it
            never adds behaviour.
          </li>
          <li>
            <strong className="font-medium text-ink">
              Name every control.
            </strong>{" "}
            A <Code>label</Code> with <Code>htmlFor</Code>, or an{" "}
            <Code>aria-label</Code> when there is no visible text. Use{" "}
            <Code>aria-describedby</Code> for hints and errors, and{" "}
            <Code>aria-invalid</Code> when a field fails.{" "}
            <Link
              to="/labs/react/form-validation"
              className="text-accent hover:underline"
            >
              Form validation
            </Link>{" "}
            wires all three to the same input.
          </li>
          <li>
            <strong className="font-medium text-ink">
              One tab stop per composite widget.
            </strong>{" "}
            The selected tab has <Code>tabIndex=0</Code>; the others get{" "}
            <Code>-1</Code>. Arrow keys, Home and End move selection and focus
            together — that is the roving tabindex pattern in{" "}
            <Code>Tabs.jsx</Code>.
          </li>
          <li>
            <strong className="font-medium text-ink">
              Manage focus on change.
            </strong>{" "}
            The layout moves focus to <Code>#main-content</Code> after each
            route change, so the next Tab starts in the new lesson. A modal
            would trap focus while open and return it to its trigger on close.
          </li>
          <li>
            <strong className="font-medium text-ink">
              Announce without moving.
            </strong>{" "}
            <Code>role="status"</Code> is polite, <Code>role="alert"</Code>{" "}
            interrupts. Keep the live region mounted and change its text; a
            region that appears with its message is often skipped.
          </li>
          <li>
            <strong className="font-medium text-ink">
              Test without a mouse.
            </strong>{" "}
            Put the mouse aside and complete the lesson: Tab reaches everything,
            Enter and Space activate, focus is always visible, and Escape closes
            what it opened.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>aria-selected</Code> on a <Code>div</Code> announces a tab
            that cannot be focused or activated. Roles describe what the markup
            does; they do not make it do anything.
          </li>
          <li>
            Removing the focus outline is the most common regression. If the
            default ring is ugly, restyle it with <Code>:focus-visible</Code>{" "}
            rather than deleting it — this app sets one global ring in{" "}
            <Code>src/index.css</Code>.
          </li>
          <li>
            <Code>display: none</Code> removes an element from the accessibility
            tree, but <Code>opacity: 0</Code> and off-screen positioning do not.
            That is why hidden helpers use <Code>sr-only</Code> and the layout's
            skip link becomes visible on focus.
          </li>
          <li>
            Colour is not a message. Pair the accent colour with text ("Saved"
            or an error sentence), and keep contrast above 4.5:1 for body text
            in both colour schemes.
          </li>
          <li>
            Automated tools (axe, Lighthouse) catch perhaps a third of the
            problems. Keyboard passes, screen-reader spot checks and a real
            person's feedback find the rest.
          </li>
          <li>
            The related behaviour lessons are{" "}
            <Link
              to="/labs/react/effects-and-refs"
              className="text-accent hover:underline"
            >
              Effects and refs
            </Link>{" "}
            for focusing a node, and{" "}
            <Link
              to="/labs/react/routing"
              className="text-accent hover:underline"
            >
              Routing
            </Link>{" "}
            for why a route change needs its own focus reset.
          </li>
        </ul>
      </section>
    </div>
  );
}
