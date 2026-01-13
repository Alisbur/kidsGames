import { TExample } from "../types/example.type";
import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";

export const generateExample = ({
  limit = 10,
  type = EXAMPLE_TYPES_ENUM.SUM,
  solved = false
}: {
  limit: number;
  type: EXAMPLE_TYPES_ENUM;
  solved: boolean;
}): TExample => {
  switch (type) {
    case EXAMPLE_TYPES_ENUM.SUB: {
      const secondItem = Math.ceil(Math.random() * limit);
      const firstItem = Math.ceil(
        Math.random() * (limit - secondItem) + secondItem
      );
      const result = firstItem - secondItem;
      return { firstItem, secondItem, result, type, solved };
    }
    case EXAMPLE_TYPES_ENUM.MUL: {
      const secondItem = Math.ceil(Math.random() * limit);
      const firstItem = Math.ceil(Math.random() * limit);
      const result = firstItem * secondItem;
      return { firstItem, secondItem, result, type, solved };
    }

    case EXAMPLE_TYPES_ENUM.DIV: {
      const secondItem = Math.ceil(Math.random() * (limit / 3));
      const firstItem =
        Math.floor(Math.random() * (limit / secondItem)) * secondItem;
      const result = Math.round(firstItem / secondItem);
      return { firstItem, secondItem, result, type, solved };
    }
    default: {
      const firstItem = Math.ceil(Math.random() * limit);
      const secondItem = Math.ceil(Math.random() * limit);
      const result = firstItem + secondItem;
      return { firstItem, secondItem, result, type, solved };
    }
  }
};
