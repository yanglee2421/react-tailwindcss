import { Button, ButtonProps } from "antd";
import { useBingQuery } from "@/api/api-rtkq";
import { theme, useAppDispatch } from "@/redux";
import React, { useCallback } from "react";

export function BingBtn(props: ButtonProps) {
  const { children, ...restProps } = props;
  const { data } = useBingQuery();
  const dispatch = useAppDispatch();
  const btnClick = useCallback(() => {
    dispatch(theme.actions.actGalleryList((data?.isOk && data.rows) || []));
    dispatch(theme.actions.actGalleryIsShow(true));
  }, [data]);
  return (
    <Button {...restProps} onClick={btnClick}>
      {children || "必应壁纸"}
    </Button>
  );
}

BingBtn.Group = () => {
  return <></>;
};
