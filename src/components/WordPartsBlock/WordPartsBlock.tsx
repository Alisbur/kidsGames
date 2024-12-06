import {useState, useEffect} from "react";
import styles from "./WordPartsBlock.module.scss"
import { WordPart } from "../../shared/ui/word-part/word-part";

type WordPartsBlockProps = {
  parts: string[];
}

export function WordPartsBlock({parts}: WordPartsBlockProps) {

  const [activePart, setActivePart] = useState(0);

  useEffect(()=>{
    setActivePart(0);
  }, [parts])

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {parts.map((text, idx) => <WordPart key={idx} text={text} type="small" active={idx===activePart} onClick={()=>{setActivePart(idx)}}/>)}
      </div>
      <div className={styles.bottom}>
        <WordPart text={parts[activePart]} type="big" />                
      </div>
    </div>
  )
}