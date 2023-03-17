import { useClass } from "@/hook";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Button, Checkbox, Form, Input, Select, Tag } from "antd";
import "@wangeditor/editor/dist/css/style.css";
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  i18nChangeLanguage,
} from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";

i18nChangeLanguage("en");

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
        </section>
      </main>
    </div>
  );
}

export default React.memo(MyEditor);

function MyEditor() {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml("<p>hello world</p>");
    }, 1500);
  }, []);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
      <div style={{ marginTop: "15px" }}>{html}</div>
    </>
  );
}
