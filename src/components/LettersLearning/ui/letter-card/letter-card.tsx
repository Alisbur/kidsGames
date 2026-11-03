import { Play } from "lucide-react";
import { FC } from "react";

import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import { TLetter } from "../../types/letter.type";
import styles from "./letter-card.module.scss";

type TLetterCardProps = {
  letter: TLetter;
  speak: ((input: string | string[], pause?: number) => void) | null;
  cardMaxWidth: number;
};

export const LetterCard: FC<TLetterCardProps> = ({ letter, speak, cardMaxWidth }) => {
  return (
    <div className={styles.wrapper} style={{ maxWidth: `${cardMaxWidth}px` }}>
      <div className={styles.cardWrapper} style={{ maxWidth: `${cardMaxWidth}px` }}>
        <div className={styles.letters}>
          <Typography
            tag={"span"}
            weight={"bold"}
            color={letter.wowel ? "success" : "accent"}
            className={styles.upperLetter}
          >
            {letter.letter.toUpperCase()}
          </Typography>
          {"  "}
          <Typography
            tag={"span"}
            weight={"bold"}
            color={letter.wowel ? "success" : "accent"}
            className={styles.lowerLetter}
          >
            {letter.letter.toLowerCase()}
          </Typography>
        </div>
        <MenuButton
          onClick={() => speak?.([letter.letter, letter.examples[0].word], 500)}
          disabled={!speak}
          fullWidth={false}
          color={letter.wowel ? "accent" : "normal"}
          aria-label={`Произнести букву ${letter.letter}`}
          className={styles.playButton}
        >
          <Play size={20} color="white" />
          {!!speak && <span className={styles.pulseRing} aria-hidden="true" />}
        </MenuButton>
      </div>

      <div className={styles.wordWithIconWrapper} style={{ cursor: speak ? "pointer" : "auto" }}>
        <Typography tag={"div"} size={44} weight={"semibold"} color={"muted"}>
          {letter.examples[0].emo}
        </Typography>
        <span>
          {[...letter.examples[0].word].map((l, idx) => (
            <Typography
              key={idx}
              tag={"span"}
              size={44}
              weight={"semibold"}
              color={
                l.toLocaleLowerCase() === letter.letter.toLocaleLowerCase() ? "error" : "muted"
              }
            >
              {l}
            </Typography>
          ))}
        </span>
      </div>
    </div>
  );
};
