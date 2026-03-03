import { useRef } from "react";

export const useDeferredPromise = <T>() => {
  const resolveRef = useRef<(value: T) => void>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rejectRef = useRef<(reason?: any) => void>();

  const create = () =>
    new Promise<T>((resolve, reject) => {
      resolveRef.current = resolve;
      rejectRef.current = reject;
    });

  const resolve = (value: T) => {
    resolveRef.current?.(value);
    cleanup();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reject = (reason?: any) => {
    rejectRef.current?.(reason);
    cleanup();
  };

  const cleanup = () => {
    resolveRef.current = undefined;
    rejectRef.current = undefined;
  };

  return {
    create,
    resolve,
    reject,
  };
};
