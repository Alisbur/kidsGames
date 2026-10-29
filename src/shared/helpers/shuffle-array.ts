export function shuffleArray<T>(input: T[]): T[] {
  const result = [...input];
  if (result.length < 2) return result;

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  if (result.every((el, i) => el === input[i])) {
    const idx = result.findIndex((el, i) => el !== result[0] && i > 0);
    if (idx !== -1) {
      [result[0], result[idx]] = [result[idx], result[0]];
    }
  }

  return result;
}
