/**
 * Download the incoming stream file
 * @param file binary file data
 * @param fileName The filename of the generated file
 */
export function handleBlobDownload(file: BlobPart, fileName: string) {
  const blob = new Blob([file]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}
