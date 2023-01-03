import { useClass } from "@/hook";
import { Card, Layout, Switch } from "antd";
import style from "./demo.module.scss";
import { Particle } from "@/component";
const cn = useClass(style);
const Test = () => {
  return (
    <Layout>
      <Particle>
        <div style={{ height: "100vh" }}>
          <Card className="m-3"></Card>
          <Switch defaultChecked></Switch>
        </div>
      </Particle>
    </Layout>
  );
};
export default Test;
