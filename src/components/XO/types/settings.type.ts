import { FIGURE_TYPE_ENUM } from "../enums/figure-types.enum";
import { PLAYERS_ENUM, PLAYERS_TYPES_ENUM } from "../enums/players.enum";
import { TPlayer } from "./player.type";

export type TXOSettings = {
  playersType: PLAYERS_TYPES_ENUM;
  computerFigure: FIGURE_TYPE_ENUM;
  [PLAYERS_ENUM.PLAYER_1]: TPlayer;
  [PLAYERS_ENUM.PLAYER_2]: TPlayer;
};
