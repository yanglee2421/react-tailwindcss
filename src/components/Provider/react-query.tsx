import {
  QueryClient,
  QueryClientProvider,
  DefaultOptions,
} from "@tanstack/react-query";
import React from "react";

const client = new QueryClient({
  defaultOptions: {
    queries: queries(),
    mutations: mutations(),
  },
});

export function ClientProvider(props: React.PropsWithChildren) {
  const { children } = props;
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

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
