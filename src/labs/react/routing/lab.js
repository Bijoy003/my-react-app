import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "routing",
  track: "react",
  order: 14,
  level: "routing",
  title: "Routing fundamentals",
  summary:
    "Route tables, nested layouts with Outlet, URL parameters, search params, and Link vs useNavigate — read live from the app's own router.",
  Demo,
  Notes,
};
