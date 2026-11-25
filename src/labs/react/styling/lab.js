import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "styling",
  track: "react",
  order: 7,
  level: "core",
  title: "Responsive styling",
  summary:
    "Build a responsive page from reusable pieces with Tailwind utilities and the lab's design tokens — no raw colours, no dark: classes.",
  Demo,
  Notes,
};
