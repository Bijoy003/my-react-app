import Demo from "./Demo";
import Notes from "./Notes";

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
