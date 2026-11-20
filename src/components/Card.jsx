// Composition: the `children` prop lets the caller decide what goes inside.
// The optional `title` shows how a prop can switch part of the markup on.
export default function Card({ title, className = "", children }) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface p-6 ${className}`}
    >
      {title && (
        <h3 className="mb-2 text-lg font-semibold text-ink">{title}</h3>
      )}
      {children}
    </div>
  );
}
