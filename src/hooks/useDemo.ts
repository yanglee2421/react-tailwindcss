import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = useQueryClient();

function query() {
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
    queryFn() {
      return Promise.resolve({ name: "" });
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
    onError(err) {},
    onSettled(data, err) {},
    onSuccess(data) {},
    placeholderData() {
      return { name: "" };
    },
    // queryKeyHashFn either-or queryKey
    // queryKeyHashFn(keys) {
    //   return keys;
    // },
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
    async mutationFn() {
      return {};
    },
    cacheTime: Infinity,
    // mutationKey either-or mutationFn
    // mutationKey: "unique",
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

async function prefetchTodos() {
  await queryClient.prefetchQuery(["todos"], () => {});
  const data = queryClient.getQueryData(["todos"]);
  queryClient.setQueryData(["todos"], (prev: unknown) => data);
}
