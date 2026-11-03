import { EmblaViewportRefType } from "embla-carousel-react";
import { FC } from "react";

import { TLetersSet } from "../../types/letter.type";
import { LetterCard } from "../letter-card/letter-card";

type TCarouselProps = {
  items: TLetersSet;
  speak: ((input: string | string[], pause?: number) => void) | null;
  emblaRef: EmblaViewportRefType;
};

const CARD_MAX_WIDTH = 320;

export const Carousel: FC<TCarouselProps> = ({ items, speak, emblaRef }) => {
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items.letters.map((letter) => (
            <div className="embla__slide" key={letter.id}>
              <LetterCard letter={letter} speak={speak} cardMaxWidth={CARD_MAX_WIDTH} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .embla {height: 100%; --slide-spacing: calc((100% - ${CARD_MAX_WIDTH}px) / 2); width: 100%; position: relative; }
        .embla__viewport {height: 100%; overflow: hidden; }
        .embla__container {height: 100%; display: flex; touch-action: pan-y pinch-zoom }
        .embla__slide { flex: 0 0 100%; min-width: 0; width: 100%; padding-left: var(--slide-spacing);}
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};
