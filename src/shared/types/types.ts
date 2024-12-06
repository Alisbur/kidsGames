import pics from "../../assets/images";

export type TMenuItem = {
  id: number,
  name: string,
  alias: string,
}

export type TImageItem = keyof typeof pics;

export type TWordItem = {
  id: number,
  word: string,
  parts: string[],
  image: TImageItem;
}

