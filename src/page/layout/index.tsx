import style from "./style.module.scss";
import { useOutlet } from "react-router-dom";
import { Avatar, Drawer, FloatButton, Layout, Menu } from "antd";
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
import React, { useCallback, useRef, useState } from "react";
import { useAppDispatch, useAppSelector, actIsDark } from "@/redux";
const cx = useClass(style);
export function PageLayout() {
  const outlet = useOutlet();
  //   响应式布局
  const [vw, setVW] = useState(0);
  const resizeRef = useResize(({ width }) => setVW((prev) => width), []);
  //   toTopBtn的显隐
  const ctxRef = useRef<HTMLElement>(null);
  const [st, setST] = useState(0);
  const scHandler = useCallback(
    () => setST((prev) => ctxRef.current?.scrollTop || 0),
    [ctxRef]
  );
  const btnToTop = useCallback(
    () => ctxRef.current?.scroll({ top: 0, behavior: "smooth" }),
    [ctxRef]
  );
  //   悬浮按钮暗夜模式
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const btnDark = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      e.stopPropagation();
      dispatch(actIsDark(!isDark));
    },
    [isDark]
  );
  //   抽屉
  const [isDrawer, setIsDrawer] = useState(false);
  return (
    <>
      <Layout ref={resizeRef} className={cx("box")}>
        <Layout.Header className={cx("flex between-center bgc-danger")}>
          <MenuOutlined onClick={() => setIsDrawer(true)} />
          <Avatar src={avatar} size={36}></Avatar>
        </Layout.Header>
        <Layout>
          {vw < 576 || (
            <Layout.Sider collapsed={vw < 1200}>
              <Menu
                items={[
                  {
                    key: 1,
                    label: "home",
                    icon: <HomeOutlined />,
                  },
                ]}
                className={cx("h-100")}
              ></Menu>
            </Layout.Sider>
          )}
          <Layout.Content
            ref={ctxRef}
            onScroll={scHandler}
            className={cx("overflow-auto p-1")}
          >
            {outlet}
          </Layout.Content>
        </Layout>
        {vw < 576 && <Layout.Footer>底</Layout.Footer>}
      </Layout>
      <FloatButton.Group
        trigger="click"
        icon={<BgColorsOutlined />}
        type="primary"
      >
        {st !== 0 && (
          <FloatButton
            onClick={btnToTop}
            icon={<RocketOutlined />}
          ></FloatButton>
        )}
        <FloatButton
          onClick={btnDark}
          icon={isDark ? <BulbOutlined /> : <BulbFilled />}
          type={isDark ? "primary" : "default"}
        ></FloatButton>
      </FloatButton.Group>
      <Drawer
        open={isDrawer}
        onClose={() => setIsDrawer((prev) => !prev)}
        placement={vw < 576 ? "top" : "left"}
        closeIcon={<MenuOutlined />}
      ></Drawer>
    </>
  );
}
export default React.memo(PageLayout);
