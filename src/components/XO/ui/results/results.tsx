import { Typography } from "@shared/ui/typography/typography";
import classNames from "classnames";
import { FC } from "react";

import { TPlayer } from "../../types/player.type";
import { TStats } from "../../types/stats.type";
import styles from "./results.module.scss";

type TResultsProps = {
  stats: TStats;
  player1: TPlayer;
  player2: TPlayer;
};

export const Results: FC<TResultsProps> = ({ stats, player1, player2 }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"} color={"accent"}>
          Игр сыграно:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"} color={"success"}>
          {stats.games}
        </Typography>
      </div>

      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"} color={"accent"}>
          {player1.name} выиграл:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"} color={"success"}>
          {stats.playerOneWins}
        </Typography>
      </div>

      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"} color={"accent"}>
          {player2.isComputer ? "Компьютер" : player2.name} выиграл:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"} color={"success"}>
          {stats.playerTwoWins}
        </Typography>
      </div>

      <div className={styles.resultsItem}>
        <Typography view={"p-18"} tag={"p"} weight={"semibold"} color={"accent"}>
          Ничьих:
        </Typography>
        <Typography view={"p-44"} tag={"p"} weight={"semibold"} color={"success"}>
          {stats.games - (stats.playerTwoWins + stats.playerOneWins)}
        </Typography>
      </div>

      {stats.playerOneWins > stats.playerTwoWins && (
        <Typography
          view={"p-20"}
          tag={"p"}
          weight={"semibold"}
          className={classNames(styles.resultsItem__result, styles.resultsItem__result_good)}
        >
          Победил {player1.name}!
        </Typography>
      )}

      {stats.playerOneWins < stats.playerTwoWins && (
        <Typography
          view={"p-20"}
          tag={"p"}
          weight={"semibold"}
          className={classNames(styles.resultsItem__result, styles.resultsItem__result_good)}
        >
          Победил {player2.isComputer ? "Компьютер" : player2.name}!
        </Typography>
      )}

      {stats.playerOneWins === stats.playerTwoWins && (
        <Typography
          view={"p-20"}
          tag={"p"}
          weight={"semibold"}
          className={classNames(styles.resultsItem__result, styles.resultsItem__result_good)}
        >
          Ничья!
        </Typography>
      )}
    </div>
  );
};
