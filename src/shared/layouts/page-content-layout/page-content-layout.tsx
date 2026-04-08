import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { ContentWrapperWithScroll } from "@/shared/ui/content-wrapper-with-scroll/content-wrapper-with-scroll";

import { Divider } from "../../ui/divider/divider";
import styles from "./page-content-layout.module.scss";

const GRADIENTS_TOTAL_HEIGHT = 32;

type TPageContentLayoutProps = {
  headerContent?: ReactNode;
  headerDivider?: boolean;
  mainContent?: ReactNode;
  mainDivider?: boolean;
  mainContentScroll?: boolean;
  footerContent?: ReactNode;
  footerDivider?: boolean;
};

export const PageContentLayout: FC<TPageContentLayoutProps> = ({
  headerContent,
  headerDivider = false,
  mainContent,
  mainDivider = false,
  mainContentScroll = false,
  footerContent,
  footerDivider = false,
}) => {
  const [mainDivHeight, setMainDivHeight] = useState(0);
  const mainDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mainDivRef.current;
    if (!el) return;
    setMainDivHeight(el.clientHeight - GRADIENTS_TOTAL_HEIGHT);
  }, [mainContent]);

  useEffect(() => {
    const el = mainDivRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (el.clientHeight !== mainDivHeight) {
        setMainDivHeight(el.clientHeight - GRADIENTS_TOTAL_HEIGHT);
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [mainDivRef.current?.clientHeight]);

  return (
    <main className={styles.wrapper}>
      {headerContent ? (
        <section className={styles.headerContent}>
          <div className={styles.header}>{headerContent}</div>
          {headerDivider && <Divider className={styles.divider} />}
        </section>
      ) : null}

      {mainContent ? (
        <>
          <section className={styles.mainContent} ref={mainDivRef}>
            {mainContentScroll ? (
              <ContentWrapperWithScroll maxHeight={mainDivHeight}>
                <div className={styles.main}>{mainContent}</div>
              </ContentWrapperWithScroll>
            ) : (
              <div
                className={styles.main}
                style={{
                  maxHeight: `${mainDivRef?.current?.clientHeight ?? 0}px`,
                }}
              >
                {mainContent}
              </div>
            )}
          </section>

          {mainDivider && <Divider className={styles.divider} />}
        </>
      ) : null}

      {footerContent ? (
        <section className={styles.footerContent}>
          <div className={styles.footer}>{footerContent}</div>
          {footerDivider && <Divider className={styles.divider} />}
        </section>
      ) : null}
    </main>
  );
};
