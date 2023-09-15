export class NeoWs {
  ws: WebSocket | null = null;
  listOpen: Set<HandlerOpen> = new Set();
  listMessage: Set<HandlerMessage> = new Set();
  listClose: Set<HandlerClose> = new Set();
  controller = new AbortController();
  isClosed = false;
  timerCheck = 0;

  // Constructor Params
  url: string;
  protocols?: string;
  refetchInterval: number;
  constructor(params: NeoWsParams) {
    // ** Params
    const { url, protocols, refetchInterval } = params;

    this.url = url;
    this.protocols = protocols;
    this.refetchInterval = refetchInterval;
  }

  // ** WebSocket
  send(data: SendParams) {
    const { ws } = this;
    if (!ws) return;

    ws.send(data);
  }
  close() {
    this.isClosed = true;
    this.listOpen.clear();
    this.listMessage.clear();
    this.listClose.clear();
    this.abortHandler();

    const { ws } = this;
    if (!ws) return;

    const isOpen = ws.readyState === ws.OPEN;
    if (isOpen) {
      ws.close();
    }
  }
  connect() {
    this.isClosed = false;

    this.ws = new WebSocket(this.url, this.protocols);
    this.ws.onclose = () => {
      if (this.isClosed) return;
      this.connect();
    };

    this.bindHandler();

    clearTimeout(this.timerCheck);
    this.timerCheck = setTimeout(() => {
      this.check();
    }, this.refetchInterval);
  }
  check() {
    this.send("check");

    if (this.isClosed) return;
    clearTimeout(this.timerCheck);
    this.timerCheck = setTimeout(() => {
      this.check();
    }, this.refetchInterval);
  }

  // Event Handler
  bindHandler() {
    const { ws } = this;
    if (!ws) return;

    this.controller = new AbortController();
    const { signal } = this.controller;

    this.listOpen.forEach((item) => {
      ws.addEventListener("open", item, { signal });
    });
    this.listMessage.forEach((item) => {
      ws.addEventListener("message", item, { signal });
    });
    this.listClose.forEach((item) => {
      ws.addEventListener("close", item, { signal });
    });
  }
  abortHandler() {
    this.controller.abort();
  }
  onOpen(fn: HandlerOpen) {
    this.listOpen.add(fn);
    this.abortHandler();
    this.bindHandler();
  }
  onMessage(fn: HandlerMessage) {
    this.listMessage.add(fn);
    this.abortHandler();
    this.bindHandler();
  }
  onClose(fn: HandlerClose) {
    this.listClose.add(fn);
    this.abortHandler();
    this.bindHandler();
  }
}

interface NeoWsParams {
  url: string;
  protocols?: string;
  refetchInterval: number;
}

type SendParams = string | ArrayBufferLike | Blob | ArrayBufferView;
type HandlerOpen = (evt: Event) => void;
type HandlerMessage = (evt: MessageEvent) => void;
type HandlerClose = (evt: CloseEvent) => void;
