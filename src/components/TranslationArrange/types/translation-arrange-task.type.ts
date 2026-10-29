import { TSlotValue } from "./types";

export type TTranslationArrangeTask = {
  id: string;
  rus: string;
  eng: string;
  emo: string;
  type: "noun" | "verb" | "adjective";
  category: "common" | "food" | "animals";
};

export type TTranslationArrangeTaskExt = TTranslationArrangeTask & {
  solved: boolean;
  slot: TSlotValue | null;
};
