// Components Imports
import { TodoList } from "./todo-list";
import { TodoList2 } from "./todo-list2";
import { Contact } from "./contact";
import { Form } from "./form";

// Antd Imports
import { Row, Col, Card, Typography } from "antd";

export function Demo() {
  return (
    <div className="p-4">
      <Typography.Title>React Docs No Effect</Typography.Title>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Card>
            <TodoList />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <TodoList2 />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Contact />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Form />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
