import { useStyle } from "@/hook";
import React, { useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import { Button, Checkbox, Form, Input, InputNumber, Select, Tag } from "antd";
import { Keywords, Languages } from "@/component";

export function PageGpt() {
  const cx = useStyle(style);

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={cx("box")}>
      <main className={cx("box-main")}>
        <section className={cx("main-left")}>
          <h2>Left</h2>
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <Input.TextArea maxLength={3000} showCount />
            </Form.Item>
            <Form.Item label="Generate" name="title">
              <InpNum />
            </Form.Item>
            <Form.Item label="Generate" name="title2">
              <InpNum />
            </Form.Item>
            <Form.Item label="Generate" name="title3">
              <InpNum />
            </Form.Item>
            <Form.Item label="Keywords" name="keywords">
              <Keywords />
            </Form.Item>
            <Form.Item label="Languages" name="languages">
              <Languages />
            </Form.Item>
            <Form.Item>
              <div className="text-end">
                <Button htmlType="submit" size="large">
                  Submit
                </Button>
                <Button
                  href="https://www.baidu.com"
                  target="_blank"
                  type="link"
                >
                  Feedback
                </Button>
              </div>
            </Form.Item>
          </Form>
        </section>
        <section className={cx("main-right")}>
          <h2>Right</h2>
          <div>
            <div className={cx("right-board")}>
              <Lorem number={10} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default React.memo(PageGpt);

interface InpNumProps {
  value?: string;
  onChange?(str: string | null): void;
}

function InpNum(props: InpNumProps) {
  const { value, onChange } = props;

  const [isEnabled, setIsDisabled] = useState(false);

  const chk = useMemo(() => {
    const handleChkChange = (checked: boolean) => {
      checked || onChange?.(null);
      setIsDisabled(!isEnabled);
    };

    return (
      <Checkbox onChange={(e) => handleChkChange(e.target.checked)}>
        Title
      </Checkbox>
    );
  }, [isEnabled, onChange]);

  const handleChange = (str: string | null) => {
    const target = isEnabled ? null : str;
    onChange?.(str);
  };
  return (
    <div className="flex start-center">
      {chk}
      <InputNumber
        value={value}
        onChange={handleChange}
        disabled={!isEnabled}
        autoComplete="off"
      />
    </div>
  );
}

interface LoremProps {
  number: number;
}

function Lorem(props: LoremProps) {
  const { number } = props;

  const result = useMemo(() => {
    const arr: React.ReactNode[] = [];
    for (let i = 0; i < number; i++) {
      arr.push(
        <p key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fuga,
          quidem quo mollitia quis suscipit. Animi tempora ab illum provident,
          inventore iusto dignissimos sed, ut distinctio laboriosam, nisi quasi
          quae!
        </p>
      );
    }
    return arr;
  }, [number]);

  return <>{result}</>;
}
