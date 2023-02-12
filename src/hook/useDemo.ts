import { useInfiniteQuery, useQuery, useMutation } from "react-query";
import { queryClient } from "@/api/react-query";

function fetchTodos() {
  return fetch("");
}

function mutation() {
  const {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isPaused,
    data,
    error,
    status,
    mutate,
    mutateAsync,
    reset,
  } = useMutation((body: any) => fetch("/", { body }), {
    retry: 3,
    async onMutate(body) {
      await queryClient.cancelQueries("unique");
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
    useInfiniteQuery("unique", fetchTodos, {
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
  await queryClient.prefetchQuery("todos", fetchTodos);
  const data = queryClient.getQueryData("todos");
  queryClient.setQueryData("todos", (prev: unknown) => data);
}

function query() {
  const {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data,
    error,
    status,
    isPreviousData,
    refetch,
  } = useQuery("unique", fetchTodos, {
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    cacheTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: 1000 * 60,
    structuralSharing: false,
    enabled: true,
    keepPreviousData: true,
    initialDataUpdatedAt: Date.now(),
    isDataEqual() {
      return false;
    },
    placeholderData() {
      return {};
    },
    initialData() {
      return {};
    },
  });
}
