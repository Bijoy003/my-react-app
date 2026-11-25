import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "suspense-boundaries",
  track: "react",
  order: 26,
  level: "quality",
  title: "Suspense and error boundaries",
  summary:
    "Show a loading fallback while code or data arrives, and keep a rendering failure inside one panel instead of blanking the page.",
  Demo,
  Notes,
};
