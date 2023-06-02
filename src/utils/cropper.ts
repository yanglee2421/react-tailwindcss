export function downloadBase64File(dataUrl: string, filename: string) {
  const data = base64Img2Blob(dataUrl);
  const urlBlob = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = urlBlob;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(urlBlob);
}

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

export function loadImage(base64: string) {
  return new Promise((resolve, rej) => {
    const img = new Image();
    img.crossOrigin = "";
    img.src = base64;
    img.onload = () => resolve(img);
    img.onerror = (err) => rej(err);
  });
}
