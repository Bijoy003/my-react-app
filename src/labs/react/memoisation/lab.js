import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "memoisation",
  track: "react",
  order: 10,
  level: "hooks",
  title: "Memoisation",
  summary:
    "useMemo caches a value, useCallback a function identity, memo a component's render — performance hints you can switch on and off and measure.",
  Demo,
  Notes,
};
