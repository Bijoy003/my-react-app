import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "form-validation",
  track: "react",
  order: 20,
  level: "forms",
  title: "Form validation with Zod",
  summary:
    "React Hook Form collects the values, a Zod schema owns the rules, and field-level errors stay wired to their inputs.",
  Demo,
  Notes,
};
