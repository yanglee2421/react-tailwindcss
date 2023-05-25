import {
  QueryClient,
  QueryClientProvider,
  DefaultOptions,
} from "@tanstack/react-query";
import React from "react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: queries(),
    mutations: mutations(),
  },
});

// QueryClient Default query & mutation
queryClient.setQueryDefaults(["unique"], {
  async queryFn() {
    return { msg: "hello world" };
  },
});
queryClient.setMutationDefaults(["post-demo"], {
  mutationFn() {
    return Promise.resolve({ msg: "successly" });
  },
});

// Persist queryClient by sessionStorage
const persister = createSyncStoragePersister({ storage: sessionStorage });
persistQueryClient({ queryClient, persister });

export function ReactQuery(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// QueryClient config
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
