import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "zustand",
  track: "react",
  order: 18,
  level: "data",
  title: "Zustand stores",
  summary:
    "A small store outside React: actions and state together, selectors that limit re-renders, and no provider.",
  Demo,
  Notes,
};
