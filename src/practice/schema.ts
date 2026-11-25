import { z } from "zod";

// One schema owns the rules. React Hook Form turns them into field messages,
// and the TypeScript type is inferred from the same object.
export const recipeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Give the recipe a title of at least 3 characters."),
  minutes: z
    .number({ error: "Minutes must be a number." })
    .int("Use whole minutes.")
    .min(5, "At least 5 minutes.")
    .max(240, "Keep it under 4 hours."),
  level: z.enum(["easy", "medium", "hard"], {
    error: "Choose a difficulty.",
  }),
  notes: z.string().trim().max(240, "Keep the notes under 240 characters."),
});

export type RecipeInput = z.infer<typeof recipeSchema>;
