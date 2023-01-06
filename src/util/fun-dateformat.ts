function format(num: number) {
  return num > 10 ? `${num}` : `0${num}`;
}
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
