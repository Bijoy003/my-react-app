import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "props",
  track: "react",
  order: 3,
  level: "core",
  title: "Props",
  summary:
    "Read-only inputs passed from parent to child. Destructure them, give them defaults, spread an object in, and send changes back up with a callback.",
  Demo,
  Notes,
};
