import { useState, useEffect } from "react";
import styles from "./WordPartsBlock.module.scss";
import { WordPart } from "../../shared/ui/word-part/word-part";

type WordPartsBlockProps = {
  parts: string[];
  onDone: ()=>void;
};

export function WordPartsBlock({ parts, onDone }: WordPartsBlockProps) {
  const [activePart, setActivePart] = useState(0);
  const [visitedParts, setVisitedParts] = useState(new Set<number>([0]));

  useEffect(() => {
    setActivePart(0);
    setVisitedParts(new Set<number>([0]))
  }, [parts]);

  useEffect(() => {
    if(visitedParts.size === parts.length) onDone();
  }, [visitedParts.size]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {parts.map((text, idx) => (
          <WordPart
            key={idx}
            text={text}
            type="small"
            active={idx === activePart}
            onClick={() => {
              setActivePart(idx);
              setVisitedParts(state => state.add(idx));
            }}
          />
        ))}
      </div>
      <div className={styles.bottom}>
        {!!parts[activePart] && <WordPart text={parts[activePart]} type="big" />}
      </div>
    </div>
  );
}
