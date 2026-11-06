import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { LETTERS_ENG } from "@/components/LettersLearning/constants/letters";
import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLetterClick = (index: number) => {
    setSelectedIndex(index);
    setIsAnimating(true);
    setAnimationKey((k) => k + 1);
  };

  const handlePrevLetter = () => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex - 1;
    if (newIndex >= 0) {
      setSelectedIndex(newIndex);
      setIsAnimating(true);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleNextLetter = () => {
    let newIndex;
    if (selectedIndex === null) newIndex = 0;
    else newIndex = selectedIndex + 1;
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
    if (selectedIndex === null) return;
    const canGoPrev = selectedIndex > 0;
    const canGoNext = selectedIndex < LETTERS_ENG.letters.length - 1;
    setCanScrollNext(canGoNext);
    setCanScrollPrev(canGoPrev);
    speak?.(LETTERS_ENG.letters[selectedIndex].letter);
  }, [selectedIndex, speak]);

  return (
    <PageContentLayout
      headerContent={<PageContentLayoutGameHeader title={"Английский алфавит"} />}
      withMainHeader={false}
      headerDivider
      mainDivider
      mainContent={
        <ul className={styles.alphabetWrapper}>
          {LETTERS_ENG.letters.map((l, idx) => (
            <li className={styles.letterButtonWrapper} key={idx}>
              <MenuButton
                onClick={() => {
                  handleLetterClick(idx);
                }}
                color={idx === selectedIndex ? "accent" : l.wowel ? "error" : "normal"}
                className={styles.letterButton}
                aria-label={`Буква ${l.letter}`}
              >
                <Typography
                  view={"p-44"}
                  tag={"span"}
                  weight={"semibold"}
                  color={"secondary"}
                  className={classNames(styles.letter)}
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
            </li>
          ))}
        </ul>
      }
      mainContentScroll
      footerContent={
        <FooterControlsLayout type={"vertical"}>
          {!speak && <Instruction hint={"Браузер не поддерживает воспроизведение речи"} />}
          <FooterControlsLayout>
            <NavigateButton
              type={"back"}
              onClick={handlePrevLetter}
              disabled={!canScrollPrev}
              fullWidth
            />
            <MenuButton
              text={"Меню игры"}
              onClick={() => setGameStep(GAME_STEPS_ENUM.MENU)}
              textNoWrap
            />
            <NavigateButton
              type={"forward"}
              onClick={handleNextLetter}
              disabled={!canScrollNext}
              fullWidth
            />
          </FooterControlsLayout>
        </FooterControlsLayout>
      }
    />
  );
};
