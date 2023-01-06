export function blobDler(file: BlobPart, fileName: string) {
  const blob = new Blob([file]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}
