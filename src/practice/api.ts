import type { Recipe } from "./types";

// A tiny in-memory server standing in for a REST API. It waits, can fail on
// demand, and returns copies so callers cannot mutate the "database".
const seed: Recipe[] = [
  {
    id: 1,
    title: "Lemon and thyme chicken",
    minutes: 45,
    level: "easy",
    notes: "Roast at 200°C. Rest for ten minutes before carving.",
  },
  {
    id: 2,
    title: "Mushroom risotto",
    minutes: 35,
    level: "medium",
    notes: "Keep the stock warm and add it one ladle at a time.",
  },
  {
    id: 3,
    title: "Miso aubergine",
    minutes: 25,
    level: "easy",
    notes: "Score the flesh, brush with miso glaze, grill until sticky.",
  },
  {
    id: 4,
    title: "Chocolate rye cookies",
    minutes: 30,
    level: "hard",
    notes: "Chill the dough overnight for a chewier centre.",
  },
];

let recipes: Recipe[] = seed.map((recipe) => ({ ...recipe }));
let nextId = seed.length + 1;
let offline = false;

export function setOffline(value: boolean) {
  offline = value;
}

export function isOffline() {
  return offline;
}

async function request<T>(produce: () => T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (offline) {
    throw new Error("The recipe service is offline. Turn the simulation off.");
  }
  return structuredClone(produce());
}

export function listRecipes() {
  return request(() => recipes);
}

export function createRecipe(input: Omit<Recipe, "id">) {
  return request(() => {
    const recipe: Recipe = { ...input, id: nextId };
    nextId += 1;
    recipes = [...recipes, recipe];
    return recipe;
  });
}

export function updateRecipe(id: number, input: Omit<Recipe, "id">) {
  return request(() => {
    const existing = recipes.find((recipe) => recipe.id === id);
    if (!existing) throw new Error(`No recipe with id ${id}.`);

    const updated: Recipe = { ...input, id };
    recipes = recipes.map((recipe) => (recipe.id === id ? updated : recipe));
    return updated;
  });
}

export function deleteRecipe(id: number) {
  return request(() => {
    recipes = recipes.filter((recipe) => recipe.id !== id);
    return { id };
  });
}
