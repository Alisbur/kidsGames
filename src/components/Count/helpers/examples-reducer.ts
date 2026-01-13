import { EXAMPLE_ACTIONS_ENUM } from "../enums/example-actions.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { TExample } from "../types/example.type";
import { TSettings } from "../types/settings.type";
import { generateExample } from "./generate-example";
import { getRandomFromArray } from "../../../shared/helpers/get-random-from-array";
import { isExampleUnique } from "./is-example-unique";

const MAX_ATTEMPTS = 50;

export const examplesReducer = (
  state: TExample[],
  action: { type: EXAMPLE_ACTIONS_ENUM; payload?: TSettings | number }
) => {
  if (
    action.type === EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES &&
    typeof action.payload !== "number" &&
    action.payload &&
    action.payload.type.length
  ) {
    const { limit, type, quantity } = action.payload;
    const examples: TExample[] = [];

    for (let i = 0; i < quantity; i++) {
      const exampleType = getRandomFromArray<EXAMPLE_TYPES_ENUM>(type);
      let attempt = 0;

      if (exampleType) {
        while (true) {
          const newExample: TExample = generateExample({
            limit,
            type: exampleType,
            solved: false,
          });
          attempt++;
          if (
            isExampleUnique(examples, newExample) ||
            attempt === MAX_ATTEMPTS
          ) {
            examples.push(newExample);
            break;
          }
        }
      }
    }
    return examples;
  }
  if (
    action.type === EXAMPLE_ACTIONS_ENUM.SET_SOLVED &&
    typeof action.payload === "number"
  ) {
    const newState = [...state];
    newState[action.payload].solved = true;
    return newState;
  }
  return [];
};
