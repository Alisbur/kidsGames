import classNames from "classnames";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import styles from "./content-wrapper-with-scroll.module.scss";

type ContentWrapperWithScrollProps = {
  children?: ReactNode;
  maxHeight?: number;
};

const MIN_SCROLL_THRESHOLD = 15;

export const ContentWrapperWithScroll: FC<ContentWrapperWithScrollProps> = ({
  children,
  maxHeight,
}) => {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const [isMainDivOverflowed, setIsMainDivOverflowed] = useState(false);
  const [isMainDivScrolled, setIsMainDivScrolled] = useState(false);
  const [isMainDivScrolledToBottom, setIsMainDivScrolledToBottom] = useState(false);

  useEffect(() => {
    if (mainDivRef.current) {
      mainDivRef.current.scrollTop = 0;
    }
  }, [children]);

  useEffect(() => {
    const el = mainDivRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isScrolled = el.scrollTop > MIN_SCROLL_THRESHOLD;
      const isScrolledToBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight <= MIN_SCROLL_THRESHOLD;
      setIsMainDivScrolled(isScrolled);
      setIsMainDivScrolledToBottom((prev) => {
        if (isScrolledToBottom !== prev) return isScrolledToBottom;
        return prev;
      });
    };

    el.addEventListener("scroll", handleScroll);

    const observer = new ResizeObserver(() => {
      const hasYOverflow = el.scrollHeight > el.clientHeight;
      setIsMainDivOverflowed(hasYOverflow);
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!children || !window) return null;

  return (
    <section className={styles.mainWrapper}>
      <div
        ref={mainDivRef}
        className={classNames(styles.main, {
          [styles.main_overflowed]: isMainDivOverflowed,
        })}
        style={{
          maxHeight: maxHeight ? `${maxHeight}px` : "auto",
        }}
      >
        {children}
      </div>
      {isMainDivOverflowed && isMainDivScrolled && (
        <div className={classNames(styles.mainWrapper__topGradient)} />
      )}

      {isMainDivOverflowed && !isMainDivScrolledToBottom && (
        <div className={classNames(styles.mainWrapper__bottomGradient)} />
      )}
    </section>
  );
};
