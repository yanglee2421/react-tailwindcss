import { QueryClient, DefaultOptions } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: queries(),
    mutations: mutations(),
  },
});

function queries(): DefaultOptions<unknown>["queries"] {
  return {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retryDelay(attemptIndex) {
      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },
  };
}

function mutations(): DefaultOptions<unknown>["mutations"] {
  return {};
}
