import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { TNumsArrangeTaskExt } from "../types/nums-arrange-task.type";

export const generateNumsArrageTask = ({
  id,
  limit = 10,
  type = EXAMPLE_TYPES_ENUM.SUM,
  solved = false,
}: {
  id: number;
  limit?: number;
  type: EXAMPLE_TYPES_ENUM;
  solved?: boolean;
}): TNumsArrangeTaskExt => {
  switch (type) {
    case EXAMPLE_TYPES_ENUM.SUM: {
      const firstItem = Math.ceil(Math.random() * limit);
      const secondItem = Math.ceil(Math.random() * limit);
      const result = firstItem + secondItem;
      return { id, firstItem, secondItem, result, type, solved };
    }
    case EXAMPLE_TYPES_ENUM.SUB: {
      const secondItem = Math.ceil(Math.random() * limit);
      const firstItem = Math.ceil(Math.random() * (limit - secondItem) + secondItem);
      const result = firstItem - secondItem;
      return { id, firstItem, secondItem, result, type, solved };
    }
    case EXAMPLE_TYPES_ENUM.MUL: {
      const secondItem = Math.ceil(Math.random() * limit);
      const firstItem = Math.ceil(Math.random() * limit);
      const result = firstItem * secondItem;
      return { id, firstItem, secondItem, result, type, solved };
    }
    case EXAMPLE_TYPES_ENUM.DIV: {
      const secondItem = Math.ceil(Math.random() * (limit / 3));
      const firstItem = Math.floor(Math.random() * (limit / secondItem)) * secondItem;
      const result = Math.round(firstItem / secondItem);
      return { id, firstItem, secondItem, result, type, solved };
    }

    default: {
      const _exhaustiveCheck: never = type;
      throw new Error(`Wrong example type ${_exhaustiveCheck}`);
    }
  }
};
