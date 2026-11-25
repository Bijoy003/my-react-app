import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "conditional-rendering",
  track: "react",
  order: 5,
  level: "core",
  title: "Conditional rendering",
  summary:
    "Show one element, hide another, or opt out entirely — with a ternary, && or an early return.",
  Demo,
  Notes,
};
