// React Imports
import React from "react";

// Antd Imports
import { Button, Divider, Form, Input, List, Skeleton } from "antd";

// Components Imports
import { Scrollbar } from "@/components";
import InfiniteScroll from "react-infinite-scroll-component";

export function Home() {
  const [count, setCount] = React.useState(0);
  const scrollId = React.useId();
  const listData = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(i);
    }
    return list;
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
          <Scrollbar id={scrollId}>
            <InfiniteScroll
              scrollableTarget={scrollId}
              dataLength={listData.length}
              hasMore={listData.length < 50}
              endMessage={<Divider>It is all, nothing more</Divider>}
              loader={<Skeleton active avatar paragraph={{ rows: 1 }} />}
              next={() => setCount((p) => p + 1)}
            >
              <List
                size="large"
                dataSource={listData}
                renderItem={(item) => {
                  return <List.Item key={item}>{item}</List.Item>;
                }}
              />
            </InfiniteScroll>
          </Scrollbar>
        </div>
      </div>
    </>
  );
}

interface FormValues {
  inputText: string;
}
