type TargetTime = ConstructorParameters<typeof Date>;

export function toCountdown(...targetTime: TargetTime) {
  const targetDate = new Date(...targetTime);
  const difference = targetDate.getTime() - Date.now();

  const [day, restDay] = toTimeCarry(difference, 1000 * 60 * 60 * 24);
  const [hour, restHour] = toTimeCarry(restDay, 1000 * 60 * 60);
  const [min, restMin] = toTimeCarry(restHour, 1000 * 60);
  const [sec, restSec] = toTimeCarry(restMin, 1000);

  return `${day}天/${hour}小时/${min}分/${sec}秒/${restSec}毫秒`;
}

function toTimeCarry(totalTime: number, unit: number) {
  const time = Math.floor(totalTime / unit);
  const restTime = totalTime % unit;
  return [time, restTime];
}
