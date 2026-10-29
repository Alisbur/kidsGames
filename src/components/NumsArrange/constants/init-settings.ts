import { EXAMPLE_TYPES_ENUM } from "../enums/example-types.enum";
import { TSettings } from "../types/settings.type";

export const INIT_SETTINGS: TSettings = {
  type: [EXAMPLE_TYPES_ENUM.SUM],
  tasksQuantity: 10,
  extraTilesQuantity: 1,
  limit: 10,
};
