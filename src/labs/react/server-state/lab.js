import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "server-state",
  track: "react",
  order: 17,
  level: "data",
  title: "Server state with TanStack Query",
  summary:
    "Cache server data with useQuery, mutate it with useMutation, and invalidate the cache so every view refetches the truth.",
  Demo,
  Notes,
};
