function format(num: number) {
  return num > 10 ? `${num}` : `0${num}`;
}
/**
 * 将 date、时间戳 or string 转为固定格式的 string
 * @param params Date对象、时间戳、日期字符串
 * @param isSimple 是否仅精确到天，默认到秒
 * @returns 固定格式的日期字符串
 */
export function dateFormat(
  params: Date | number | string = Date.now(),
  isSimple = false
) {
  const date = new Date(params);
  const YYYY = date.getFullYear();
  let MM = format(date.getMonth() + 1);
  let DD = format(date.getDate());
  let hh = format(date.getHours());
  let mm = format(date.getMinutes());
  let ss = format(date.getSeconds());
  return isSimple
    ? `${YYYY}-${MM}-${DD}`
    : `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
}
