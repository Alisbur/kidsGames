import { TTime } from "../ui/types/time.type";

export const getAngleFromMinutes = (minutes: number) => {
  return (minutes % 60) * 6;
};

export const getMinutesFromAngle = (angle: number) => {
  const val = Math.round(angle / 6);
  if (val === 60) return 59;
  return val;
};

export const getHoursAngleFromTime = ({ hours, minutes }: TTime): number => {
  return (hours % 12) * 30 + minutes * 0.5;
};

export const isNight = (time: TTime): boolean => {
  if (time.hours >= 19 || time.hours <= 5) return true;
  return false;
};
