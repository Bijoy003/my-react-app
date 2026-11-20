import { useState } from "react";
import Code from "../../../components/Code";

// The frame decides where content goes; the caller decides what it is.
// `children` is the JSX between the tags, `footer` is an optional named slot.
function Panel({ children, footer }) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
      {footer && (
        <footer className="mt-4 border-t border-line pt-3 text-xs text-ink-muted">
          {footer}
        </footer>
      )}
    </section>
  );
}

export default function Demo() {
  const [showFooter, setShowFooter] = useState(true);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <h3 className="text-lg font-semibold text-ink">Only children</h3>
          <p className="mt-2">
            The panel supplies the frame. Everything inside it arrived from this
            call site, including the heading and this paragraph.
          </p>
        </Panel>

        <Panel
          footer={
            showFooter ? (
              <span>
                This footer arrived through a named <Code>footer</Code> slot.
              </span>
            ) : null
          }
        >
          <h3 className="text-lg font-semibold text-ink">
            Children and a slot
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <Code>children</Code> fills the body
            </li>
            <li>
              <Code>footer</Code> is a second slot
            </li>
          </ul>
        </Panel>
      </div>

      <label className="flex w-fit items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showFooter}
          onChange={(event) => setShowFooter(event.target.checked)}
          className="size-4 accent-[var(--color-accent)]"
        />
        Pass the footer slot
      </label>
    </div>
  );
}
