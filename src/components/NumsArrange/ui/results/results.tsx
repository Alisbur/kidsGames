import { FC } from "react";

import { RatingStarsComponent } from "@/shared/ui/rating-stars-component/rating-stars-component";

import { Typography } from "../../../../shared/ui/typography/typography";
import styles from "./results.module.scss";

type TResultsProps = {
  total: number;
  solved: number;
};

export const Results: FC<TResultsProps> = ({ total, solved }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"}>
          Всего заданий:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"}>
          {total}
        </Typography>
      </div>

      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"}>
          Решено правильно:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"} color={"success"}>
          {solved}
        </Typography>
      </div>

      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"}>
          Неправильных ответов:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"} color={"error"}>
          {total - solved}
        </Typography>
      </div>
      <RatingStarsComponent rating={(3 * solved) / total} size={"l"} />
    </div>
  );
};
