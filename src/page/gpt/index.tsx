import { useClass } from "@/hook";
import React from "react";
import style from "./style.module.scss";
import { Button, Card, Checkbox, Form, Input, Select, Tag } from "antd";

export function PageGpt() {
  const cx = useClass(style);
  return (
    <div className={cx("box")}>
      <main className={cx("box-main")}>
        <section className={cx("main-left")}>
          <h2>Left</h2>
          <Form layout="vertical">
            <Form.Item label="Description" rules={[{ required: true }]}>
              <Input.TextArea maxLength={3000} showCount />
            </Form.Item>
            <Form.Item label="Generate">
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item label="Keywords">
              <Tag>xxxx</Tag>
            </Form.Item>
            <Form.Item label="Languages">
              <Select />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </section>
        <section className={cx("main-right")}>
          <h2>Right</h2>
          <div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                aliquam nisi sunt eligendi perferendis iure commodi, voluptas
                dolor animi dolorem porro tenetur maxime expedita vitae!
                Veritatis sit iusto debitis odit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                aliquam nisi sunt eligendi perferendis iure commodi, voluptas
                dolor animi dolorem porro tenetur maxime expedita vitae!
                Veritatis sit iusto debitis odit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                aliquam nisi sunt eligendi perferendis iure commodi, voluptas
                dolor animi dolorem porro tenetur maxime expedita vitae!
                Veritatis sit iusto debitis odit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                aliquam nisi sunt eligendi perferendis iure commodi, voluptas
                dolor animi dolorem porro tenetur maxime expedita vitae!
                Veritatis sit iusto debitis odit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                aliquam nisi sunt eligendi perferendis iure commodi, voluptas
                dolor animi dolorem porro tenetur maxime expedita vitae!
                Veritatis sit iusto debitis odit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                aliquam nisi sunt eligendi perferendis iure commodi, voluptas
                dolor animi dolorem porro tenetur maxime expedita vitae!
                Veritatis sit iusto debitis odit.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default React.memo(PageGpt);
