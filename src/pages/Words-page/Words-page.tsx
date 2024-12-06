import {useState} from "react";
import styles from "./Words-page.module.scss";
import { NavBlock } from "../../components/NavBlock/NavBlock";
import { ImageCard } from "../../shared/ui/Image-card/Image-card";
import { WordPartsBlock } from "../../components/WordPartsBlock/WordPartsBlock";
import { WORDS } from "../../shared/constants/words";

export function WordsPage() {
  const [currentWord, setCurrentWord] = useState(0);

  const backHandler = () => {
    if(currentWord > 0) setCurrentWord(currentWord-1);
  }

  const forwardkHandler = () => {
    if(currentWord < WORDS.length - 1) setCurrentWord(currentWord+1);
  }

  return (
    <div className={styles.container}>
      <ImageCard name={WORDS[currentWord].image} />
      <WordPartsBlock parts={WORDS[currentWord].parts} />
      <NavBlock onPrev={backHandler} onNext={forwardkHandler} />
    </div>
  );
}
