self.addEventListener(
  "message",
  (e) => {
    self.postMessage(e.data);
    self.close();
  },
  false
);
