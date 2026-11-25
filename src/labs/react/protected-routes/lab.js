import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "protected-routes",
  track: "react",
  order: 15,
  level: "routing",
  title: "Protected routes",
  summary:
    "A guard component redirects signed-out visitors to sign-in, remembers where they were heading, and sends them back after sign-in.",
  Demo,
  Notes,
};
