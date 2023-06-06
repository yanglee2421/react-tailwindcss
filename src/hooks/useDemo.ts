// @ts-nocheck
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

function query() {
  const queryClient = useQueryClient();

  queryClient.setQueryDefaults(["unique"], {
    async queryFn() {},
  });

  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    failureReason,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isPaused,
    isLoading,
    isLoadingError,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isInitialLoading,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: [],
    async queryFn() {
      return { name: "" };
    },
    cacheTime: 1000 * 60 * 5,
    enabled: true,
    networkMode: "online",
    initialData() {
      return { name: "" };
    },
    initialDataUpdatedAt: Date.now(),
    keepPreviousData: false,
    meta: {},
    notifyOnChangeProps: ["data"],
    placeholderData() {
      return { name: "" };
    },
    queryKeyHashFn(keys) {
      return keys.join();
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 3,
    retryOnMount: true,
    retryDelay: 1000 * 3,
    select(data) {
      return data;
    },
    staleTime: 0,
    structuralSharing: true,
    suspense: false,
    useErrorBoundary: false,
    //
    isDataEqual(oldData, newData) {
      return false;
    },
  });
}

function mutation() {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults(["unique"], {
    async mutationFn() {
      return "successly";
    },
  });
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation({
    // async mutationFn() {
    //   return {};
    // },
    cacheTime: Infinity,
    // mutationKey either-or mutationFn
    mutationKey: ["unique"],
    networkMode: "online",
    onError() {},
    onMutate() {},
    onSettled() {},
    onSuccess() {},
    retry: 3,
    retryDelay(attempt) {
      return Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000);
    },
    useErrorBoundary: false,
    meta: {},
  });
  useMutation((body: string) => fetch("/", { body }), {
    retry: 3,
    async onMutate(body) {
      await queryClient.cancelQueries(["unique"]);
      await queryClient.resumePausedMutations();
    },
    onSuccess(data) {
      queryClient.setQueryData(["todo", { id: 5 }], data);
    },
    onError() {},
    onSettled() {},
  });
}

async function client() {
  const queryClient = useQueryClient();

  // to in invalidateQueries
  queryClient.invalidateQueries({
    // queryKey either-or predicate
    // queryKey: [],
    predicate(query) {
      return query.queryKey.includes("unique");
    },
  });

  // to get/set queryData
  const data = queryClient.getQueryData(["todos"]);
  queryClient.setQueryData(["todos"], (prev: unknown) => Object.create(null));

  // to fetch
  await queryClient.prefetchQuery(["todos"], () => {});
  await queryClient.fetchQuery({ queryKey: ["todos"], queryFn() {} });
}

function infiniteQuery() {
  // 除以下独有API外，还支持useQuery上所有的API
  const { fetchNextPage, fetchPreviousPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["unique"], () => {}, {
      getNextPageParam(lastPage, pages) {},
      getPreviousPageParam(lastPage, pages) {},
      select(data) {
        return {
          pages: [...data.pages].reverse(),
          pageParams: [...data.pageParams].reverse(),
        };
      },
    });
}
