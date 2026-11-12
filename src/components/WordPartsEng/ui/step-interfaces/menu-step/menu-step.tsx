import { Dispatch, FC, SetStateAction } from "react";

import { SET_SETTINGS_ACTIONS_ENUM } from "@/components/WordPartsEng/enums/set-settings-actions.enum";
import { MenuItemListLayout } from "@/shared/layouts/menu-items-list-layout/menu-items-list-layout";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";
import { TSettingsActions } from "../../../types/settings.type";

type TMenuStepProps = {
  setGameStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
  setSettings: (value: TSettingsActions) => void;
};

export const MenuStep: FC<TMenuStepProps> = ({ setGameStep, setSettings }) => {
  return (
    <PageContentLayout
      headerContent={
        <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
          Меню игры
        </Typography>
      }
      mainContent={
        <MenuItemListLayout>
          <MenuButton
            text={"Простые слова из 3 букв"}
            onClick={() => {
              setSettings({ type: SET_SETTINGS_ACTIONS_ENUM.SET_MAX_WORDS_LENGTH, payload: 3 });
              setSettings({ type: SET_SETTINGS_ACTIONS_ENUM.SET_MIN_WORDS_LENGTH, payload: 3 });
              setGameStep(GAME_STEPS_ENUM.GAME);
            }}
          />
          <MenuButton
            text={"Слова из 4 букв"}
            onClick={() => {
              setSettings({ type: SET_SETTINGS_ACTIONS_ENUM.SET_MAX_WORDS_LENGTH, payload: 4 });
              setSettings({ type: SET_SETTINGS_ACTIONS_ENUM.SET_MIN_WORDS_LENGTH, payload: 4 });
              setGameStep(GAME_STEPS_ENUM.GAME);
            }}
          />
          <MenuButton
            text={"Слова из 5 и более букв"}
            onClick={() => {
              setSettings({ type: SET_SETTINGS_ACTIONS_ENUM.SET_MAX_WORDS_LENGTH, payload: 7 });
              setSettings({ type: SET_SETTINGS_ACTIONS_ENUM.SET_MIN_WORDS_LENGTH, payload: 5 });
              setGameStep(GAME_STEPS_ENUM.GAME);
            }}
          />
          <MenuButton
            text={"Все слова"}
            onClick={() => {
              setSettings({ type: SET_SETTINGS_ACTIONS_ENUM.SET_MAX_WORDS_LENGTH, payload: 7 });
              setSettings({ type: SET_SETTINGS_ACTIONS_ENUM.SET_MIN_WORDS_LENGTH, payload: 0 });
              setGameStep(GAME_STEPS_ENUM.GAME);
            }}
          />

          <MenuButton text={"Настройки"} onClick={() => setGameStep(GAME_STEPS_ENUM.SETTINGS)} />
        </MenuItemListLayout>
      }
    />
  );
};
