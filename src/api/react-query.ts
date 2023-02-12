import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retryDelay(attemptIndex) {
        return Math.min(1000 * 2 ** attemptIndex, 30000);
      },
    },
  },
});
