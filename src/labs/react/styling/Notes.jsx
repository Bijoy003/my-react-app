import Code from "../../../components/Code";

export default function Notes() {
  return (
    <div className="space-y-8 text-sm leading-relaxed xl:grid xl:gap-10 xl:space-y-0 xl:[grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]">
      <section>
        <h3 className="mb-2 font-semibold text-ink">What it is</h3>
        <p>
          Styling here is Tailwind utilities composed in JSX, reading colours
          from the <Code>@theme</Code> tokens in <Code>src/index.css</Code>:{" "}
          <Code>bg-surface</Code>, <Code>text-ink</Code>,{" "}
          <Code>border-line</Code>, <Code>text-accent</Code>. No CSS files per
          component, no raw hex values.
        </p>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">How it works</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Mobile-first: unprefixed classes apply everywhere, and{" "}
            <Code>sm:</Code> overrides them from 640px up. The tiles are a
            single column by default and a row on wider screens.
          </li>
          <li>
            Token utilities read CSS variables, so dark mode is just a variable
            override under <Code>prefers-color-scheme</Code> — the same classes
            work in both schemes.
          </li>
          <li>
            Reusable pieces (<Code>Stat</Code>) carry the spacing and type
            decisions once, so a page stays consistent as it grows.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-ink">Gotchas</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Code>sm:</Code> means "at least 640px", not "small screens". The
            prefix names the breakpoint where the style starts applying.
          </li>
          <li>
            A raw colour like <Code>text-[#333]</Code> bypasses the tokens and
            stays put in dark mode. Prefer the token utilities.
          </li>
          <li>
            Accessibility basics are part of styling: keep heading order (
            <Code>h1 → h2 → h3</Code>), label the landmarks, check contrast, and
            give keyboard users a visible <Code>focus-visible</Code> ring like
            the link in the demo.
          </li>
        </ul>
      </section>
    </div>
  );
}
