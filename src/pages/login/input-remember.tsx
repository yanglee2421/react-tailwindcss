// Antd Imports
import { Form, Checkbox } from "antd";

export function InputRemember() {
  return (
    <Form.Item
      name={"remember"}
      valuePropName="checked"
      initialValue={false}
      className="flex justify-between"
    >
      <Checkbox>Remember Me</Checkbox>
      {/* <Typography.Link underline>Forgot password?</Typography.Link> */}
    </Form.Item>
  );
}
