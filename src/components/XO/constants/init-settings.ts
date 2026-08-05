import { FIGURE_TYPE_ENUM } from "../enums/figure-types.enum";
import { PLAYERS_ENUM, PLAYERS_TYPES_ENUM } from "../enums/players.enum";
import { TXOSettings } from "../types/settings.type";

export const INIT_SETTINGS: TXOSettings = {
  playersType: PLAYERS_TYPES_ENUM.SINGLE,
  computerFigure: FIGURE_TYPE_ENUM.O,
  [PLAYERS_ENUM.PLAYER_1]: { figure: FIGURE_TYPE_ENUM.X, name: "Игрок 1", isComputer: false },
  [PLAYERS_ENUM.PLAYER_2]: { figure: FIGURE_TYPE_ENUM.O, name: "Игрок 2", isComputer: true },
};
