// Antd Imports
import { Form, Checkbox, Typography } from "antd";

export function InputRemember() {
  return (
    <Form.Item name={"remember"}>
      <div className="flex justify-between">
        <Checkbox>Remember Me</Checkbox>
        <Typography.Link underline>Forgot password?</Typography.Link>
      </div>
    </Form.Item>
  );
}
