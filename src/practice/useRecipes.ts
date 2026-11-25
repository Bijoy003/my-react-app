import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecipe, deleteRecipe, listRecipes, updateRecipe } from "./api";
import type { RecipeInput } from "./schema";

const RECIPES_KEY = ["recipes"];

export function useRecipeList() {
  return useQuery({ queryKey: RECIPES_KEY, queryFn: listRecipes });
}

// Writes invalidate the list, so every view — list, detail, edit — reads the
// same fresh data instead of keeping its own copy.
export function useRecipeMutations() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: RECIPES_KEY });

  const create = useMutation({
    mutationFn: (input: RecipeInput) => createRecipe(input),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, input }: { id: number; input: RecipeInput }) =>
      updateRecipe(id, input),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
