export type TWordType = "noun" | "adjective" | "verb" | "adverb";

export type TWord = {
  id: number;
  emo: string;
  wordRus: string;
  // wordRusByParts: string[];
  wordEng: string;
  wordType: TWordType;
};
