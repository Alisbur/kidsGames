import { EXAMPLE_ACTIONS_ENUM } from "../enums/example-actions.enum";
import { TSettings } from "./settings.type";
import { TSolution } from "./solution.type";

export type TExampleAction =
  | { type: EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES; payload: TSettings }
  | { type: EXAMPLE_ACTIONS_ENUM.SET_SOLVED; payload: { idx: number; solution: TSolution } };
