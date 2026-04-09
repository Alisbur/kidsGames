import { useState } from "react";

import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import { SHORT_STORIES } from "./constants/stories";
import styles from "./ShortStories.module.scss";
import { Story } from "./ui/Story/Story";

export const ShortStories = () => {
  const [selectedStory, setSelectedStory] = useState<number>(0);

  const handleNextStory = () => {
    setSelectedStory((prev) => prev + 1);
  };

  const handlePrevStory = () => {
    setSelectedStory((prev) => prev - 1);
  };

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
          {SHORT_STORIES[selectedStory].title}
        </Typography>
      }
      mainContent={<Story content={SHORT_STORIES[selectedStory].content} />}
      mainContentScroll={true}
      mainDivider
      footerContent={
        <div style={{ width: "100%", display: "flex", gap: "16px" }}>
          <MenuButton
            text={"Предыдущая"}
            onClick={handlePrevStory}
            disabled={selectedStory === 0}
          />
          <MenuButton
            text={"Следующая"}
            onClick={handleNextStory}
            disabled={selectedStory === SHORT_STORIES.length - 1}
          />
        </div>
      }
    />
  );
};
