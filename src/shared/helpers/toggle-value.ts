export const toggleValue = <T>(array: T[], value: T, minLength = 1): T[] => {
  if (array.includes(value)) {
    if (array.length <= minLength) return array;
    return array.filter((v) => v !== value);
  }
  return [...array, value];
};
