import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";

export function QueryProvider(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
