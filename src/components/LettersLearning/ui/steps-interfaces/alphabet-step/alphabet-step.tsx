import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { LETTERS_ENG } from "@/components/LettersLearning/constants/letters";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { Instruction } from "@/shared/ui/instruction/instruction";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { NavigateButton } from "@/shared/ui/navigate-button/navigate-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";
import { Typography } from "@/shared/ui/typography/typography";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";
import { TSettings } from "../../../types/settings.type";
import styles from "./alphabet-step.module.scss";

type TAlphabetStepProps = {
  speak: ((input: string | string[], pause?: number) => void) | null;
  setGameStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
  settings: TSettings;
};

export const AlphabetStep: FC<TAlphabetStepProps> = ({ speak, setGameStep }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(selectedIndex > 0);
  const [canScrollNext, setCanScrollNext] = useState(selectedIndex < LETTERS_ENG.letters.length);
  const [playSound, setPlaySound] = useState(false);

  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLetterClick = (index: number) => {
    speak?.(LETTERS_ENG.letters[index].letter);
    setSelectedIndex(index);
    setIsAnimating(true);
    setAnimationKey((k) => k + 1);
  };

  const handlePrevLetter = () => {
    const newIndex = selectedIndex - 1;
    if (newIndex >= 0) {
      setSelectedIndex(newIndex);
      setIsAnimating(true);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleNextLetter = () => {
    const newIndex = selectedIndex + 1;
    if (newIndex >= 0) {
      setSelectedIndex(newIndex);
      setIsAnimating(true);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleAnimationEnd = (): void => {
    setIsAnimating(false);
  };

  useEffect(() => {
    const canGoPrev = selectedIndex > 0;
    const canGoNext = selectedIndex < LETTERS_ENG.letters.length - 1;
    setCanScrollNext(canGoNext);
    setCanScrollPrev(canGoPrev);
    if (playSound) speak?.(LETTERS_ENG.letters[selectedIndex].letter);
    setPlaySound(true);
  }, [selectedIndex, speak]);

  return (
    <PageContentLayout
      headerContent={<PageContentLayoutGameHeader title={"Английский алфавит"} />}
      withMainHeader={false}
      headerDivider
      mainContent={
        <div className={styles.alphabetWrapper}>
          {LETTERS_ENG.letters.map((l, idx) => (
            <MenuButton
              key={idx}
              onClick={() => {
                handleLetterClick(idx);
              }}
              color={idx === selectedIndex ? "accent" : "normal"}
              className={styles.letterButton}
              aria-label={`Буква ${l.letter}`}
            >
              <Typography
                view={"p-44"}
                tag={"span"}
                weight={"semibold"}
                color={"secondary"}
                className={styles.letter}
              >
                {l.letter.toUpperCase()}
              </Typography>
              {isAnimating && selectedIndex === idx && (
                <span
                  key={animationKey}
                  className={styles.flyingLetter}
                  onAnimationEnd={handleAnimationEnd}
                  aria-hidden="true"
                >
                  {l.examples[0].emo}
                </span>
              )}
            </MenuButton>
          ))}
        </div>
      }
      mainContentScroll
      footerContent={
        <div className={styles.footerContentWrapper}>
          {!speak && <Instruction hint={"Браузер не поддерживает воспроизведение речи"} />}
          <div style={{ width: "100%", display: "flex", alignItems: "center", columnGap: "8px" }}>
            <NavigateButton type={"back"} onClick={handlePrevLetter} disabled={!canScrollPrev} />
            {/* <MenuButton text={"Назад"} onClick={handlePrevLetter} disabled={!canScrollPrev} /> */}
            <MenuButton text={"Меню"} onClick={() => setGameStep(GAME_STEPS_ENUM.MENU)} />
            {/* <MenuButton text={"Вперёд"} onClick={handleNextLetter} disabled={!canScrollNext} /> */}
            <NavigateButton type={"forward"} onClick={handleNextLetter} disabled={!canScrollNext} />
          </div>
        </div>
      }
    />
  );
};
