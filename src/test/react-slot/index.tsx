import { Children, useEffect } from "react";
import { Card, Row, Col } from "antd";
function ReactSlot(props: any, context: any) {
  useEffect(() => {
    console.log(props, context);
  });
  return (
    <Card title="ReactSolt">
      <Row>
        <Col span={8}>{props.children[0]}</Col>
        <Col span={8}>{props.children[1]}</Col>
        <Col span={8}>{props.children[2]}</Col>
        <Col span={8}>
          {typeof props.children[3] === "function"
            ? props.children[3]("作用域插槽")
            : props.children[3] || "占位四"}
        </Col>
      </Row>
    </Card>
  );
}
ReactSlot.Item = function Item() {
  return <div>1122</div>;
};
export default ReactSlot;
