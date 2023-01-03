const format = (num: number) => (num > 10 ? `${num}` : `0${num}`);
class DateFormat {
  simple: string;
  whole: string;
  constructor(params: Date | number | string = Date.now()) {
    const date = new Date(params);
    const YYYY = date.getFullYear();
    let MM = format(date.getMonth() + 1);
    let DD = format(date.getDate());
    let hh = format(date.getHours());
    let mm = format(date.getMinutes());
    let ss = format(date.getSeconds());
    this.simple = `${YYYY}-${MM}-${DD}`;
    this.whole = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  }
}
export default DateFormat;
