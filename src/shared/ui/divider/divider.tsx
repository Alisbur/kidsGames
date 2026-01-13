import { FC } from "react";
import styles from "./divider.module.scss";
import classNames from "classnames";

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
