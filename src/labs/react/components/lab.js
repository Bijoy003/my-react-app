import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "components",
  track: "react",
  order: 2,
  level: "core",
  title: "Functional components",
  summary:
    "A component is a function that returns markup. Capitalise its name so JSX calls the function instead of asking for an HTML tag.",
  Demo,
  Notes,
};
