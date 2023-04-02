/**
 * 下载传入的流文件
 * @param file 能转成 blob 的二进制流
 * @param fileName 下载时使用的文件名
 */
export function blobDler(file: BlobPart, fileName: string) {
  const blob = new Blob([file]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}
