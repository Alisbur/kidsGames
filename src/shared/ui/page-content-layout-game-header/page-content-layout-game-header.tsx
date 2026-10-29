import { FC } from "react";

import { Typography } from "../typography/typography";
import styles from "./page-content-layout-game-header.module.scss";

type TPageContentLayoutGameHeaderProps = {
  title: string;
  subtitle?: string;
};

export const PageContentLayoutGameHeader: FC<TPageContentLayoutGameHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={styles.wrapper}>
      <Typography
        view={"title"}
        tag={"h3"}
        weight={"semibold"}
        color={"accent"}
        size={28}
        className={styles.title}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          view={"subtitle"}
          tag={"p"}
          weight={"normal"}
          color={"muted"}
          size={15}
          className={styles.subtitle}
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};
