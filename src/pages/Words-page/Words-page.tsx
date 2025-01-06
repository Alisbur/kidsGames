import { useState, useEffect } from "react";
import styles from "./Words-page.module.scss";
import { NavBlock } from "../../components/NavBlock/NavBlock";
import { ImageCard } from "../../shared/ui/Image-card/Image-card";
import { WordPartsBlock } from "../../components/WordPartsBlock/WordPartsBlock";
import { WORDS } from "../../shared/constants/words";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";
import { TImageItem } from "../../shared/types/types";

const getRandomPic = (): number => Math.floor(Math.random() * WORDS.length);

export function WordsPage() {
  const firstItem = 0;
  const [currentWord, setCurrentWord] = useState(firstItem);
  const [allPartsAreOpen, setAllPartsAreOpen] = useState(false);
  const [currentPic, setCurrentPic] = useState<TImageItem>("question");
  const [lastItems, setLastItems] = useState<number[]>([])

  useEffect(()=>{
    setAllPartsAreOpen(false);
    setCurrentPic("question");
    setLastItems(state => state.length > 4 ? [...state.slice(1), currentWord] : [...state, currentWord]);
  },[currentWord])

  const backHandler = () => {
    if (currentWord > 0) setCurrentWord((state) => state - 1);
  };

  const forwardHandler = () => {
    if (currentWord < WORDS.length - 1) setCurrentWord((state) => state + 1);
  };

  const randomHandler = () => {
    let newRandom: number = getRandomPic();
    while(WORDS.length > 1 && lastItems.includes(newRandom)){
      newRandom = getRandomPic();
    }
    setCurrentWord(newRandom);
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
