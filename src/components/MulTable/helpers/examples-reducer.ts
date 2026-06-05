import { EXAMPLE_ACTIONS_ENUM } from "../enums/example-actions.enum";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { SHOULD_SHUFFLE_EXAMPLES_ENUM } from "../enums/should-shuffle-examples.enum";
import { TExample } from "../types/example.type";
import { TExampleAction } from "../types/example-actions.type";

const MUL_VALUE_LIMIT = 10;

export const examplesReducer = (state: TExample[], action: TExampleAction) => {
  const actionType = action.type;

  switch (actionType) {
    case EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES: {
      const { limit = MUL_VALUE_LIMIT, baseValues } = action.payload;
      const examples: TExample[] = [];
      const exampleType = EXAMPLE_TYPES_ENUM.MUL;

      baseValues.forEach((bv) => {
        for (let i = 1; i <= limit; i++) {
          const newExample: TExample = {
            firstItem: bv,
            secondItem: i,
            type: exampleType,
            solved: false,
            result: i * bv,
          };
          examples.push(newExample);
        }
      });
      if (action.payload.shouldShuffleExamples === SHOULD_SHUFFLE_EXAMPLES_ENUM.YES) {
        for (let i = 0; i < examples.length; i++) {
          const rand = Math.floor(Math.random() * examples.length);
          const temp = examples[i];
          examples[i] = examples[rand];
          examples[rand] = temp;
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
