import style from "./style.module.scss";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useStyle, useStructure } from "@/hook";
import { useQuery, useMutation } from "react-query";
import { getJoke } from "@/apis/api-demo";
import { Button, Space } from "antd";
import { request } from "@/apis/api-axios";
import { globalMod as obj } from "@/util";

export default function PageDemo() {
  const cx = useStyle(style);
  const [count, setCount] = useState(0);

  const [query, setQuery] = useStructure({
    name: "孙悟空",
    detail: { address: "花果山" },
  });
  const {
    // no data and is currently isFetching
    isLoading,
    // the query encountered an error
    isError,
    // the query was successful and data is available
    isSuccess,
    // the query is currently disabled
    isIdle,
    // in any state,the query is fetching
    isFetching,
    // if the query is in a success state,the data is available via this property
    data,
    // if the isError is true,the error is available via this property
    error,
    // loading|error|idle|success
    status,
    // refetch
    refetch,
  } = useQuery(["joke", { count }, query], getJoke, {
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    cacheTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: 1000 * 60,
    structuralSharing: false,
    isDataEqual: () => false,
  });

  return (
    <div className={cx("box")}>
      <div className={cx("grid")}>
        <Space>
          <Button onClick={() => refetch()} type="primary">
            下一条
          </Button>
          <Button onClick={() => setCount((prev) => prev + 1)} danger>
            {count}
          </Button>
          <Button
            onClick={() => setQuery((prev) => (prev.detail.address = "水帘洞"))}
            danger
          >
            {query.detail.address}
          </Button>
          <Button
            onClick={() =>
              request({
                url: "/get",
                params: { pid: "aaa" },
                data: { id: "xxx" },
                method: "get",
              })
            }
            danger
          >
            del
          </Button>
        </Space>
      </div>
      <div className={cx("light")}>{isFetching ? "loading" : data?.rows}</div>
      <div className={cx("dark")}>{isFetching ? "loading" : data?.rows}</div>
      <div className={cx("reseau")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
        debitis. Ex laudantium maiores dolorum corrupti aspernatur. Aliquid
        magni fuga quae dolores ipsa exercitationem! Odit quo rerum omnis
        consequatur excepturi sit?
      </div>
    </div>
  );
}
