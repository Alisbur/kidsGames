import classNames from "classnames";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import styles from "./content-wrapper-with-scroll.module.scss";

type ContentWrapperWithScrollProps = {
  children?: ReactNode;
  maxHeight?: number;
  preserveScrollPosition?: boolean;
};

const MIN_SCROLL_THRESHOLD = 15;

export const ContentWrapperWithScroll: FC<ContentWrapperWithScrollProps> = ({
  children,
  maxHeight,
  preserveScrollPosition = true,
}) => {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMainDivOverflowed, setIsMainDivOverflowed] = useState(false);
  const [isMainDivScrolled, setIsMainDivScrolled] = useState(false);
  const [isMainDivScrolledToBottom, setIsMainDivScrolledToBottom] = useState(false);

  useEffect(() => {
    if (mainDivRef.current && !preserveScrollPosition) {
      mainDivRef.current.scrollTop = 0;
    }
  }, [children, preserveScrollPosition]);

  useEffect(() => {
    const el = mainDivRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const updateOverflow = (): void => {
      setIsMainDivOverflowed(el.scrollHeight > el.clientHeight);
    };

    const handleScroll = (): void => {
      setIsMainDivScrolled(el.scrollTop > MIN_SCROLL_THRESHOLD);
      setIsMainDivScrolledToBottom(
        el.scrollHeight - el.scrollTop - el.clientHeight <= MIN_SCROLL_THRESHOLD,
      );
    };

    updateOverflow();
    handleScroll();

    el.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateOverflow();
      handleScroll();
    });
    resizeObserver.observe(content);

    const mutationObserver = new MutationObserver(() => {
      updateOverflow();
      handleScroll();
    });

    mutationObserver.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
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
        <div ref={contentRef}>{children}</div>
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
