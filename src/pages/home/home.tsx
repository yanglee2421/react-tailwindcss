// React Imports
import React from "react";

// Antd Imports
import { Button, Form, Input } from "antd";
import { Scrollbar } from "@/components";

export function Home() {
  const [count, setCount] = React.useState(0);
  const listEl = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(i);
    }
    return list.map((item) => {
      return (
        <li key={item} className="border border-solid p-3">
          {item}
        </li>
      );
    });
  }, [count]);

  // Form Hooks
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (data: FormValues) => {
    console.log(data);
    setCount((p) => p + 1);
  };

  return (
    <>
      <div className="flex flex-col h-96 gap-3">
        <Form form={form} onFinish={handleSubmit} layout="inline" size="large">
          <Form.Item name="inputText">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              submit
            </Button>
          </Form.Item>
        </Form>
        <div className="flex-1 overflow-hidden">
          <Scrollbar>
            <ul className="space-y-3">{listEl}</ul>
          </Scrollbar>
        </div>
      </div>
    </>
  );
}

interface FormValues {
  inputText: string;
}
