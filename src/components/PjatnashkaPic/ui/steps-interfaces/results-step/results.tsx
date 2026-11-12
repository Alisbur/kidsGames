import { Dispatch, FC, SetStateAction } from "react";

import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";

type TResultsStepProps = {
  initNewGame: () => void;
  setStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
};

export const ResultsStep: FC<TResultsStepProps> = ({ initNewGame, setStep }) => {
  return (
    <PageContentLayout
      headerContent={<PageContentLayoutGameHeader title={"Результаты"} />}
      withMainHeader={false}
      headerDivider
      mainContent={<div>Здесь будет контент</div>}
      mainDivider
      footerContent={
        <FooterControlsLayout type={"vertical"}>
          <MenuButton
            text={"Меню игры"}
            onClick={() => {
              setStep(GAME_STEPS_ENUM.MENU);
            }}
          />
          <FooterControlsLayout>
            <MenuButton text={"Настройки"} onClick={() => setStep(GAME_STEPS_ENUM.SETTINGS)} />
            <MenuButton text={"Ещё раз"} onClick={() => initNewGame()} />
          </FooterControlsLayout>
        </FooterControlsLayout>
      }
    />
  );
};
