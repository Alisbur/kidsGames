import { FC, ReactNode } from "react";
import styles from "./page-content-layout.module.scss";
import { Divider } from "../../ui/divider/divider";

type TPageContentLayoutProps = {
  headerContent?: ReactNode;
  headerDivider?: boolean;
  mainContent?: ReactNode;
  mainDivider?: boolean;
  footerContent?: ReactNode;
  footerDivider?: boolean;
};

export const PageContentLayout: FC<TPageContentLayoutProps> = ({
  headerContent,
  headerDivider = false,
  mainContent,
  mainDivider = false,
  footerContent,
  footerDivider = false,
}) => {
  return (
    <section className={styles.wrapper}>
      {headerContent ? (
        <>
          <div className={styles.header}>{headerContent}</div>
          {headerDivider && <Divider className={styles.divider} />}
        </>
      ) : null}

      {mainContent ? (
        <>
          <div className={styles.main}>{mainContent}</div>
          {mainDivider && <Divider className={styles.divider} />}
        </>
      ) : null}

      {footerContent ? (
        <>
          <div className={styles.footer}>{footerContent}</div>
          {footerDivider && <Divider className={styles.divider} />}
        </>
      ) : null}
    </section>
  );
};
