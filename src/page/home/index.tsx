import style from "./home.module.scss";
import { Card, Form } from "antd";
import {
  Counter as CounterCard,
  JokeCard as Joke,
  RouteCard as RouterC,
  SignOut as sobtn,
  BingCard as BCard,
} from "@/component";
import { useClass } from "@/hook";
import React, { useRef } from "react";
const cx = useClass(style);
const Counter = React.memo(CounterCard);
const JokeCard = React.memo(Joke);
const RouteCard = React.memo(RouterC);
const SignOut = React.memo(sobtn);
const BingCard = React.memo(BCard);
/**
 * 首页
 * @returns JSX
 */
export function PageHome() {
  const boxRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={boxRef} className={cx("home")}>
      <BingCard />
      <JokeCard />
      <Card title="ThemeCard">
        <Form>
          <Form.Item label="登出按钮">
            <SignOut type="primary" danger />
          </Form.Item>
        </Form>
      </Card>
      <RouteCard title="RouteCard" />
      <Counter />
      <Counter />
      <Card></Card>
      <Card></Card>
    </div>
  );
}
export default React.memo(PageHome);
