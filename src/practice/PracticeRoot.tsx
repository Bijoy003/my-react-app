import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import PracticeLayout from "./PracticeLayout";

export default function PracticeRoot() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10_000,
            // One retry keeps a fake failure visible quickly; production
            // defaults are three retries with exponential backoff.
            retry: 1,
            retryDelay: 300,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PracticeLayout />
    </QueryClientProvider>
  );
}
