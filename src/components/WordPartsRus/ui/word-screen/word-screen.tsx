import { FC, useEffect, useRef, useState } from "react";

import { useElementDimensions } from "@/shared/hooks/useElementDimensions";
import { CheckBoxButton } from "@/shared/ui/checkbox-button/checkbox-button";
import { Typography } from "@/shared/ui/typography/typography";

import { TWord } from "../../types/word.type";
import styles from "./word-screen.module.scss";

type TWordScreenProps = {
  word: TWord;
  speak: ((input: string | string[], pause?: number) => void) | null;
};

const normalizeParts = (word: TWord): { part: string; done: boolean }[] => {
  const parts = word.wordRusByParts.map((p) => ({
    part: p.toUpperCase(),
    done: false,
  }));
  return parts;
};

const clampLetterSize = ({ size, min = 0, max }: { size: number; min?: number; max: number }) => {
  if (size > max) return max;
  if (size < min) return min;
  return size;
};

const calculateLeterSize = ({
  width,
  height,
  letters,
}: {
  width: number;
  height: number;
  letters: number;
}): number => {
  const LETTER_LINE_HEIGHT = 1.2;

  const letterHeight = height / LETTER_LINE_HEIGHT;
  const letterWidth = width / letters;
  const res = Math.min(letterHeight, letterWidth);

  console.log(width, height, letterWidth, letterHeight, res, letters);

  return res;
};

export const WordScreen: FC<TWordScreenProps> = ({ word, speak }) => {
  const [wordParts, setWordParts] = useState<{ part: string; done: boolean }[]>(
    normalizeParts(word),
  );
  const [wordIsDone, setWordIsDone] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showEmo, setShowEmo] = useState(false);
  const [bigLetterSize, setBigLetterSize] = useState<number | null>(null);
  const [partLetterSize, setPartLetterSize] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const partsDivRef = useRef<HTMLDivElement>(null);

  const dimensions = useElementDimensions(divRef);
  const partsDimensions = useElementDimensions(partsDivRef);

  useEffect(() => {
    if (wordParts.every((p) => p.done)) setWordIsDone(true);
  }, [wordParts]);

  useEffect(() => {
    if (
      !divRef.current ||
      !partsDivRef.current ||
      !dimensions.elementHeight ||
      !dimensions.elementWidth ||
      !partsDimensions.elementHeight ||
      !partsDimensions.elementWidth
    )
      return;

    const bigSize = calculateLeterSize({
      height: dimensions.elementHeight,
      width: dimensions.elementWidth,
      letters: Math.max(...wordParts.map((el) => el.part.length)),
    });
    const size = calculateLeterSize({
      height: partsDimensions.elementHeight,
      width: partsDimensions.elementWidth,
      letters: word.wordRus.length + wordParts.length + 2,
    });
    const clampedSize = clampLetterSize({ size, max: 40, min: 16 });
    setBigLetterSize(bigSize);
    setPartLetterSize(clampedSize);
  }, [
    dimensions.elementHeight,
    dimensions.elementWidth,
    partsDimensions.elementHeight,
    partsDimensions.elementWidth,
    word,
    wordParts,
  ]);

  const handlePartClick = (idx: number) => {
    setSelectedIdx(idx);
  };

  useEffect(() => {
    if (!wordParts[selectedIdx].done) {
      setWordParts((prev) =>
        prev.map((p, i) => (i === selectedIdx ? { ...p, done: true } : { ...p })),
      );
    }
  }, [selectedIdx, wordParts]);

  return (
    <section className={styles.wrapper}>
      <div
        className={styles.emoWrapper}
        style={{ cursor: wordIsDone ? "pointer" : "auto" }}
        onClick={() => {
          if (wordIsDone) {
            setShowEmo(wordIsDone);
            speak?.(word.wordRus);
          }
        }}
      >
        <Typography size={100} tag={"span"} color={"accent"}>
          {showEmo ? (
            word.emo
          ) : (
            <span style={{ opacity: "0.7", fontSize: "150px" }} aria-hidden="true">
              ?
            </span>
          )}
        </Typography>
        {wordIsDone && !showEmo && (
          <Typography size={50} tag={"span"} aria-hidden="true" className={styles.handPointer}>
            {"👆"}
          </Typography>
        )}
      </div>
      <div className={styles.partsWrapper} ref={partsDivRef}>
        {partLetterSize &&
          wordParts.map((p, idx) => (
            <CheckBoxButton
              key={idx}
              checked={selectedIdx === idx}
              onClick={() => handlePartClick(idx)}
              className={styles.part}
              aria-label={`${!p.done ? "Добавить и произнести" : "Убрать"} букву ${p.part}`}
              aria-pressed={p.done}
            >
              <Typography
                size={partLetterSize}
                tag={"span"}
                color={"secondary"}
                weight={"semibold"}
              >
                {p.part}
              </Typography>
            </CheckBoxButton>
          ))}
      </div>
      <div style={{ width: "100%", height: "100%" }} ref={divRef}>
        <button
          type="button"
          aria-label="Произнести собранное слово"
          className={styles.bigWordPart}
          onClick={() => {
            speak?.(wordParts.map((el) => (el.done ? el.part : "")).join(""));
          }}
        >
          {bigLetterSize && (
            <Typography size={bigLetterSize} tag={"span"} color={"secondary"} weight={"semibold"}>
              {wordParts[selectedIdx].part}
            </Typography>
          )}
        </button>
      </div>
    </section>
  );
};
