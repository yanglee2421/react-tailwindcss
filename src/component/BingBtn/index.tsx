import { Button, ButtonProps } from "antd";
import { useBingQuery } from "@/api/api-rtkq";
import { actGalleryIsShow, actGalleryList, useAppDispatch } from "@/redux";
import React, { useCallback } from "react";
/**
 * 打开必应壁纸画廊
 * @param props 同 ButtonProps
 * @returns JSX
 */
export function BingBtn(props: ButtonProps) {
  const { children, ...restProps } = props;
  const { data } = useBingQuery();
  const dispatch = useAppDispatch();
  const btnClick = useCallback(() => {
    dispatch(actGalleryList((data?.isOk && data.rows) || []));
    dispatch(actGalleryIsShow(true));
  }, [data]);
  return (
    <Button {...restProps} onClick={btnClick}>
      {children || "必应壁纸"}
    </Button>
  );
}
