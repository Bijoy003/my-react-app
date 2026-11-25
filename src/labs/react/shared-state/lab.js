import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "shared-state",
  track: "react",
  order: 13,
  level: "hooks",
  title: "Shared state",
  summary:
    "Lift state above the components that need it and pass callbacks down — or skip the drilling with Context and useReducer.",
  Demo,
  Notes,
};
