import classNames from "classnames";
import { HTMLAttributes, useMemo } from "react";

import { Loader } from "@/shared/ui/loader/loader";

import { GAME_TYPES_ENUM } from "../../enums/game-types.enum";
import styles from "./Piece.module.scss";

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
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  gameType: GAME_TYPES_ENUM;
  fieldCols?: number;
  fieldRows?: number;
  showIndex?: boolean;
  isLoading?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Piece = ({
  idx,
  size,
  x,
  y,
  span,
  disabled = false,
  className,
  winColor = false,
  onClick,
  imageUrl,
  imageWidth,
  imageHeight,
  gameType,
  fieldCols = 1,
  fieldRows = 1,
  showIndex = false,
  isLoading = true,
  ...rest
}: PieceProps) => {
  const positionStyle = {
    willChange: "transform",
    transform: `translate(${(size + span) * x}px, ${(size + span) * y}px)`,
    width: size,
    height: size,
  };

  const backgroundStyle = useMemo(() => {
    let offsetX = 0;
    let offsetY = 0;
    let ratio = 1;
    let scale = 1;

    if (imageWidth && imageHeight) {
      ratio = imageWidth / imageHeight;
      scale = (size * fieldCols) / Math.min(imageWidth, imageHeight);
      if (imageWidth > imageHeight) {
        offsetX = (imageWidth - imageHeight) / 2;
      } else {
        offsetY = (imageHeight - imageWidth) / 2;
      }
    }
    return imageUrl && gameType === GAME_TYPES_ENUM.PICTURE
      ? {
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: `${size * fieldCols * ratio}px ${size * fieldRows}px`,
          backgroundPosition: `-${x * size + offsetX * scale}px -${y * size + offsetY * scale}px`,
          backgroundRepeat: "no-repeat",
        }
      : {};
  }, [fieldCols, fieldRows, imageUrl, imageWidth, imageHeight]);

  const combinedStyle = { ...positionStyle, ...backgroundStyle };

  return (
    <div
      className={classNames(
        styles.piece,
        {
          [styles.piece_disabled]: disabled,
          [styles.piece_winColor]: winColor,
        },
        className,
      )}
      style={combinedStyle}
      onClick={() => onClick(idx)}
      {...rest}
    >
      {((showIndex && !isLoading) || gameType === GAME_TYPES_ENUM.NUMBERS) && (
        <span style={{ fontSize: `${size / 2}px` }}>{idx}</span>
      )}
      {isLoading && gameType === GAME_TYPES_ENUM.PICTURE && (
        <span style={{ fontSize: `${size / 2}px` }}>
          <Loader size={size / 2} />
        </span>
      )}
    </div>
  );
};
