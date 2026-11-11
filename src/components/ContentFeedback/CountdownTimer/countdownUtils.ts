export type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

export function getTimeRemaining(
  targetDate: string | Date,
  now = Date.now(),
): CountdownTime | null {
  const targetTime =
    targetDate instanceof Date ? targetDate.getTime() : Date.parse(targetDate);

  if (!Number.isFinite(targetTime)) {
    return null;
  }

  const totalSeconds = Math.max(0, Math.floor((targetTime - now) / 1000));

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isComplete: totalSeconds === 0,
  };
}
