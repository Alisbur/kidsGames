import { FC } from "react";
import { BALLS_COLOR_ENUM } from "../../enum/ball-colors.enum";
import styles from "./ball.module.scss";
import classNames from "classnames";

type TBallProps = {
  color?: BALLS_COLOR_ENUM;
  isEmpty?: boolean;
  isHidden?: boolean;
  onClick?: () => void;
};

export const Ball: FC<TBallProps> = ({
  color = null,
  isEmpty,
  isHidden = false,
  onClick,
}) => {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper_hidden]: isHidden,
      })}
    >
      <span
        className={classNames(styles.ball, {
          [styles[`ball_${color}`]]: color,
          [styles[`ball_empty`]]: isEmpty,
        })}
        onClick={onClick}
      />
    </div>
  );
};
