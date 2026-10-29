import { TRANSLATION_GAME_TYPE_ENUM } from "../enums/game-type.enum";

export const GAME_TYPES_NAMES: Record<TRANSLATION_GAME_TYPE_ENUM, string> = {
  [TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__WORD_RUS]: "Слова (EN-RU)",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_RUS__WORD_ENG]: "Слова (RU-EN)",
  [TRANSLATION_GAME_TYPE_ENUM.ICO__WORD_ENG]: "Картинка-слово (EN)",
  [TRANSLATION_GAME_TYPE_ENUM.WORD_ENG__ICO]: "Слово-картинка (EN)",
};
