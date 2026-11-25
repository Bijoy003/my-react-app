import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "use-and-ref-props",
  track: "react",
  order: 12,
  level: "hooks",
  title: "use() and ref props",
  summary:
    "use() reads a promise during render under Suspense, and React 19 passes refs as plain props — no forwardRef wrapper needed.",
  Demo,
  Notes,
};
