import { useState, useEffect } from "react";
import styles from "./Words-page.module.scss";
import { NavBlock } from "../../components/NavBlock/NavBlock";
import { ImageCard } from "../../shared/ui/Image-card/Image-card";
import { WordPartsBlock } from "../../components/WordPartsBlock/WordPartsBlock";
import { WORDS } from "../../shared/constants/words";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";
import { TImageItem } from "../../shared/types/types";

export function WordsPage() {
  const [currentWord, setCurrentWord] = useState(0);
  const [allPartsAreOpen, setAllPartsAreOpen] = useState(false);
  const [currentPic, setCurrentPic] = useState<TImageItem>("question")

  useEffect(()=>{
    setAllPartsAreOpen(false);
    setCurrentPic("question");
  },[currentWord])

  const backHandler = () => {
    if (currentWord > 0) setCurrentWord((state) => state - 1);
  };

  const forwardHandler = () => {
    if (currentWord < WORDS.length - 1) setCurrentWord((state) => state + 1);
  };

  const randomHandler = () => {
    setCurrentWord(Math.floor(Math.random() * WORDS.length));
  };

  const handleDone = () => {
    setAllPartsAreOpen(true);
    setCurrentPic("questionHand");
  }

  const imageClickHandler = () => {
    if(allPartsAreOpen) setCurrentPic(WORDS[currentWord].image);
  }

  return (
    <div className={styles.container}>
      <ImageCard name={currentPic} onClick={imageClickHandler}/>
      <WordPartsBlock parts={WORDS[currentWord].parts} onDone={handleDone}/>
      <NavBlock
        onPrev={backHandler}
        onNext={forwardHandler}
        prevDisabled={currentWord <= 0}
        nextDisabled={currentWord >= WORDS.length - 1}
      >
        <MenuButton
          text="Случайное слово"
          onClick={randomHandler}
          style={{ width: "fit-content", paddingInline: "15px" }}
        />
      </NavBlock>
    </div>
  );
}
