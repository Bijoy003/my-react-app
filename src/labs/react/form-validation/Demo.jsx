import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import { enrolSchema } from "./schema";

const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Demo() {
  const [saved, setSaved] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enrolSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", age: "", level: "beginner" },
  });

  async function submit(values) {
    // Stands in for a POST. The schema already checked the shape.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSaved(values);
    reset();
  }

  return (
    <div className="max-w-md space-y-4">
      {saved && (
        <p
          role="status"
          className="rounded-lg border border-accent/40 bg-accent/5 px-3 py-2 text-sm text-accent"
        >
          Enrolled {saved.name} on the {saved.level} track.
        </p>
      )}

      <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
        <Field id="name" label="Full name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
            {...register("name")}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
        </Field>

        <Field id="age" label="Age" error={errors.age?.message}>
          <input
            id="age"
            type="number"
            inputMode="numeric"
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? "age-error" : undefined}
            className={inputClass}
            {...register("age")}
          />
        </Field>

        <Field id="level" label="Starting level" error={errors.level?.message}>
          <select
            id="level"
            aria-describedby={errors.level ? "level-error" : undefined}
            className={inputClass}
            {...register("level")}
          >
            {LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Enrolling…" : "Enrol"}
        </button>
      </form>
    </div>
  );
}
