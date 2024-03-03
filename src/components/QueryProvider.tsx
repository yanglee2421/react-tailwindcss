// Query Imports
import { QueryClient, DefaultOptions } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

export function QueryProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: queries(),
    mutations: mutations(),
  },
});

// Persist client
const persister = createAsyncStoragePersister({
  storage: globalThis.sessionStorage,
  key: import.meta.env.VITE_QUERY_PERSISTER_KEY,
});

// Client configuration
function queries(): DefaultOptions["queries"] {
  return {
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 2,

    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,

    retryDelay(attemptIndex) {
      return Math.min(1000 * 2 ** attemptIndex, 1000 * 8);
    },
  };
}

function mutations(): DefaultOptions["mutations"] {
  return {};
}

// ** Defaults
queryClient.setQueryDefaults(["unique"], {
  async queryFn() {
    return { msg: "hello world" };
  },
});
queryClient.setMutationDefaults(["post-demo"], {
  async mutationFn() {
    return { msg: "successly" };
  },
});
