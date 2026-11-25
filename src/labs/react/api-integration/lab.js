import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "api-integration",
  track: "react",
  order: 16,
  level: "data",
  title: "API integration",
  summary:
    "Fetch a list, model loading, error and empty states, then keep it in sync through create, update and delete requests.",
  Demo,
  Notes,
};
