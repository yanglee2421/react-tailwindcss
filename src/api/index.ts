import {
  QueryClient,
  DefaultOptions,
  QueryCache,
  MutationCache,
} from "react-query";

export { QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {
    queries: queries(),
    mutations: mutations(),
  },
});

function queries(): DefaultOptions["queries"] {
  return {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retryDelay(attemptIndex) {
      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },
  };
}

function mutations(): DefaultOptions["mutations"] {
  return {};
}
