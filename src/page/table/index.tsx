import { useClass } from "@/hook";
import style from "./table.module.scss";
import { Button, Form, Input, Pagination, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQueryAuthQuery, useDelMutation } from "@/api/rtkq/authApi";
import { useEffect, useRef, useState } from "react";
const cn = useClass(style);
export default () => {
  const { data } = useQueryAuthQuery(false);
  const [del, delRes] = useDelMutation();
  const columns: ColumnsType<any> = [
    { title: "Id", dataIndex: "user_id", align: "center", width: 100 },
    { title: "用户名", dataIndex: "user_name", align: "center", width: 100 },
    { title: "密码", dataIndex: "user_pwd", align: "center", width: 100 },
    {
      title: "操作",
      align: "center",
      render: (row: any) => (
        <Button
          onClick={() => {
            del(row.user_id);
          }}
          danger
        >
          delete
        </Button>
      ),
    },
  ];
  const arr = [];
  for (let i = 0; i < 1000; i++) {
    arr.push({ user_id: i });
  }
  const [scr, setScr] = useState(700);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new ResizeObserver(
      ([
        {
          contentRect: { height },
        },
      ]) => {
        setScr((prev) => height - 40);
      }
    );
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
      observer.disconnect();
    };
  }, []);
  return (
    <div className={cn("h-100 flex-column p-1")}>
      <Form layout="inline">
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>
      <div className="my-1">
        <Button>按钮</Button>
      </div>
      <div
        ref={divRef}
        className={cn("flex-1-hidden")}
      >
        <Table
          className="h-100"
          columns={columns}
          rowKey={(row) => row.user_id}
          dataSource={arr}
          pagination={{ position: [], pageSize: 100 }}
          size="small"
          scroll={{ y: scr }}
          bordered
        ></Table>
      </div>
      <Pagination
        className="pt-1"
        total={100}
        showTotal={(num) => `共${num}条`}
        showSizeChanger
        showQuickJumper
      ></Pagination>
    </div>
  );
};
