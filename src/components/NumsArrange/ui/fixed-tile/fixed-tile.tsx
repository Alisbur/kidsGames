import { CSSProperties } from "react";

import { Typography } from "@/shared/ui/typography/typography";

import styles from "./fixed-tile.module.scss";

export type TFixedTileProps = {
  content: string;
  tileSize: number;
};

export function FixedTile({ content, tileSize }: TFixedTileProps) {
  const fontSize = tileSize * 0.6;

  const style: CSSProperties = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
  };

  return (
    <div className={styles.tile} style={style}>
      <Typography weight={"semibold"} color={"primary"} size={fontSize}>
        {content}
      </Typography>
    </div>
  );
}
