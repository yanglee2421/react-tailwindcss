self.onmessage = (evt) => {
  const { data } = evt;

  // ** FileReader
  const reader = new FileReader();
  reader.readAsDataURL(data);
  reader.onload = (evt) => {
    const data = evt.target?.result;
    if (!data) return self.postMessage(null);
    return self.postMessage(data);
  };
};
