import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "state-events-forms",
  track: "react",
  order: 8,
  level: "core",
  title: "State, events and forms",
  summary:
    "useState gives a component memory, controlled inputs let React own the value, and a submit handler turns keystrokes into feedback.",
  Demo,
  Notes,
};
