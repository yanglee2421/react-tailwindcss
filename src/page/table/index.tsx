import style from "./table.module.scss";
import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Space,
  Table,
  TableProps,
} from "antd";
import { useClass, useObject, useResize } from "@/hook";
import React, { useMemo, useState } from "react";
import {
  usePwdDelMutation,
  usePwdQuery,
  usePwdSaveMutation,
} from "@/api/api-rtkq";

/**
 * 表格页面
 * @returns JSX
 */
export function PageTable() {
  const [query, setQuery] = useObject({
    page_index: 1,
    page_size: 20,
    pwd_site: "",
    pwd_username: "",
  });

  const { data, isFetching } = usePwdQuery(query);

  const queryHandler = (data: Partial<t.param>) =>
    setQuery((prev) => Object.assign(prev, data));

  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Dialog open={showDialog} onCancel={() => setShowDialog(false)} />
      <div className="flex-column">
        <Header onQuery={queryHandler} />
        <div className="my-1">
          <Button onClick={() => setShowDialog(true)}>add</Button>
        </div>
        <Main
          loading={isFetching}
          data={data}
          query={query}
          onQuery={queryHandler}
        />
      </div>
    </>
  );
}

export default React.memo(PageTable);

namespace t {
  export interface formData {
    pwd_site: string;
    pwd_username: string;
  }
  export interface param {
    page_index: number;
    page_size: number;
    pwd_site: string;
    pwd_username: string;
  }
  type onQuery = (param: Partial<param>) => void;
  export interface HeaderProps {
    onQuery: onQuery;
  }
  export interface MainProps {
    onQuery: onQuery;
    query: param;
    loading: boolean;
    data?: {
      total: number;
      rows: {
        pwd_site: string;
        pwd_username: string;
        pwd_id: string;
        pwd_pwd: string;
      }[];
    };
  }
  export interface DialogProps {
    open: boolean;
    onCancel(): void;
  }
}

function Dialog(props: t.DialogProps) {
  const { open, onCancel } = props;

  const [save] = usePwdSaveMutation();
  const [form] = Form.useForm();
  const finishHandler: FormProps<any>["onFinish"] = (formData) => {
    save(formData)
      .unwrap()
      .then(({ isOk }) => {
        if (!isOk) return;
        onCancel();
        form.resetFields();
      });
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={finishHandler}>
        <Form.Item label="站点" name="pwd_site" rules={[{ required: true }]}>
          <Input maxLength={10} showCount autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="账户"
          name="pwd_username"
          rules={[{ required: true }]}
        >
          <Input maxLength={10} showCount autoComplete="off" />
        </Form.Item>
        <Form.Item label="密码" name="pwd_pwd" rules={[{ required: true }]}>
          <Input maxLength={10} showCount autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

function Header(props: t.HeaderProps) {
  const { onQuery } = props;

  const [form] = Form.useForm();
  const resetHandler = () => {
    form.resetFields();
    onQuery({ page_index: 1, pwd_site: "", pwd_username: "" });
  };

  return (
    <Form
      form={form}
      onFinish={onQuery}
      name="headerForm"
      layout="inline"
      className="between-center"
    >
      <div className="flex">
        <Form.Item label="站点" name="pwd_site">
          <Input
            maxLength={10}
            showCount
            placeholder="搜站点"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item label="账户" name="pwd_username">
          <Input
            maxLength={10}
            showCount
            placeholder="搜账户"
            autoComplete="off"
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Space>
          <Button htmlType="submit" type="primary">
            查询
          </Button>
          <Button onClick={resetHandler}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

function Main(props: t.MainProps) {
  const { onQuery, query, data, loading } = props;

  const changeHandler: TableProps<any>["onChange"] = (pagi, filter, sort) => {
    const { current: page_index, pageSize: page_size } = pagi;
    onQuery({ page_index, page_size });
  };

  const [del] = usePwdDelMutation();

  const columns: TableProps<any>["columns"] = [
    { title: "id", align: "center", dataIndex: "pwd_id", ellipsis: true },
    { title: "站点", align: "center", dataIndex: "pwd_site" },
    { title: "账户", align: "center", dataIndex: "pwd_username" },
    { title: "密码", align: "center", dataIndex: "pwd_pwd" },
    {
      title: "操作",
      align: "center",
      dataIndex: "pwd_id",
      render(pwd_id) {
        return (
          <>
            <Button onClick={() => {}} type="link">
              编辑
            </Button>
            <Button onClick={() => del(pwd_id)} danger type="link">
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const [y, setSh] = useState(0);
  const resizeRef = useResize<HTMLDivElement>(
    ({ height }) => setSh(height - 56 - 64),
    []
  );

  return (
    <Table
      ref={resizeRef}
      dataSource={data?.rows}
      rowKey="pwd_id"
      columns={columns}
      loading={loading}
      onChange={changeHandler}
      pagination={{
        position: ["bottomLeft"],
        current: query.page_index,
        pageSize: query.page_size,
        total: data?.total,
        showTotal: (total) => `共：${total}条`,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [20, 50, 100],
      }}
      scroll={{ y }}
      bordered
      className="flex-1-hidden"
    />
  );
}
