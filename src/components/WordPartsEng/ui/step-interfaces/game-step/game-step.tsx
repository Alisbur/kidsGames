import { Dispatch, FC, SetStateAction } from "react";

import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { Instruction } from "@/shared/ui/instruction/instruction";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { NavigateButton } from "@/shared/ui/navigate-button/navigate-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";
import { TWord } from "../../../types/word.type";
import { WordScreen } from "../../word-screen/word-screen";

type TGameStepProps = {
  setGameStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
  word: TWord;
  handleNextWord: () => void;
  handlePrevWord: () => void;
  speak: ((input: string | string[], pause?: number) => void) | null;
};

export const GameStep: FC<TGameStepProps> = ({
  setGameStep,
  word,
  handleNextWord,
  handlePrevWord,
  speak,
}) => {
  return (
    <PageContentLayout
      headerContent={
        <PageContentLayoutGameHeader title={"Английские слова"} subtitle={"Читаем по-буквам"} />
      }
      withMainHeader={false}
      headerDivider
      mainContent={<WordScreen key={word.id} word={word} speak={speak} />}
      mainDivider
      footerContent={
        <FooterControlsLayout type={"vertical"}>
          {!speak && <Instruction hint={"Браузер не поддерживает воспроизведение речи"} />}
          <FooterControlsLayout>
            <NavigateButton type={"back"} onClick={handlePrevWord} fullWidth />
            <MenuButton
              text={"Меню игры"}
              onClick={() => setGameStep(GAME_STEPS_ENUM.MENU)}
              textNoWrap
            />
            <NavigateButton type={"forward"} onClick={handleNextWord} fullWidth />
          </FooterControlsLayout>
        </FooterControlsLayout>
      }
    />
  );
};
