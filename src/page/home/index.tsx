import svgSrc from "@/assets/react.svg";
import useClass from "@/hook/useClass";
import { Row, Col, Divider, Switch, List, Button } from "antd";
import { useState } from "react";
import ReactFor from "@/test/react-for";
import ReactIf from "@/test/react-if";
import ReactSlot from "@/test/react-slot";
import style from "./home.module.scss";
const cN = useClass(style);
export default () => {
  const [chk, setChk] = useState(false);
  return (
    <div className={cN("home")}>
      <h1 className={cN("")}>首页</h1>
      <Divider>列表渲染</Divider>
      <ReactFor></ReactFor>
      <Divider>条件渲染\计数器更新案例</Divider>
      <Switch onChange={(e) => setChk(() => !chk)}></Switch>
      {!!chk && <ReactIf></ReactIf>}
      <Divider>falsy在模板上的渲染</Divider>
      <List bordered>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}>false：</Col>
            <Col span={8}>{false}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}>0：</Col>
            <Col span={8}>{0}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}>-0：</Col>
            <Col span={8}>{-0}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}>NaN：</Col>
            <Col span={8}>NaN会报红</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}>0n：</Col>
            <Col span={8}>模板不支持bigInt</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}>空串：</Col>
            <Col span={8}>{""}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}> undefined：</Col>
            <Col span={8}>{undefined}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}> null：</Col>
            <Col span={8}>{null}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row className={cN("w-100")}>
            <Col span={8}>{"{}"}：</Col>
            <Col span={8}>模板不支持对象</Col>
          </Row>
        </List.Item>
      </List>
      <Divider>React插槽</Divider>
      <ReactSlot>
        <Button type="primary">按钮01</Button>
        <Button danger>按钮02</Button>
        <Button danger>按钮03</Button>
        <ReactSlot.Item></ReactSlot.Item>
      </ReactSlot>
    </div>
  );
};
