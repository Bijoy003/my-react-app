export type RecipeLevel = "easy" | "medium" | "hard";

export interface Recipe {
  id: number;
  title: string;
  minutes: number;
  level: RecipeLevel;
  notes: string;
}
