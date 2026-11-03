import { Dispatch, FC, SetStateAction, useCallback } from "react";

import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";
import styles from "./menu-step.module.scss";

type TMenuStepProps = {
  setGameStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
};

export const MenuStep: FC<TMenuStepProps> = ({ setGameStep }) => {
  const handleGoToAlphabet = useCallback(() => {
    setGameStep(GAME_STEPS_ENUM.ALPHABET);
  }, []);

  const handleGoToLetters = useCallback(() => {
    setGameStep(GAME_STEPS_ENUM.LETTERS);
  }, []);

  const handleGoToSettings = useCallback(() => {
    setGameStep(GAME_STEPS_ENUM.SETTINGS);
  }, []);

  return (
    <PageContentLayout
      mainContent={
        <>
          <MenuButton
            className={styles.button}
            text={"Весь алфавит"}
            onClick={handleGoToAlphabet}
          />
          <MenuButton className={styles.button} text={"Учить буквы"} onClick={handleGoToLetters} />
          <MenuButton className={styles.button} text={"Настройки"} onClick={handleGoToSettings} />
        </>
      }
    />
  );
};
