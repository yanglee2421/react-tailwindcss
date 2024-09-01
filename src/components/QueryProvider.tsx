import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function QueryProvider(props: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 2,

      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,

      retry: 1,
      retryDelay(attemptIndex) {
        return Math.min(1000 * 2 ** attemptIndex, 1000 * 8);
      },
    },
  },
});
