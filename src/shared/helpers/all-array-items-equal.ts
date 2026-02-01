export const allArrayItemsEqual = <T>(arr: T[]): boolean => {
  if (!arr.length || arr.length === 1) return true;
  const firstItem: T = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== firstItem) return false;
  }
  return true;
};
