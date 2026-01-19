import { useEffect, useRef, useState } from "react";

interface UseSwipeDragOptions {
  onSwipeX?: (deltaX: number) => void;
  onSwipeY?: (deltaY: number) => void;
  thresholdX?: number;
  thresholdY?: number;
  maxDeltaX?: number;
  maxDeltaY?: number;
}

export function useSwipeDrag(
  ref: React.RefObject<HTMLElement>,
  {
    onSwipeX,
    onSwipeY,
    thresholdX = 50,
    thresholdY = 50,
    maxDeltaX = 50,
    maxDeltaY = 50,
  }: UseSwipeDragOptions
) {
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getPoint = (e: TouchEvent | MouseEvent) => {
      if ("touches" in e) {
        return e.touches[0] ?? e.changedTouches[0];
      }
      return e;
    };

    const onStart = (e: TouchEvent | MouseEvent) => {
      const p = getPoint(e);
      if (!p) return;

      isDragging.current = true;
      startX.current = p.clientX;
      startY.current = p.clientY;
    };

    const onMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging.current) return;

      const p = getPoint(e);
      if (!p) return;

      setDeltaX(p.clientX - startX.current);
      setDeltaY(p.clientY - startY.current);
    };

    const onEnd = () => {
      if (!isDragging.current) return;

      if (Math.abs(deltaX) >= thresholdX) {
        onSwipeX?.(deltaX);
      }

      if (Math.abs(deltaY) >= thresholdY) {
        onSwipeY?.(deltaY);
      }

      isDragging.current = false;
      setDeltaX(0);
      setDeltaY(0);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("mousedown", onStart);

    window.addEventListener("touchmove", onMove);
    window.addEventListener("mousemove", onMove);

    window.addEventListener("touchend", onEnd);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("mouseout", onEnd);

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("mousedown", onStart);

      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onEnd);

      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("mouseup", onEnd);
    };
  }, [ref, deltaX, deltaY, onSwipeX, onSwipeY, thresholdX, thresholdY]);

  return {
    deltaX:
      Math.abs(deltaX) < maxDeltaX ? deltaX : Math.sign(deltaX) * maxDeltaX,
    deltaY:
      Math.abs(deltaY) < maxDeltaY ? deltaY : Math.sign(deltaY) * maxDeltaY,
  };
}
