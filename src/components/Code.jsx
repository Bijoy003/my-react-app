export default function Code({ children }) {
  return (
    <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
      {children}
    </code>
  );
}
