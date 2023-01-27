import style from "./home.module.scss";
import { Button, Card, Form, Layout } from "antd";
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
  const boxRef = useRef<HTMLElement>(null);
  return (
    <Layout ref={boxRef} className={cx("home p-1 h-100 overflow-auto")}>
      <BingCard />
      <JokeCard />
      <Counter />
      <RouteCard title="RouteCard" />
      <Card title="ThemeCard">
        <Form>
          <Form.Item label="登出按钮">
            <SignOut type="primary" danger />
          </Form.Item>
        </Form>
      </Card>
      <Card></Card>
      <Card>
        <Button
          onClick={() => boxRef.current?.scroll({ top: 0, behavior: "smooth" })}
        >
          toTop
        </Button>
      </Card>
    </Layout>
  );
}
export default React.memo(PageHome);
