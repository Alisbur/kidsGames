import { GAME_SETTINGS_ACTIONS_ENUM } from "../enums/game-settings-actions.enum";
import { PLAYERS_TYPES_ENUM } from "../enums/players.enum";

export type TGameSettingsActions =
  | {
      type: GAME_SETTINGS_ACTIONS_ENUM.SET_PLAYERS_TYPE;
      payload: PLAYERS_TYPES_ENUM;
    }
  | {
      type: GAME_SETTINGS_ACTIONS_ENUM.SET_PLAYERS_TYPE;
      payload: PLAYERS_TYPES_ENUM;
    }
  | {
      type: GAME_SETTINGS_ACTIONS_ENUM.SET_FIRST_PLAYER_NAME;
      payload: string;
    }
  | {
      type: GAME_SETTINGS_ACTIONS_ENUM.SET_SECOND_PLAYER_NAME;
      payload: string;
    };
