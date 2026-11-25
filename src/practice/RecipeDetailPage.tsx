import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipeList, useRecipeMutations } from "./useRecipes";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipes = useRecipeList();
  const { remove } = useRecipeMutations();
  const navigate = useNavigate();

  if (recipes.isPending) {
    return (
      <p role="status" className="text-sm text-ink-muted">
        Loading the recipe…
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

  const recipe = (recipes.data ?? []).find((item) => item.id === recipeId);

  if (!recipe) {
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

  const targetId = recipe.id;

  async function handleDelete() {
    try {
      await remove.mutateAsync(targetId);
      navigate("/practice");
    } catch {
      // The message below comes from the mutation's error state.
    }
  }

  return (
    <article className="max-w-xl space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-ink">{recipe.title}</h2>
        <p className="mt-1 text-xs text-ink-muted">
          {recipe.minutes} minutes · {recipe.level}
        </p>
      </header>

      {recipe.notes ? (
        <p className="text-sm leading-relaxed">{recipe.notes}</p>
      ) : (
        <p className="text-sm text-ink-muted">No notes yet.</p>
      )}

      {remove.isError && (
        <p role="alert" className="text-sm text-accent">
          {remove.error.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Link
          to={`/practice/${recipe.id}/edit`}
          className="rounded-lg bg-accent px-3 py-1.5 font-medium text-white transition-opacity hover:opacity-90"
        >
          Edit recipe
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={remove.isPending}
          className="rounded-lg border border-line px-3 py-1.5 font-medium text-ink-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {remove.isPending ? "Deleting…" : "Delete recipe"}
        </button>
        <Link
          to="/practice"
          className="px-2 py-1.5 text-ink-muted hover:text-accent"
        >
          Back to all recipes
        </Link>
      </div>
    </article>
  );
}
