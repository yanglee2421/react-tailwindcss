self.onmessage = (evt) => {
  const { data } = evt;

  // ** FileReader
  const reader = new FileReader();
  reader.readAsDataURL(data);

  // ** Resolve
  reader.onload = (evt) => {
    const result = evt.target?.result;

    // No Data
    if (!result) {
      const error = new Error("Invalid Data!");
      return self.postMessage({ error });
    }

    // Has Data
    return self.postMessage({ result });
  };

  // ** Reject
  reader.onerror = (evt) => {
    const error = evt.target?.error;
    return self.postMessage({ error });
  };
};
