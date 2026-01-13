import { HTMLAttributes, useEffect } from "react";
import styles from "./Piece.module.scss";
import classNames from "classnames";

type PieceProps = {
  idx: number;
  size: number;
  x: number;
  y: number;
  span: number;
  disabled?: boolean;
  className?: string;
  onClick: (num: number) => void;
  winColor?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function Piece({
  idx,
  size,
  x,
  y,
  span,
  disabled,
  className,
  winColor = false,
  onClick,
  ...rest
}: PieceProps) {
  useEffect(() => {
    console.log("mount", idx);
    return () => console.log("unmount", idx);
  }, []);

  return (
    <div
      className={classNames(
        styles.piece,
        {
          [styles.piece_disabled]: disabled,
          [styles.piece_winColor]: winColor,
        },
        className
      )}
      style={{
        transform: `translate(${(size + span) * x}px, ${(size + span) * y}px)`,
        width: size,
        height: size,
        fontSize: size * 0.6,
      }}
      onClick={() => onClick(idx)}
      {...rest}
    >
      {idx}
    </div>
  );
}
