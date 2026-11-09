import { FIELD_SIZES_ENUM } from "../enums/field-sizes.enum";
import { GAME_TYPES_ENUM } from "../enums/game-types.enum";
import { SHUFFLE_OPTIONS_ENUM } from "../enums/shuffle-options.enum";
import { TPjatnashkaMenuItem } from "../types/menu-item.type";

export const PJATNASHKA_MENU_ITEMS: TPjatnashkaMenuItem[] = [
  {
    id: 1,
    title: "Игра c числами",
    settings: {
      fieldSizeType: FIELD_SIZES_ENUM.MEDIUM,
      shuffleType: SHUFFLE_OPTIONS_ENUM.MEDIUM,
      gameType: GAME_TYPES_ENUM.NUMBERS,
    },
  },
  {
    id: 2,
    title: "Игра с изображением",
    settings: {
      fieldSizeType: FIELD_SIZES_ENUM.SMALL,
      shuffleType: SHUFFLE_OPTIONS_ENUM.MEDIUM,
      gameType: GAME_TYPES_ENUM.PICTURE,
    },
  },
];
