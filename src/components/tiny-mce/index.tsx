import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { useRef } from "react";

interface TinyMCEProps extends Omit<IAllProps, "onChange"> {
  value: string;
  onChange(html: string): void;
}

export function TinyMCE(props: TinyMCEProps) {
  const { value, onChange, ...restProps } = props;

  const editorRef = useRef<Editor["editor"]>();
  const handleInit: IAllProps["onInit"] = (...args) => {
    const editor = args[1];
    editorRef.current = editor;
  };

  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      apiKey="4hxy0mee8bp47o512g4sy8s3ihg2djrmbiwtei8kduky11io"
      onInit={handleInit}
      init={init()}
      {...restProps}
    />
  );
}

function init(): IAllProps["init"] {
  return {
    // skin: true,
    // content_css: true,
    menubar: false,
    branding: false,
    height: 500,
    plugins: plugins(),
    toolbar: toolbar(),
    content_style: content_style(),
  };
}

function plugins() {
  return [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
    "emoticons",
  ];
}

function toolbar() {
  return (
    "undo redo | blocks | " +
    "fontfamily fontsizeinput |" +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent emoticons | " +
    "removeformat fullscreen | help"
  );
}

function content_style() {
  return "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }";
}
