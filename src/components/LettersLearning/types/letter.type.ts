export type TLang = "en-EN" | "ru-RU";

export type TWordExample = {
  word: string;
  emo: string;
};

export type TLetter = {
  id: number;
  letter: string;
  wowel: boolean;
  examples: TWordExample[];
};

export type TLetersSet = {
  lang: TLang;
  letters: TLetter[];
};
