export default function SlowPanel() {
  return (
    <p className="rounded-xl border border-accent/40 bg-accent/5 p-4 text-sm leading-relaxed">
      The panel arrived. In a real app this is where the chunk for a chart, a
      rich-text editor or a rarely opened tab would appear — code that the first
      screen should not have to download.
    </p>
  );
}
