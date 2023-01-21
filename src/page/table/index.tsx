import style from "./table.module.scss";
import { Button, Form, Input, Layout, Pagination, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { usePwdQuery, usePwdDelMutation } from "@/api/api-rtkq";
import { useClass } from "@/hook";
import { Dialog } from "./component";
import React, { useEffect, useRef, useState } from "react";
import request from "@/api/api-axios";
const cn = useClass(style);
/**
 * 表格页面
 * @returns JSX
 */
export function PageTable() {
  const [req, setReq] = useState({
    pwd_site: "",
    pwd_username: "",
    page_index: 1,
    page_size: 20,
  });
  const [form] = Form.useForm();
  const resetBtn = () => {
    form.resetFields();
    console.log(form);
  };
  const { data } = usePwdQuery(req);
  const [delPwd] = usePwdDelMutation();
  const columns: ColumnsType<any> = [
    { title: "Id", dataIndex: "pwd_id", align: "center" },
    { title: "站点", dataIndex: "pwd_site", align: "center" },
    { title: "用户名", dataIndex: "pwd_username", align: "center" },
    { title: "密码", dataIndex: "pwd_pwd", align: "center" },
    {
      title: "操作",
      align: "center",
      render: (row: any) => (
        <Button
          onClick={() => {
            delPwd(row.pwd_id);
          }}
          type="link"
          danger
        >
          delete
        </Button>
      ),
    },
  ];
  const [scr, setScr] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    request({
      url: "http://localhost:3000/pwd",
    }).then((res) => {
      console.log(res);
    });
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
    <Layout className={cn("h-100 flex-column p-1")}>
      <Form
        form={form}
        onFinish={(formData) => {
          console.log(formData);
        }}
        layout="inline"
        className="between-center"
      >
        <div className="flex">
          <Form.Item label="站点" name="pwd_site">
            <Input
              value={req.pwd_site}
              onChange={(e) =>
                setReq((prev) => ({
                  ...prev,
                  pwd_site: e.target.value.trim(),
                }))
              }
            />
          </Form.Item>
          <Form.Item label="用户名">
            <Input
              value={req.pwd_username}
              onChange={(e) =>
                setReq((prev) => ({
                  ...prev,
                  pwd_username: e.target.value.trim(),
                }))
              }
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button onClick={resetBtn}>重置</Button>
        </Form.Item>
      </Form>
      <div className="my-1">
        <Button type="primary">添加</Button>
      </div>
      <div ref={divRef} className={cn("flex-1-hidden")}>
        <Table
          className="h-100"
          columns={columns}
          rowKey={(row) => row.user_id}
          dataSource={data?.rows}
          pagination={{ position: [], pageSize: 100 }}
          size="small"
          scroll={{ y: scr }}
          bordered
        />
      </div>
      <Pagination
        total={100}
        showTotal={(num) => `共${num}条`}
        showSizeChanger
        pageSizeOptions={["20", "50", "100"]}
        defaultPageSize={20}
        showQuickJumper
        onChange={(page, pageSize) =>
          setReq((prev) => ({ ...prev, page_index: page, page_size: pageSize }))
        }
        className="mt-1"
      />
      <Dialog></Dialog>
    </Layout>
  );
}

export default React.memo(PageTable);
