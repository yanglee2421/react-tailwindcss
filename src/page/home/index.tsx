import style from "./home.module.scss";
import { Card, Form, Layout } from "antd";
import {
  Counter as CounterCard,
  DarkSwitch as DS,
  JokeCard as Joke,
  RouteCard as RouterC,
  SignOut as sobtn,
  BingCard as BCard,
} from "@/component";
import { useClass } from "@/hook";
import React from "react";
const cx = useClass(style);
const Counter = React.memo(CounterCard);
const JokeCard = React.memo(Joke);
const DarkSwitch = React.memo(DS);
const RouteCard = React.memo(RouterC);
const SignOut = React.memo(sobtn);
const BingCard = React.memo(BCard);
/**
 * 首页
 * @returns JSX
 */
export function PageHome() {
  return (
    <Layout className={cx("home p-1")}>
      <BingCard />
      <JokeCard />
      <Counter />
      <RouteCard title="RouteCard" />
      <Card title="ThemeCard">
        <Form>
          <Form.Item label="夜间模式">
            <DarkSwitch />
          </Form.Item>
          <Form.Item label="登出按钮">
            <SignOut type="primary" danger />
          </Form.Item>
        </Form>
      </Card>
      <Card></Card>
      <Card></Card>
    </Layout>
  );
}
export default React.memo(PageHome);
