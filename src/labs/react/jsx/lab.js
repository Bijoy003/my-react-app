import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "jsx",
  track: "react",
  order: 1,
  level: "core",
  title: "JSX",
  summary:
    "Markup that lives inside JavaScript: braces for values, attributes for props, and a fragment when one root is not enough.",
  Demo,
  Notes,
};
