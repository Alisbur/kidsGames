import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export const OPERATION_SIGNS: Record<keyof typeof EXAMPLE_TYPES_ENUM, string> = {
  [EXAMPLE_TYPES_ENUM.SUM]: "+",
  [EXAMPLE_TYPES_ENUM.SUB]: "-",
  [EXAMPLE_TYPES_ENUM.MUL]: "×",
  [EXAMPLE_TYPES_ENUM.DIV]: ":",
};
