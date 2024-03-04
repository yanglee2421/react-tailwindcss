// Antd Imports
import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

export function InputEmail() {
  return (
    <Form.Item
      name={"email"}
      rules={[
        { required: true, message: "Email is requred!" },
        { type: "email", message: "Must be an email!" },
      ]}
    >
      <Input
        prefix={<UserOutlined className="text-gray-400" />}
        type="email"
        placeholder="Email"
      />
    </Form.Item>
  );
}
