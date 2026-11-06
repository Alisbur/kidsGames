import { FC } from "react";

import { MenuItemListLayout } from "@/shared/layouts/menu-items-list-layout/menu-items-list-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";

import { TStory } from "../../types/story.type";

type TStoryListProps = {
  stories: TStory[];
  selectStory: (id: number) => void;
};

export const StoryList: FC<TStoryListProps> = ({ stories, selectStory }) => {
  return (
    <MenuItemListLayout>
      {stories.map((s) => (
        <MenuButton
          key={s.id}
          text={s.title}
          onClick={() => {
            selectStory(s.id);
          }}
        />
      ))}
    </MenuItemListLayout>
  );
};
