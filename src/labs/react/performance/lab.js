import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "performance",
  track: "react",
  order: 23,
  level: "quality",
  title: "Practical performance",
  summary:
    "Measure a commit before changing it: capture a profile, cache the expensive filter, run the same interaction again and compare.",
  Demo,
  Notes,
};
