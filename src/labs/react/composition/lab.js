import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "composition",
  track: "react",
  order: 4,
  level: "core",
  title: "Composition",
  summary:
    "Build bigger components by nesting smaller ones. `children` fills the body, named props carry extra slots, and none of it needs inheritance.",
  Demo,
  Notes,
};
