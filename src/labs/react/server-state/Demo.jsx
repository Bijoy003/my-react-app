import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskBoard from "./TaskBoard";

export default function Demo() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          // One quick retry keeps the failure demo snappy; production defaults
          // are three retries with exponential backoff.
          queries: { staleTime: 10_000, retry: 1, retryDelay: 300 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TaskBoard />
    </QueryClientProvider>
  );
}
