import { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from "tinymce/tinymce";
// DOM model
import "tinymce/models/dom/model";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";

// importing plugin resources
import "tinymce/plugins/emoticons/js/emojis";

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

const html = `<p><b>概述</b><br>非常感谢您选择RAINBEAN锅具套装！<br>【不粘底&感应锅】砂锅采用坚固的铝制。3.2mm加厚边缘设计，可以使液体顺畅流出，不会溢出。4升带盖砂锅适合热煮酱汁、拉面、燕麦以及意大利面配肉团。<br>【创新陶瓷技术】节能钻石不粘涂料。其优越的性能和提高的导热性意味着锅具能更快地加热并更负责。这款高品质锅具上的抛光钻石涂层对几乎所有物质都具有不沾性能。<br>【3D钻石厨具】采用创新的3-D立体钻石纹理，可在锅表面与食物之间形成微小的空气隔层，使您的烹饪体验更佳。它能将高温迅速均匀分布到整个炖盖表面，完美烹制牛排、鱼、蔬菜、煎蛋、煎饼或任何您想要的食物。<br>【易于清洗&洗碗机安全】其三层涂层融入了数以千计的真实钻石颗粒，使其抗划耐用，易于清洗，100%不粘。无PTFE和PFOA，健康烹饪，安心使用。<br>【家庭厨房的完美礼物】适用于所有炉灶，兼容感应炉灶，安全放在炉子和烤箱上。每天烹饪的最佳选择，洗碗机可轻松清洗，手洗也非常方便。提供1年保修。如果您对购买不满意，只需给我们发送一封电子邮件，我们将退还100%的款项。祝您购物愉快！<br><br><b>规格</b><br>注意：我们充满信心地相信您会喜欢单子，该套装提供终身满意度保证。如果您决定购买后发现并不百分百满意，只需给我们发送一封电子邮件，我们将退还100%的款项。<br>材质：不粘状<br>涂层：铝制，陶瓷<br>尺寸：43.7*20.3*27cm<br>重量：3.1千克<br>赢得任何厨房的称赞，轻松做出美味的食物！<br><br><b>套装包括：</b><br>20/24cm 炒锅，18cm 砂锅</p><p><img src="https://cc-west-usa.oss-accelerate.aliyuncs.com/4248b814-0b54-4193-b23c-d92dffbe9a44.png" contenteditable="false" style="font-size: 14px; max-width: 100%;"></p><p><img src="https://cc-west-usa.oss-accelerate.aliyuncs.com/665b56c0-67ac-44b5-b0c3-61b019fe1d6c.jpg"></p><img src="https://cc-west-usa.oss-accelerate.aliyuncs.com/31c5daf9-a566-4528-9db2-d746c2dc15e3.jpg"><br>`;
console.log(tinymce);

console.log(html);

export function PageDemo(props: any) {
  const { init, ...resetProps } = props;

  return (
    <Editor
      apiKey="4hxy0mee8bp47o512g4sy8s3ihg2djrmbiwtei8kduky11io"
      onEditorChange={(e) => {
        console.log(e);
      }}
      init={{
        ...init,
        skin: false,
        content_css: false,
        content_style: [init.content_style || ""].join("\n"),
      }}
      {...resetProps}
    />
  );
}

export default function MyEdit() {
  const editorRef = useRef<any>();

  return (
    <PageDemo
      onInit={(evt: any, editor: any) => (editorRef.current = editor)}
      value={html}
      init={{
        height: 500,
        menubar: true,
        plugins: [
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
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    ></PageDemo>
  );
}

function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    (async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 300,
          height: 200,
        },
        audio: {},
      });
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => video.play();
    })();
  }, []);

  return (
    <div>
      <video ref={videoRef} width={300} height={200}></video>
    </div>
  );
}
