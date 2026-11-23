export default function Field({ id, label, error, children }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
