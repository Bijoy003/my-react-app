import { useState } from "react";
import { EMPTY, validate } from "./validate";

function Field({ id, label, type = "text", value, error, onChange }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Demo() {
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [enrolled, setEnrolled] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    // Clear the error as soon as the user edits the field again.
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setEnrolled(fields.name.trim());
      setFields(EMPTY);
    }
  }

  if (enrolled) {
    return (
      <div className="space-y-4">
        <p role="status" className="text-sm text-ink">
          Enrolled — welcome, {enrolled}.
        </p>
        <button
          type="button"
          onClick={() => setEnrolled(null)}
          className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
        >
          Enrol someone else
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-sm space-y-4">
      <Field
        id="name"
        label="Name"
        value={fields.name}
        error={errors.name}
        onChange={handleChange}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        value={fields.email}
        error={errors.email}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Enrol
      </button>
    </form>
  );
}
