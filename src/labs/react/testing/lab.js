import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "testing",
  track: "react",
  order: 21,
  level: "quality",
  title: "Testing",
  summary:
    "Render a component, query it by role, drive real clicks and typing, and mock the API to cover loading, success and error states.",
  Demo,
  Notes,
};
