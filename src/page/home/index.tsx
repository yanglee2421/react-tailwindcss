import style from "./home.module.scss";
import { Button, Card, Form } from "antd";
import {
  Counter,
  JokeCard as Joke,
  RouteCard as RouterC,
  SignOut as sobtn,
  BingCard as BCard,
} from "@/component";
import { useClass } from "@/hook";
import React, { useMemo, useRef, useState } from "react";
const cx = useClass(style);
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
  const couter = useMemo(() => <Counter />, []);
  const [cout, setCout] = useState(0);

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
      {couter}
      {couter}
      <Card title={cout}>
        <Button onClick={() => setCout((prev) => prev + 1)}>+1</Button>
      </Card>
    </div>
  );
}
export default React.memo(PageHome);
