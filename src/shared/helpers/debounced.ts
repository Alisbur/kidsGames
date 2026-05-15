// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounced = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
