import classNames from "classnames";
import { FC, ReactNode, useEffect, useRef } from "react";

import styles from "./h-scroller.module.scss";

function enableWheelScroll(el: HTMLElement) {
  const onWheel = (e: WheelEvent) => {
    if (e.deltaX !== 0) return;
    if (el.scrollWidth <= el.clientWidth) return;

    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1;
    const delta = e.deltaY * unit;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

    e.preventDefault();
    el.scrollLeft += delta;
  };

  el.addEventListener("wheel", onWheel, { passive: false });
  return () => el.removeEventListener("wheel", onWheel);
}

type THScrollerProps = {
  children: ReactNode;
  className?: string;
};

export const HScroller: FC<THScrollerProps> = ({ className, children }) => {
  const internalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = internalRef.current;
    if (!el) return;
    // if (window.matchMedia("(pointer: coarse)").matches) return;
    return enableWheelScroll(el);
  }, []);

  return (
    <div ref={internalRef} className={classNames(styles.h_scroller, className)}>
      {children}
    </div>
  );
};
