import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          JSX has no loop syntax. To render a collection you turn the data into
          an array of elements with <Code>map()</Code>, and React renders the
          array like any other child. Filtering is the same idea: shape the data
          first, then map it.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>
              {"items.map((item) => <Row key={item.id} item={item} />)"}
            </Code>{" "}
            returns one element per item. The callback must return the element
            it wants in the list.
          </li>
          <li>
            <Code>key</Code> lets React match an element in this render with the
            same element in the next one. Use an id that belongs to the data, so
            state and DOM nodes stay attached to the right item.
          </li>
          <li>
            The demo filters into <Code>visible</Code> and only then maps it.
            Hidden rows are never created, which is cheaper and avoids stale
            keys.
          </li>
          <li>
            Keys only have to be unique among siblings; two different lists may
            reuse the same ids.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            An index key breaks as soon as the list is sorted, filtered or
            spliced: state follows the position instead of the item. The demo
            shows it by starring one row before filtering.
          </li>
          <li>
            <Code>key</Code> is not a prop. The child cannot read it, so pass
            the id separately when the row needs it.
          </li>
          <li>
            A missing key logs a warning and React falls back to the index — the
            same bug, now by accident.
          </li>
          <li>
            Use a list element for a list: <Code>ul</Code> with <Code>li</Code>{" "}
            children, not a pile of <Code>div</Code>s. The structure is free
            accessibility.
          </li>
        </ul>
      </section>
    </div>
  );
}
