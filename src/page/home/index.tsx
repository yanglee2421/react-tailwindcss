import style from "./home.module.scss";
import { Card, Form, Layout } from "antd";
import {
  BingBtn as bingBtn,
  Counter as CounterCard,
  DarkSwitch as DS,
  JokeCard as Joke,
  RouteCard as RouterC,
  SignOut as sobtn,
} from "@/component";
import { useClass } from "@/hook";
import React from "react";
const cx = useClass(style);
const Counter = React.memo(CounterCard);
const JokeCard = React.memo(Joke);
const BingBtn = React.memo(bingBtn);
const DarkSwitch = React.memo(DS);
const RouteCard = React.memo(RouterC);
const SignOut = React.memo(sobtn);
/**
 * 首页
 * @returns JSX
 */
export function PageHome() {
  return (
    <Layout className={cx("home p-1")}>
      <JokeCard />
      <RouteCard title="RouteCard" />
      <Card title="ThemeCard">
        <Form>
          <Form.Item label="夜间模式">
            <DarkSwitch />
          </Form.Item>
          <Form.Item label="登出按钮">
            <SignOut type="primary" danger />
          </Form.Item>
          <Form.Item label="必应壁纸">
            <BingBtn />
          </Form.Item>
        </Form>
      </Card>
      <Counter />
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </Layout>
  );
}
export default React.memo(PageHome);
