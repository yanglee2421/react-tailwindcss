// TinyMCE Imports
import { Editor, IAllProps } from "@tinymce/tinymce-react";

// React Imports
import React from "react";

export function TinyMCE(props: IAllProps) {
  // Props
  const { ...restProps } = props;

  const editorRef = React.useRef<Editor["editor"]>();

  return (
    <Editor
      apiKey="4hxy0mee8bp47o512g4sy8s3ihg2djrmbiwtei8kduky11io"
      init={init()}
      onInit={(evt, editor) => {
        void evt;
        editorRef.current = editor;
      }}
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
