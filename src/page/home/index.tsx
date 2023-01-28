import style from "./home.module.scss";
import { Button, Card } from "antd";
import { Counter, JokeCard, RouteCard, SignOut, BingCard } from "@/component";
import { useClass } from "@/hook";
import React, { useState } from "react";
import justHer from "@/assets/image/justHer.jpg";
import snowBg from "@/assets/image/snow-bg.jpg";
import snowVillage from "@/assets/image/snow-village.jpg";
import snowNight from "@/assets/image/snow-night.jpg";
const cx = useClass(style);

/**
 * 首页
 * @returns JSX
 */
export function PageHome() {
  const [cout, setCout] = useState(0);

  return (
    <div className={cx("home")}>
      <BingCard />
      <Card hoverable cover={<img src={justHer} />}>
        <Card.Meta description="This is description" />
      </Card>
      <Card hoverable cover={<img src={snowBg} />}>
        <Card.Meta description="This is description" />
      </Card>
      <Card hoverable cover={<img src={snowVillage} />}>
        <Card.Meta description="This is description" />
      </Card>
      <Card hoverable cover={<img src={snowNight} />}>
        <Card.Meta description="This is description" />
      </Card>
      <JokeCard />
      <Counter />
      <Card title={cout}>
        <Button onClick={() => setCout((prev) => prev + 1)}>+1</Button>
      </Card>
      <RouteCard title="RouteCard">
        <SignOut type="primary" danger />
      </RouteCard>
      <Counter />
    </div>
  );
}

export default React.memo(PageHome);
