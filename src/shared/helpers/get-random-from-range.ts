export const getRandomValueFromRange = ({
  min = 0,
  max,
}: {
  max: number;
  min?: number;
}): number => {
  if (max === min) return min;
  const randomValue: number = Math.round(Math.random() * (max - min)) + min;
  return randomValue;
};
