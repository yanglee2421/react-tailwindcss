// Components Imports
import { TodoList } from "./todo-list";
import { TodoList2 } from "./todo-list2";
import { Contact } from "./contact";

// Antd Imports
import { Row, Col } from "antd";

export function Demo() {
  return (
    <>
      <Row>
        <Col xs={24} sm={12}>
          <TodoList />
        </Col>
        <Col xs={24} sm={12}>
          <TodoList2 />
        </Col>
        <Col xs={24} sm={12}>
          <Contact />
        </Col>
      </Row>
    </>
  );
}
