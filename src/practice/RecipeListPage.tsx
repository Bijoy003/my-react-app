import { useState } from "react";
import { Link } from "react-router-dom";
import { isOffline, setOffline } from "./api";
import { useRecipeList, useRecipeMutations } from "./useRecipes";

export default function RecipeListPage() {
  const [query, setQuery] = useState("");
  const [offline, setOfflineState] = useState(isOffline);
  const recipes = useRecipeList();
  const { remove } = useRecipeMutations();

  function toggleOffline() {
    const next = !offline;
    setOffline(next);
    setOfflineState(next);
    recipes.refetch();
  }

  if (recipes.isPending) {
    return (
      <p role="status" className="text-sm text-ink-muted">
        Loading recipes…
      </p>
    );
  }

  if (recipes.isError) {
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

  const needle = query.trim().toLowerCase();
  const visible = (recipes.data ?? []).filter(
    (recipe) =>
      !needle ||
      recipe.title.toLowerCase().includes(needle) ||
      recipe.level.includes(needle),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <label className="block max-w-sm text-xs text-ink-muted">
          Filter recipes
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
          />
        </label>

        <button
          type="button"
          onClick={toggleOffline}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            offline
              ? "border-accent bg-accent/10 text-accent"
              : "border-line text-ink-muted hover:border-accent hover:text-accent"
          }`}
        >
          {offline ? "Stop simulating a failure" : "Simulate a failure"}
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm leading-relaxed">
          No recipes match “{query}”.{" "}
          <Link to="/practice/new" className="text-accent hover:underline">
            Add one
          </Link>
          .
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((recipe) => (
            <li
              key={recipe.id}
              className="rounded-xl border border-line bg-surface p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <Link
                  to={`/practice/${recipe.id}`}
                  className="font-semibold text-ink hover:text-accent"
                >
                  {recipe.title}
                </Link>
                <button
                  type="button"
                  onClick={() => remove.mutate(recipe.id)}
                  disabled={remove.isPending}
                  aria-label={`Remove ${recipe.title}`}
                  className="shrink-0 text-xs text-ink-muted transition-colors hover:text-accent disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
              <p className="mt-2 text-xs text-ink-muted">
                {recipe.minutes} minutes · {recipe.level}
              </p>
              {recipe.notes && (
                <p className="mt-2 text-sm leading-relaxed">{recipe.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
