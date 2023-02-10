import style from "./style.module.scss";
import React, {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClass, useObject } from "@/hook";
import { useQuery } from "react-query";
import { getJoke } from "@/api/api-demo";
import { Button } from "antd";

export function PageDemo() {
  const cx = useClass(style);
  const { data, isFetching, refetch } = useQuery("joke", getJoke, {
    staleTime: 60000,
  });
  return (
    <div className={cx("box")}>
      <div className={cx("grid")}>
        <Button onClick={() => refetch()} type="primary">
          下一条
        </Button>
      </div>
      <div className={cx("light")}>{isFetching ? "loading" : data?.rows}</div>
      <div className={cx("dark")}>{isFetching ? "loading" : data?.rows}</div>
    </div>
  );
}
export default React.memo(PageDemo);
