export type TLettersArrangeTask = {
  id: number;
  description: string;
  word: string;
};

export type TLettersArrangeTaskExt = TLettersArrangeTask & { solved: boolean };

export type TLetter = {
  id: string;
  char: string;
};

export type TGameMessage = {
  type: "ok" | "err" | "info";
  text: string;
};
