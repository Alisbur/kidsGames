import classNames from "classnames";
import { FC } from "react";

import styles from "./divider.module.scss";

type TDividerProps = {
  color?: string;
  className?: string;
};

export const Divider: FC<TDividerProps> = ({ color, className }) => {
  return (
    <div
      className={classNames(styles.divider, className)}
      style={{ backgroundColor: color || undefined }}
    />
  );
};
