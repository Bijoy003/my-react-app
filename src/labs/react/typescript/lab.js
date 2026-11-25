import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "typescript",
  track: "react",
  order: 19,
  level: "typescript",
  title: "TypeScript with React",
  summary:
    "Type props, state, events and API responses once, then let the editor catch mistakes in the member directory feature.",
  Demo,
  Notes,
};
