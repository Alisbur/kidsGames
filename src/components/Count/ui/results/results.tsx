import classNames from "classnames";
import styles from "./results.module.scss";
import { FC } from "react";
import { Typography } from "../../../../shared/ui/typography/typography";

type TResultsProps = {
  total: number;
  solved: number;
  wrong: number;
};

export const Results: FC<TResultsProps> = ({ total, solved, wrong }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"}>
          Всего примеров:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"}>
          {total}
        </Typography>
      </div>

      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"}>
          Решено правильно:
        </Typography>
        <Typography
          view={"p-44"}
          tag={"p"}
          weight={"semibold"}
          color={"success"}
        >
          {solved}
        </Typography>
      </div>

      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"}>
          Неправильных ответов:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"} color={"error"}>
          {wrong}
        </Typography>
      </div>

      {solved >= total * 0.9 ? (
        <p
          className={classNames(
            styles.resultsItem__result,
            styles.resultsItem__result_good
          )}
        >
          <Typography
            view={"p-20"}
            tag={"p"}
            weight={"semibold"}
            color={"success"}
          >
            {solved === total ? "Отлично!!!" : "Почти получилось!"}
          </Typography>
        </p>
      ) : (
        <Typography view={"p-20"} tag={"p"} weight={"semibold"} color={"error"}>
          {"Надо ещё потренироваться."}
        </Typography>
      )}
    </div>
  );
};
