import style from "./style.module.scss";
import { useOutlet } from "react-router-dom";
import {
  Avatar,
  Button,
  Drawer,
  FloatButton,
  Layout,
  Menu,
  MenuProps,
} from "antd";
import {
  BgColorsOutlined,
  BulbOutlined,
  BulbFilled,
  MenuOutlined,
  RocketOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useClass, useResize } from "@/hook";
import avatar from "@/assets/image/avatar.jpg";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector, actIsDark } from "@/redux";
const cx = useClass(style);
const items: MenuProps["items"] = [
  {
    key: 1,
    label: "首页",
    icon: <HomeOutlined />,
  },
];

export function PageLayout() {
  //   响应式布局
  const [vw, setVW] = useState(0);
  const resizeRef = useResize(({ width }) => setVW(width), []);
  const asider = useMemo(() => {
    if (vw < 576) return;
    return (
      <Layout.Sider collapsed={vw < 1200}>
        <Menu items={items} className={cx("h-100")} />
      </Layout.Sider>
    );
  }, [vw]);
  const footer = useMemo(() => {
    if (vw > 575) return;
    return (
      <Layout.Footer className={cx("box-ft")}>
        <Button
          type="link"
          danger
          href="mailto:yanglee2421@outlook.com?subject=有bug&body=出处"
        >
          联系作者
        </Button>
      </Layout.Footer>
    );
  }, [vw]);

  //   toTopBtn的显隐
  const cntRef = useRef<HTMLElement>(null);
  const [st, setST] = useState(0);
  const toTopHandler = useCallback(
    () => cntRef.current?.scroll({ top: 0, behavior: "smooth" }),
    [cntRef]
  );
  const toTopBtn = useMemo(() => {
    if (st === 0) return;
    return <FloatButton onClick={toTopHandler} icon={<RocketOutlined />} />;
  }, [st, toTopHandler]);

  //   悬浮按钮暗夜模式
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const darkHandler = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      e.stopPropagation();
      dispatch(actIsDark(!isDark));
    },
    [isDark]
  );
  const darkBtn = useMemo(() => {
    return (
      <FloatButton
        onClick={darkHandler}
        icon={isDark ? <BulbOutlined /> : <BulbFilled />}
        type={isDark ? "primary" : "default"}
      ></FloatButton>
    );
  }, [isDark, darkHandler]);

  //   抽屉
  const [isDrawer, setIsDrawer] = useState(false);
  const drawer = useMemo(() => {
    return (
      <Drawer
        open={isDrawer}
        onClose={() => setIsDrawer((prev) => !prev)}
        placement={vw < 576 ? "top" : "left"}
        closeIcon={<MenuOutlined />}
      ></Drawer>
    );
  }, [isDrawer, vw]);

  // 根据outlet生成content
  const outlet = useOutlet();
  const scHandler = useCallback(
    () => setST(cntRef.current?.scrollTop || 0),
    [cntRef]
  );
  const cnt = useMemo(() => {
    return (
      <Layout.Content
        ref={cntRef}
        onScroll={scHandler}
        className={cx("box-cnt")}
      >
        {outlet}
      </Layout.Content>
    );
  }, [outlet, scHandler]);
  return (
    <>
      {drawer}
      <Layout ref={resizeRef} className={cx("box")}>
        <Layout.Header className={cx("box-hd")}>
          <MenuOutlined onClick={() => setIsDrawer(true)} />
          <Avatar src={avatar} size={36}></Avatar>
        </Layout.Header>
        <Layout>
          {asider}
          {cnt}
        </Layout>
        {footer}
      </Layout>
      <FloatButton.Group
        trigger="click"
        icon={<BgColorsOutlined />}
        type="primary"
      >
        {toTopBtn}
        {darkBtn}
      </FloatButton.Group>
    </>
  );
}
export default React.memo(PageLayout);
