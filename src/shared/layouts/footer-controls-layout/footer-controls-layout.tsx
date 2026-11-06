import classNames from "classnames";
import { FC, ReactNode } from "react";

import styles from "./footer-controls-layout.module.scss";

type TFooterControlsLayoutProps = {
  type?: "vertical" | "horizontal";
  children: ReactNode;
  className?: string;
};

export const FooterControlsLayout: FC<TFooterControlsLayoutProps> = ({
  children,
  className,
  type = "horizontal",
}) => {
  return (
    <div className={classNames(styles.wrapper, styles[`wrapper_${type}`], className)}>
      {children}
    </div>
  );
};
