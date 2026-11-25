import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Field from "./Field";
import { recipeSchema, type RecipeInput } from "./schema";
import { useRecipeList, useRecipeMutations } from "./useRecipes";

const LEVELS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink";

export default function RecipeFormPage() {
  const { id } = useParams();
  const editing = id !== undefined;
  const recipeId = editing ? Number(id) : null;
  const recipes = useRecipeList();
  const { create, update } = useRecipeMutations();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeInput>({
    resolver: zodResolver(recipeSchema),
    defaultValues: { title: "", minutes: 30, level: "easy", notes: "" },
    mode: "onTouched",
  });

  const recipe = editing
    ? (recipes.data ?? []).find((item) => item.id === recipeId)
    : undefined;

  // The list arrives after the form mounts when the page is opened directly,
  // so seed the fields once the recipe is in the cache.
  useEffect(() => {
    if (recipe) {
      reset({
        title: recipe.title,
        minutes: recipe.minutes,
        level: recipe.level,
        notes: recipe.notes,
      });
    }
  }, [recipe, reset]);

  async function submit(values: RecipeInput) {
    try {
      if (editing && recipeId !== null) {
        await update.mutateAsync({ id: recipeId, input: values });
        navigate(`/practice/${recipeId}`);
        return;
      }

      const created = await create.mutateAsync(values);
      navigate(`/practice/${created.id}`);
    } catch {
      // The mutation's message is rendered below; keep the typed values.
    }
  }

  if (editing && recipes.isPending) {
    return (
      <p role="status" className="text-sm text-ink-muted">
        Loading the recipe…
      </p>
    );
  }

  if (editing && recipes.isError) {
    return (
      <div
        role="alert"
        className="space-y-2 rounded-xl border border-accent/40 bg-accent/5 p-4 text-sm"
      >
        <p>{recipes.error.message}</p>
        <button
          type="button"
          onClick={() => recipes.refetch()}
          className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
        >
          Try again
        </button>
      </div>
    );
  }

  if (editing && !recipe) {
    return (
      <div className="space-y-3 text-sm">
        <h2 className="text-lg font-semibold text-ink">
          No recipe with that number.
        </h2>
        <Link to="/practice" className="text-accent hover:underline">
          Back to all recipes
        </Link>
      </div>
    );
  }

  const mutationError = create.error ?? update.error;
  const pending = create.isPending || update.isPending;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      className="max-w-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-ink">
        {editing ? "Edit recipe" : "New recipe"}
      </h2>

      <Field id="title" label="Title" error={errors.title?.message}>
        <input
          id="title"
          type="text"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
          className={inputClass}
          {...register("title")}
        />
      </Field>

      <Field id="minutes" label="Minutes" error={errors.minutes?.message}>
        <input
          id="minutes"
          type="number"
          inputMode="numeric"
          aria-invalid={Boolean(errors.minutes)}
          aria-describedby={errors.minutes ? "minutes-error" : undefined}
          className={inputClass}
          {...register("minutes", { valueAsNumber: true })}
        />
      </Field>

      <Field id="level" label="Difficulty" error={errors.level?.message}>
        <select
          id="level"
          aria-invalid={Boolean(errors.level)}
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

      <Field id="notes" label="Notes" error={errors.notes?.message}>
        <textarea
          id="notes"
          rows={4}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "notes-error" : undefined}
          className={inputClass}
          {...register("notes")}
        />
      </Field>

      {mutationError && (
        <p role="alert" className="text-sm text-accent">
          {mutationError.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : editing ? "Save changes" : "Add recipe"}
        </button>
        <Link
          to={editing ? `/practice/${recipeId}` : "/practice"}
          className="text-xs text-ink-muted hover:text-accent"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
