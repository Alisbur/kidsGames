import { FC } from "react";

import styles from "./Story.module.scss";

type TStoryProps = {
  content: string;
};

export const Story: FC<TStoryProps> = ({ content }) => {
  return <article className={styles.story}>{content}</article>;
};
