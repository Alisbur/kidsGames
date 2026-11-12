import { Dispatch, FC, SetStateAction } from "react";

import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";
import { TGameSettingsActions } from "../../../types/game-settings-actions.type";
import { TSettings } from "../../../types/settings.type";
import { PjatnashkaSettings } from "../../pjatnashka-settings/pjatnashka-settings";

type TSettingsStepProps = {
  settings: TSettings;
  settingsDispatch: Dispatch<TGameSettingsActions>;
  initNewGame: (s: TSettings) => void;
  setStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
};

export const SettingsStep: FC<TSettingsStepProps> = ({
  settings,
  settingsDispatch,
  initNewGame,
  setStep,
}) => {
  return (
    <PageContentLayout
      headerContent={<PageContentLayoutGameHeader title={"Настройки"} />}
      withMainHeader={false}
      headerDivider
      mainContent={<PjatnashkaSettings settings={settings} setSettings={settingsDispatch} />}
      mainDivider
      footerContent={
        <FooterControlsLayout>
          <MenuButton
            text={"Меню игры"}
            onClick={() => {
              setStep(GAME_STEPS_ENUM.MENU);
            }}
          />
          <MenuButton
            text={"Играть"}
            onClick={() => {
              initNewGame(settings);
            }}
          />
        </FooterControlsLayout>
      }
    />
  );
};
