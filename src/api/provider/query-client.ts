// Query Imports
import { QueryClient, DefaultOptions } from "@tanstack/react-query";

// Persist Imports
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

// ** QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: queries(),
    mutations: mutations(),
  },
});

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

// ** Persist
const storage = globalThis.sessionStorage;
const persister = createSyncStoragePersister({ storage });
persistQueryClient({ queryClient, persister });

// ** Config
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
