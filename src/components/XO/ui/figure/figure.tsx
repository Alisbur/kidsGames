import { FC } from "react";

import oFigure from "@/assets/icons/o-figure.svg";
import xFigure from "@/assets/icons/x-figure.svg";

import { FIGURE_TYPE_ENUM } from "../../enums/figure-types.enum";
import styles from "./figure.module.scss";

type TFigureProps = {
  type: FIGURE_TYPE_ENUM;
  size?: number;
};

export const Figure: FC<TFigureProps> = ({ type, size }) => {
  return (
    <div
      className={styles.figure}
      style={{ width: size ? `${size}px` : undefined, height: size ? `${size}px` : undefined }}
    >
      {type === FIGURE_TYPE_ENUM.X ? (
        <img
          src={xFigure}
          className={styles.figure__x}
          style={{ width: size ? `${size}px` : undefined }}
        />
      ) : (
        <img
          src={oFigure}
          className={styles.figure__o}
          style={{ width: size ? `${size}px` : undefined }}
        />
      )}
    </div>
  );
};
