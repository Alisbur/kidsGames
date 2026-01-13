export const getRandomFromArray = <T>(arr: Array<T>): T | null => {
  if (!arr.length) return null;

  const randomIdx = Math.floor(Math.random()*arr.length);

  return arr[randomIdx];
}