import { Editor, IAllProps } from "@tinymce/tinymce-react";
import tinymce, { Editor as TinyEditor } from "tinymce/tinymce";
import "tinymce/models/dom/model";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/skins/ui/oxide/skin.min.css";

import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

import "tinymce/plugins/emoticons/js/emojis";

import React, { useRef } from "react";

console.log(tinymce);

interface TinyMCEProps extends Omit<IAllProps, "onChange"> {
  value: string;
  onChange(html: string): void;
}

export function TinyMCE(props: TinyMCEProps) {
  const { value, onChange, ...restProps } = props;

  const editorRef = useRef<TinyEditor>();

  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      apiKey="4hxy0mee8bp47o512g4sy8s3ihg2djrmbiwtei8kduky11io"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: 500,
        branding: false,
        skin: false,
        menubar: false,
        plugins: plugins(),
        toolbar: toolbar(),
        content_css: false,
        content_style: content_style(),
      }}
      {...restProps}
    />
  );
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
    "removeformat | help"
  );
}

function content_style() {
  return "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }";
}
