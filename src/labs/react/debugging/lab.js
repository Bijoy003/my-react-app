import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "debugging",
  track: "react",
  order: 24,
  level: "quality",
  title: "Debugging and developer tools",
  summary:
    "Reproduce, observe, isolate, fix, verify. Start with a prepared bug that empties an input, then learn the browser and React DevTools that find it.",
  Demo,
  Notes,
};
