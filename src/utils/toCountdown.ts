type TargetTime = ConstructorParameters<typeof Date>;

export function toCountdown(...targetTime: TargetTime) {
  const targetDate = new Date(...targetTime);
  const difference = targetDate.getTime() - Date.now();

  const [day, restDay] = getTimeCarry(difference, 1000 * 60 * 60 * 24);
  const [hour, restHour] = getTimeCarry(restDay, 1000 * 60 * 60);
  const [min, restMin] = getTimeCarry(restHour, 1000 * 60);
  const [sec, restSec] = getTimeCarry(restMin, 1000);

  return `${day}天/${hour}小时/${min}分/${sec}秒/${restSec}毫秒`;
}

function getTimeCarry(totalTime: number, unit: number) {
  const time = Math.floor(totalTime / unit);
  const restTime = totalTime % unit;
  return [time, restTime];
}
