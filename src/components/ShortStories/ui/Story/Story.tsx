import { FC } from "react";

import pics from "@/assets/images";

import { TStory } from "../../types/story.type";
import styles from "./Story.module.scss";

type TStoryProps = {
  story: TStory;
};

export const Story: FC<TStoryProps> = ({ story }) => {
  const image = story.img ? pics[story.img] : null;

  return (
    <article className={styles.story}>
      {story.content}
      {image && (
        <div className={styles.imgWrapper}>
          <img key={story.id} src={image} className={styles.img} loading="lazy" alt={story.title} />
        </div>
      )}
    </article>
  );
};
