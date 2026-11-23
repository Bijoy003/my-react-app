import { z } from "zod";

// One schema holds every rule. The resolver turns these into field errors;
// a server could reuse the same shape (or a shared package) later.
export const enrolSchema = z.object({
  name: z.string().trim().min(2, "Enter at least two characters."),
  email: z.email("Enter a valid email address."),
  age: z.coerce
    .number({ error: "Age must be a number." })
    .int("Use a whole number.")
    .min(16, "You must be 16 or older."),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    error: "Choose a level.",
  }),
});
