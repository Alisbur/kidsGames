import { getRandomFromArray } from "../../../shared/helpers/get-random-from-array";
import { EXAMPLE_ACTIONS_ENUM } from "../enums/example-actions.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { TExample } from "../types/example.type";
import { TExampleAction } from "../types/example-actions.type";
import { generateExample } from "./generate-example";
import { isExampleUnique } from "./is-example-unique";

const MAX_ATTEMPTS = 50;

export const examplesReducer = (state: TExample[], action: TExampleAction) => {
  const actionType = action.type;

  switch (actionType) {
    case EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES: {
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
            if (isExampleUnique(examples, newExample) || attempt === MAX_ATTEMPTS) {
              examples.push(newExample);
              break;
            }
          }
        }
      }
      return examples;
    }
    case EXAMPLE_ACTIONS_ENUM.SET_SOLVED: {
      const newState = [...state];
      newState[action.payload].solved = true;
      return newState;
    }
    default: {
      const exhaustiveCheck: never = actionType;
      throw new Error(`Exhaustive check failed ${exhaustiveCheck}`);
    }
  }
};
