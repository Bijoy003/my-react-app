import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "accessibility",
  track: "react",
  order: 22,
  level: "quality",
  title: "Accessibility fundamentals",
  summary:
    "Semantic elements, real labels, a keyboard-operated tab list and feedback a screen reader can hear — then an audit of this app.",
  Demo,
  Notes,
};
