import style from "./home.module.scss";
import { Button, Calendar, Card, Space } from "antd";
import { Counter, JokeCard, RouteCard, BingCard } from "@/component";
import { useClass } from "@/hook";
import React, { useContext, useState } from "react";
import { CtxAuth } from "@/stores";
import justHer from "@/assets/image/bg/justHer.jpg";
import snowBg from "@/assets/image/bg/snow.jpg";
import snowVillage from "@/assets/image/bg/snow-village.jpg";
import snowNight from "@/assets/image/bg/snow-night.jpg";

/**
 * 首页
 * @returns JSX
 */
export function PageHome() {
  const cx = useClass(style);

  const [cout, setCout] = useState(0);

  const { signOut } = useContext(CtxAuth);

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
        <Space>
          <Button onClick={() => setCout((prev) => prev + 1)}>+1</Button>
          <Button onClick={signOut} danger>
            Sign Out
          </Button>
        </Space>
      </Card>
      <RouteCard title="RouteCard"></RouteCard>
      <Counter />
      <Calendar fullscreen={false} />
      <Card></Card>
    </div>
  );
}

export default React.memo(PageHome);
