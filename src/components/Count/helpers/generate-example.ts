import { TTaskSolution } from "@/shared/types/types";

import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { TExample } from "../types/example.type";

export const generateExample = ({
  limit = 10,
  type = EXAMPLE_TYPES_ENUM.SUM,
  solved = null,
}: {
  limit?: number;
  type: EXAMPLE_TYPES_ENUM;
  solved?: TTaskSolution;
}): TExample => {
  switch (type) {
    case EXAMPLE_TYPES_ENUM.SUM: {
      const firstItem = Math.round(Math.random() * (limit - 1) + 1);
      const secondItem = Math.round(Math.random() * (limit - 1) + 1);
      const result = firstItem + secondItem;
      return { firstItem, secondItem, result, type, solved };
    }
    case EXAMPLE_TYPES_ENUM.SUB: {
      const secondItem = Math.round(Math.random() * (limit - 2) + 1);
      const firstItem = Math.round(Math.random() * (limit - secondItem) + 1 + secondItem);
      const result = firstItem - secondItem;
      return { firstItem, secondItem, result, type, solved };
    }
    case EXAMPLE_TYPES_ENUM.MUL: {
      const firstItem = Math.round(Math.random() * (limit - 2) + 1);
      const secondItem = Math.round(Math.random() * (limit - 1) + 1);
      const result = firstItem * secondItem;
      return { firstItem, secondItem, result, type, solved };
    }
    case EXAMPLE_TYPES_ENUM.DIV: {
      const secondItem = Math.round(Math.random() * (limit > 10 ? limit / 3 : limit - 1) + 1);
      const firstItem = Math.floor(Math.random() * (limit / secondItem - 2) + 2) * secondItem;
      const result = firstItem / secondItem;
      return { firstItem, secondItem, result, type, solved };
    }

    default: {
      const _exhaustiveCheck: never = type;
      throw new Error(`Wrong example type ${_exhaustiveCheck}`);
    }
  }
};
