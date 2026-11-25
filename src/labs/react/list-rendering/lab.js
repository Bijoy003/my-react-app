import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "list-rendering",
  track: "react",
  order: 6,
  level: "core",
  title: "List rendering",
  summary:
    "Turn an array into elements with map(), give every item a stable key, and filter the data before it reaches JSX.",
  Demo,
  Notes,
};
