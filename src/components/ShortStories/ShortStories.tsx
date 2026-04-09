import { useState } from "react";

import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import { SHORT_STORIES } from "./constants/stories";
import { Story } from "./ui/Story/Story";

export const ShortStories = () => {
  const [selectedStory, setSelectedStory] = useState<number>(0);

  const handleSwitchStory = () => {
    if (selectedStory === SHORT_STORIES.length - 1) setSelectedStory(0);
    else setSelectedStory((prev) => prev + 1);
  };

  return (
    <PageContentLayout
      headerContent={
        <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
          {SHORT_STORIES[selectedStory].title}
        </Typography>
      }
      mainContent={<Story content={SHORT_STORIES[selectedStory].content} />}
      mainContentScroll={true}
      mainDivider
      footerContent={<MenuButton text={"Назад"} onClick={handleSwitchStory} />}
    />
  );
};
