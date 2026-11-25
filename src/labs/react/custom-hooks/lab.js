import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "custom-hooks",
  track: "react",
  order: 25,
  level: "hooks",
  title: "Custom hooks",
  summary:
    "Extract reusable behaviour into a function that starts with use. Two cards share the logic, keep separate state, and survive a reload.",
  Demo,
  Notes,
};
