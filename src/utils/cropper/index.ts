import "./index.less";

/**
 * 生成canvas
 */
export function getCanvas({
  width = 0,
  height = 0,
  scale = 1,
  attrs = {} as Record<string, any>,
}) {
  const canvas: any = document.createElement("canvas");
  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];
    canvas.setAttribute(key, value);
  });
  canvas.setAttribute("width", `${width * scale}`);
  canvas.setAttribute("height", `${height * scale}`);
  canvas.style = `${attrs.style || ""};width: ${width}px;height: ${height}px;`;
  const ctx = canvas.getContext("2d");
  ctx?.scale(scale, scale);
  return { canvas, ctx };
}

/**
 * 将base64下载为文件
 * @param data base64数据
 * @param filename 文件名
 */
export function downloadBase64File(dataUrl: string, filename: string) {
  const data = base64Img2Blob(dataUrl);
  window.URL = window.URL || window.webkitURL;
  const urlBlob = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = urlBlob;
  const downloadFileName = filename;
  link.setAttribute("download", downloadFileName);
  document.body.appendChild(link);
  link.click();
  function base64Img2Blob(code: string) {
    const parts = code.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}

/**
 * 拷贝字符串到剪切板
 * @param value 字符串
 */
export function copyStr(value: string) {
  console.log("copyStr", value);
  const transfer = document.createElement("input");
  document.body.appendChild(transfer);
  transfer.value = value;
  transfer.setSelectionRange(0, 999999999);
  transfer.focus();
  transfer.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
  }
  transfer.blur();
  document.body.removeChild(transfer);
}

/**
 * 加载base64图片
 * @param base64
 * @returns
 */
export const loadImage = (base64: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = base64;
  });
};

const resetRect = () => {
  return { x: 0, y: 0, width: 0, height: 0 } as any;
};

interface IImageInfo {
  base64: string;
  width: number;
  height: number;
}

interface IListener {
  onOk?: (params: IImageInfo) => void;
}

interface IProps {
  scale?: number;
  listener?: IListener;
}

class ImageCut {
  scale = 1;
  canvas: HTMLCanvasElement;
  ctx: any;
  pos = "";
  initany: any = { x: 0, y: 0 };
  rect: any = resetRect();
  initRect: any = resetRect();
  originRect = resetRect();
  img: any = null;
  listener: IListener = {};
  constructor(props: IProps = {}) {
    const { scale = 1 } = props;
    const { canvas, ctx } = getCanvas({ width: 0, height: 0 });
    this.canvas = canvas;
    this.ctx = ctx;
    this.scale = scale;
    this.listener = props.listener || {};
  }
  showRect(img: HTMLImageElement) {
    this.reset();
    const rect = img.getBoundingClientRect();
    const rectContainer = this.renderRect(rect);
    document.body.appendChild(rectContainer);
    this.img = img;
  }
  getCutImageInfo() {
    this.drawImage(this.img);
    const { originRect, rect } = this;
    const info = {
      x: rect.x - originRect.x,
      y: rect.y - originRect.y,
      width: rect.width,
      height: rect.height,
    };
    const base64 = this.cutImage(info);
    return { base64, width: rect.width, height: rect.height };
  }
  startCut() {
    const { listener } = this;
    const res = this.getCutImageInfo();
    this.reset();
    listener.onOk?.(res);
  }
  reset() {
    this.pos = "";
    this.initany = { x: 0, y: 0 };
    this.rect = resetRect();
    this.initRect = resetRect();
    this.originRect = resetRect();
    this.removeRect();
  }
  drawImage(img: HTMLImageElement) {
    const { ctx, scale } = this;
    const { width, height } = img;
    this.setCanvasSize(width, height);
    ctx.drawImage(img, 0, 0, width * scale, height * scale);
  }
  cutImage(rect: any) {
    console.log(rect);
    const { scale, ctx, canvas } = this;
    const { x, y, width, height } = rect;
    const imgData = ctx.getImageData(
      x * scale,
      y * scale,
      width * scale,
      height * scale
    );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.setCanvasSize(width, height);
    ctx.putImageData(imgData, 0, 0);
    const base64 = canvas.toDataURL("image/png");
    return base64;
  }

  setCanvasSize(width: number, height: number) {
    const { canvas, scale } = this;
    canvas.setAttribute("width", `${width * scale}`);
    canvas.setAttribute("height", `${height * scale}`);
    canvas.setAttribute("style", `width: ${width}px;height: ${height}px;`);
  }
  renderRect(rect: any) {
    const { x, y, width, height } = rect;
    this.rect = { x, y, width, height };
    this.originRect = { x, y, width, height };
    const container: any = document.createElement("div");
    container.setAttribute("id", `rect__container`);
    container.style = `
      position: fixed;
      border: 2px solid red;
      left: ${rect.x}px;
      top: ${rect.y}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
    `;
    const rectList = [
      { x: 50, y: 0, pos: "top", mousePos: "ns" },
      { x: 50, y: 100, pos: "bottom", mousePos: "ns" },
      { x: 0, y: 50, pos: "left", mousePos: "ew" },
      { x: 100, y: 50, pos: "right", mousePos: "ew" },
      { x: 100, y: 0, pos: "right-top", mousePos: "nesw" },
      { x: 100, y: 100, pos: "right-bottom", mousePos: "nwse" },
      { x: 0, y: 100, pos: "left-bottom", mousePos: "nesw" },
      { x: 0, y: 0, pos: "left-top", mousePos: "nwse" },
    ];
    rectList.forEach((e: any, i: number) => {
      const rectDom: any = document.createElement("div");
      rectDom.setAttribute("data-pos", e.pos);
      rectDom.setAttribute("data-index", i);
      rectDom.setAttribute("id", `rect__${e.pos}`);
      rectDom.style = `
        position: absolute;
        left: ${e.x}%;
        top: ${e.y}%;
        width: 7px;
        height: 7px;
        border: 1px solid #ddd;
        background-color: #fff;
        transform: translate(-50%, -50%);
        cursor: ${e.mousePos}-resize;
      `;
      rectDom.addEventListener("mousedown", this.handleMouseDown);
      container.appendChild(rectDom);
    });
    const confirmIcon = `
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          d="M159.405 462.713l218.634 218.634L859.54 196.055l94.784 94.151-580.076 583.236L69.676 568.87l89.729-106.157z"
          fill="currentColor"
        ></path>
      </svg>
    `;
    const cancelIcon = `
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path
          d="M896 812.9 594.2 511.1l301.2-301.2-82.3-82.3L511.9 428.8l-301-301L128.6 210.1l301 301L128 812.7l82.3 82.3 301.6-301.6 301.8 301.8L896 812.9zM896 812.9"
          fill="currentColor"
        ></path>
      </svg>
    `;

    const downloadIcon = `
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path
          d="M896 864.384v96H128v-96h768zM564.096 64v506.176l201.376-201.44 67.84 67.84-316.768 316.8-316.8-316.8 67.904-67.84 200.448 200.416V64h96z"
          fill="currentColor"
        ></path>
      </svg>
    `;

    const copyIcon = `
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
        <path
          d="M921.6 819.2h-102.4v102.4c0 56.32-46.08 102.4-102.4 102.4H102.4c-56.32 0-102.4-46.08-102.4-102.4V307.2c0-56.32 46.08-102.4 102.4-102.4h102.4V102.4c0-56.32 46.08-102.4 102.4-102.4h614.4c56.32 0 102.4 46.08 102.4 102.4v614.4c0 56.32-46.08 102.4-102.4 102.4zM153.6 307.2c-30.72 0-51.2 20.48-51.2 51.2v512c0 30.72 20.48 51.2 51.2 51.2h512c30.72 0 51.2-20.48 51.2-51.2V358.4c0-30.72-20.48-51.2-51.2-51.2H153.6z m768-153.6c0-30.72-20.48-51.2-51.2-51.2H358.4c-30.72 0-51.2 20.48-51.2 51.2v51.2h409.6c56.32 0 102.4 46.08 102.4 102.4v409.6h51.2c30.72 0 51.2-20.48 51.2-51.2V153.6z"
          fill="currentColor"
        ></path>
      </svg>
    `;

    const operationDom: any = document.createElement("div");
    operationDom.style = `
      position: absolute;
      right: 0;
      bottom: -30px;
      width: 120px;
      height: 26px;
      border: 1px solid #ddd;
      border-radius: 2px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      padding: 0 4px;
    `;

    const downloadDom: any = document.createElement("div");
    downloadDom.setAttribute("title", "下载");
    downloadDom.setAttribute("class", "image-cut-operation-icon");
    downloadDom.innerHTML = downloadIcon;
    downloadDom.addEventListener("click", () => {
      const { base64 } = this.getCutImageInfo();
      downloadBase64File(base64, `${Date.now()}.png`);
    });
    operationDom.appendChild(downloadDom);

    const copyDom: any = document.createElement("div");
    copyDom.setAttribute("title", "复制到剪切板");
    copyDom.setAttribute("class", "image-cut-operation-icon");
    copyDom.innerHTML = copyIcon;
    copyDom.addEventListener("click", () => {
      const { base64 } = this.getCutImageInfo();
      copyStr(base64);
    });
    operationDom.appendChild(copyDom);

    const cancelDom: any = document.createElement("div");
    cancelDom.setAttribute("title", "取消");
    cancelDom.setAttribute("class", "image-cut-operation-icon");
    cancelDom.innerHTML = cancelIcon;
    cancelDom.addEventListener("click", () => this.reset());
    operationDom.appendChild(cancelDom);

    const confirmDom: any = document.createElement("div");
    confirmDom.setAttribute("title", "确认");
    confirmDom.setAttribute("class", "image-cut-operation-icon");
    confirmDom.innerHTML = confirmIcon;
    confirmDom.addEventListener("click", () => this.startCut());
    operationDom.appendChild(confirmDom);

    container.appendChild(operationDom);
    return container;
  }

  updateRect() {
    const { rect } = this;
    const container = document.getElementById("rect__container");
    if (!container) {
      return;
    }
    container.style.left = `${rect.x}px`;
    container.style.top = `${rect.y}px`;
    container.style.width = `${rect.width}px`;
    container.style.height = `${rect.height}px`;
  }

  removeRect() {
    const container = document.getElementById("rect__container");
    container?.parentNode?.removeChild(container);
  }

  handleMouseDown = (e: any) => {
    const { target, pageX: x, pageY: y } = e;
    const pos = target.getAttribute("data-pos");
    this.pos = pos;
    this.initany = { x, y };
    this.initRect = { ...this.rect };
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  };
  handleMouseMove = (e: any) => {
    if (!this.pos) {
      return;
    }
    const { initRect } = this;
    const { x, y } = this.initany;
    const { pageX, pageY } = e;
    let dx = 0;
    let dy = 0;
    let dw = 0;
    let dh = 0;
    if (this.pos.includes("top")) {
      dy = pageY - y;
      dh = -dy;
    }
    if (this.pos.includes("bottom")) {
      dh = pageY - y;
    }
    if (this.pos.includes("left")) {
      dx = pageX - x;
      dw = -dx;
    }
    if (this.pos.includes("right")) {
      dw = pageX - x;
    }
    dx = Math.min(initRect.width, Math.max(0, dx));
    dy = Math.min(initRect.height, Math.max(0, dy));
    dw = Math.min(0, Math.max(-initRect.width, dw));
    dh = Math.min(0, Math.max(-initRect.height, dh));
    this.rect = {
      x: initRect.x + dx,
      y: initRect.y + dy,
      width: initRect.width + dw,
      height: initRect.height + dh,
    };
    this.updateRect();
  };
  handleMouseUp = () => {
    if (!this.pos) {
      return;
    }
    this.pos = "";
    this.initany = { x: 0, y: 0 };
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  };
}

export default ImageCut;
