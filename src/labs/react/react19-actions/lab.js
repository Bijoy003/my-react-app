import { lazy } from "react";

// Each lesson's demo and notes load on demand, so the shell does not pay
// for every topic at startup. The registry still reads this metadata eagerly.
const Demo = lazy(() => import("./Demo"));
const Notes = lazy(() => import("./Notes"));

export default {
  id: "react19-actions",
  track: "react",
  order: 11,
  level: "hooks",
  title: "Actions and optimistic UI",
  summary:
    "React 19 forms: useActionState runs an async action, useFormStatus reports pending, and useOptimistic shows the result before the server agrees.",
  Demo,
  Notes,
};
