import classNames from "classnames";

import styles from "./loader.module.scss";

type LoaderProps = {
  size?: number;
  color?: string;
  className?: string;
};

export const Loader = ({ size = 40, color = "#007bff", className }: LoaderProps) => {
  const style = {
    width: size,
    height: size,
    borderColor: `${color} transparent transparent transparent`,
  };

  return <div className={classNames(styles.loader, className)} style={style} />;
};
