import { TImageItem } from "@/shared/types/types";

export type TStory = {
  id: number;
  title: string;
  content: string;
  idea: string;
  img?: TImageItem;
};
