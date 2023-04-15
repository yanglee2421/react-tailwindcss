type Param = ConstructorParameters<typeof Date>;

export function toCountdown(...param: Param) {
  const date = new Date(...param);
  const target = date.getTime() - Date.now();

  const perDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(target / perDay);
  const restDay = target % perDay;

  const perHour = 1000 * 60 * 60;
  const hour = Math.floor(restDay / perHour);
  const restHour = restDay % perHour;

  const perMin = 1000 * 60;
  const min = Math.floor(restHour / perMin);
  const restMin = restDay % perMin;

  const perSec = 1000;
  const sec = Math.floor(restMin / perSec);
  const restSec = restMin % perSec;

  return `${day}天/${hour}小时/${min}分/${sec}秒/${restSec}毫秒`;
}
