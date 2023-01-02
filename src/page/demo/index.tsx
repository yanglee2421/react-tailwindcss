import { useClass } from "@/hook";
import { Card, Layout, Switch } from "antd";
import style from "./demo.module.scss";
import { Particle } from "@/component";
import Pclass from "@/component/Particle/class-particle";
const cn = useClass(style);
const Test = () => {
  return (
    <Layout>
      <Particle>
        <div
          style={{ height: "100vh" }}
          className="b"
        >
          <Card className="m-3"></Card>
          <Switch
            onChange={(e) => {
              e ? Pclass.animate() : Pclass.stopAnimate();
            }}
            defaultChecked
          ></Switch>
        </div>
      </Particle>
    </Layout>
  );
};
export default Test;
