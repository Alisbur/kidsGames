import { useCallback, useState } from "react";

import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";
import { Typography } from "@/shared/ui/typography/typography";

import { SHORT_STORIES } from "./constants/stories";
import styles from "./ShortStories.module.scss";
import { Story } from "./ui/Story/Story";
import { StoryList } from "./ui/StoryList/StoryList";

export const ShortStories = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const handleNextStory = () => {
    if (selectedStory !== null) {
      setSelectedStory((prev) => prev! + 1);
    }
  };

  const handlePrevStory = () => {
    if (selectedStory !== null) {
      setSelectedStory((prev) => prev! - 1);
    }
  };

  const handleSelectStory = useCallback((id: number) => {
    const storyIndex = SHORT_STORIES.findIndex((s) => s.id === id);
    if (storyIndex >= 0) {
      setSelectedStory(storyIndex);
    }
  }, []);

  const handleSelectRandomStory = useCallback(() => {
    const storyIndex = Math.floor(Math.random() * SHORT_STORIES.length);
    setSelectedStory(storyIndex);
  }, []);

  if (selectedStory === null) {
    return (
      <PageContentLayout
        headerContent={
          <Typography
            view={"title"}
            tag={"h2"}
            weight={"bold"}
            color={"primary"}
            className={styles.title}
          >
            Оглавление
          </Typography>
        }
        mainContent={<StoryList stories={SHORT_STORIES} selectStory={handleSelectStory} />}
        mainContentScroll={true}
        mainDivider
        footerContent={
          <MenuButton
            text={"Случайная история"}
            onClick={handleSelectRandomStory}
            disabled={selectedStory === 0}
          />
        }
      />
    );
  }

  return (
    <PageContentLayout
      withMainHeader={false}
      headerContent={<PageContentLayoutGameHeader title={SHORT_STORIES[selectedStory].title} />}
      headerDivider
      mainContent={<Story story={SHORT_STORIES[selectedStory]} />}
      mainContentScroll={true}
      preserveMainContentScrollPosition={false}
      mainDivider
      footerContent={
        <div style={{ width: "100%", display: "flex", gap: "16px" }}>
          <MenuButton text={"<<"} onClick={handlePrevStory} disabled={selectedStory === 0} />
          <MenuButton text={"Меню"} onClick={() => setSelectedStory(null)} />
          <MenuButton
            text={">>"}
            onClick={handleNextStory}
            disabled={selectedStory === SHORT_STORIES.length - 1}
          />
        </div>
      }
    />
  );
};
