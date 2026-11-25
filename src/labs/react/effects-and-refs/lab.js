import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "effects-and-refs",
  track: "react",
  order: 9,
  level: "hooks",
  title: "Effects and refs",
  summary:
    "useEffect synchronises with the world outside React after render; useRef holds a mutable box that never triggers a re-render.",
  Demo,
  Notes,
};
