import style from "./demo.module.scss";
import { Avatar, Button, Drawer, FloatButton, Layout, List, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  BgColorsOutlined,
  RocketOutlined,
  ChromeOutlined,
  ExperimentOutlined,
  GithubOutlined,
  HomeOutlined,
  MenuOutlined,
  UserOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import avatar from "@/assets/image/avatar.jpg";
import { useClass, useResize } from "@/hook";
import { useAppSelector, useAppDispatch, actIsDark } from "@/redux";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate, useOutlet } from "react-router";
const cx = useClass(style);
/**
 * Demo 页面
 * @returns JSX
 */
export function PageDemo() {
  const navigate = useNavigate();
  const items = useMemo<MenuProps["items"]>(
    () => [
      {
        label: "首页",
        icon: <HomeOutlined />,
        key: "home",
        onClick: () => navigate("/"),
      },
      {
        icon: <ExperimentOutlined />,
        label: "实验中",
        key: "experiment",
        children: [
          { label: "show", key: "show", onClick: () => navigate("/show") },
          { label: "table", key: "demo", onClick: () => navigate("/table") },
        ],
      },
      { label: "重要的", icon: <SketchOutlined />, key: "favorite" },
      {
        label: "已发布",
        icon: <GithubOutlined />,
        key: "github",
        children: [
          {
            label: "粒子特效",
            key: "particle",
            onClick: () => navigate("/particle"),
          },
        ],
      },
    ],
    []
  );
  const [isDrawer, setIsDrawer] = useState(false);
  const [vw, setVW] = useState(0);
  const resizeRef = useResize(({ width }) => {
    setVW(width);
  }, []);
  const outlet = useOutlet();
  const isDark = useAppSelector((store) => store.theme.isDark);
  const dispatch = useAppDispatch();
  const mainRef = useRef<HTMLElement>(null);
  const toTop = useCallback(() => {
    const root = mainRef.current;
    if (!root) return;
    if (root.scrollTop === 0) return;
    requestAnimationFrame(toTop);
    root.scrollTop -= 20;
  }, [mainRef]);
  return (
    <>
      <Layout ref={resizeRef} className="h-100">
        <Layout.Header>
          <div className="h-100 w-100 flex between-center">
            <Button
              onClick={() => setIsDrawer((prev) => !prev)}
              icon={<MenuOutlined />}
              type="ghost"
            />
            <Avatar size={36} icon={<UserOutlined />} src={avatar} />
          </div>
        </Layout.Header>
        <Layout>
          {/* {vw < 768 || (
            <Layout.Sider collapsed={vw < 1200}>
              <Menu items={items} mode="inline" className="h-100" />
            </Layout.Sider>
          )} */}
          <Layout.Content ref={mainRef} className="overflow-auto">
            {outlet}
          </Layout.Content>
        </Layout>
      </Layout>
      <Drawer
        open={isDrawer}
        onClose={() => setIsDrawer((prev) => !prev)}
        placement="left"
        closeIcon={<MenuOutlined />}
      >
        <List>
          <List.Item>1111</List.Item>
          <List.Item>1111</List.Item>
          <List.Item>1111</List.Item>
          <List.Item>1111</List.Item>
        </List>
      </Drawer>
      <FloatButton.Group
        icon={<ChromeOutlined />}
        trigger="click"
        style={{ right: 24 }}
      >
        <FloatButton onClick={toTop} icon={<RocketOutlined />} />
        <FloatButton
          onClick={() => dispatch(actIsDark(!isDark))}
          type={isDark ? "primary" : "default"}
          icon={<BgColorsOutlined />}
        />
      </FloatButton.Group>
    </>
  );
}

export default React.memo(PageDemo);
