import { FC } from "react";

import { MenuButton } from "@/shared/ui/menu-button/menu-button";

import { TStory } from "../../types/story.type";
import styles from "./StoryList.module.scss";

type TStoryListProps = {
  stories: TStory[];
  selectStory: (id: number) => void;
};

export const StoryList: FC<TStoryListProps> = ({ stories, selectStory }) => {
  return (
    <div className={styles.storyList}>
      {stories.map((s) => (
        <MenuButton
          text={s.title}
          onClick={() => {
            selectStory(s.id);
          }}
        />
      ))}
    </div>
  );
};
