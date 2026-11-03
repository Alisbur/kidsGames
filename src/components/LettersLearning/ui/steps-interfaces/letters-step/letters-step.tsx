import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

import { LETTERS_ENG } from "@/components/LettersLearning/constants/letters";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { HScroller } from "@/shared/ui/h-scroller/h-scroller";
import { Instruction } from "@/shared/ui/instruction/instruction";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";
import { Typography } from "@/shared/ui/typography/typography";

import { GAME_STEPS_ENUM } from "../../../enums/game-steps.enum";
import { TSettings } from "../../../types/settings.type";
import { Carousel } from "../../carousel/carousel";
import styles from "./letters-step.module.scss";

type TLettersStepProps = {
  speak: ((input: string | string[], pause?: number) => void) | null;
  setGameStep: Dispatch<SetStateAction<GAME_STEPS_ENUM>>;
  settings: TSettings;
};

export const LettersStep: FC<TLettersStepProps> = ({ speak, setGameStep }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);

      const scroller = scrollerRef.current;
      if (!scroller) return;

      if (scroller) {
        const activeChild = scroller.children[index];
        if (activeChild) {
          activeChild.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    };
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleLetterClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  return (
    <PageContentLayout
      withMainHeader={false}
      headerContent={<PageContentLayoutGameHeader title={"Буквы в английском языке"} />}
      headerDivider
      mainContent={
        <div className={styles.carouselWrapper}>
          <Carousel items={LETTERS_ENG} speak={speak} emblaRef={emblaRef} />
        </div>
      }
      footerContent={
        <div className={styles.footerContentWrapper}>
          {!speak && <Instruction hint={"Браузер не поддерживает воспроизведение речи"} />}
          <HScroller className={styles.wrapper}>
            <div className={styles.pool} ref={scrollerRef}>
              {LETTERS_ENG.letters.map((l, idx) => (
                <MenuButton
                  key={idx}
                  onClick={() => {
                    handleLetterClick(idx);
                  }}
                  color={idx === selectedIndex ? "accent" : "normal"}
                  className={styles.poolButton}
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
                </MenuButton>
              ))}
            </div>
          </HScroller>
          <div style={{ width: "100%", display: "flex", alignItems: "center", columnGap: "8px" }}>
            <MenuButton
              text={"Назад"}
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
            />
            <MenuButton text={"Меню"} onClick={() => setGameStep(GAME_STEPS_ENUM.MENU)} />
            <MenuButton
              text={"Вперёд"}
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
            />
          </div>
        </div>
      }
    />
  );
};
