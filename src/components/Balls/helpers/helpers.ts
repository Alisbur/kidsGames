import { getRandomFromArray } from "../../../shared/helpers/get-random-from-array";
import { FIELD_OPTIONS_SIZES } from "../config/field-options";
import { BALLS_COLOR_ENUM } from "../enum/ball-colors.enum";
import {
  TBallsEmptySlot,
  TBallsFieldState,
  TBallsLayer,
  TBallsRotateDirection,
  TBallsStack,
} from "../types/ball.type";
import { TBallsSettings } from "../types/settings.type";

export const generateInitFieldState = ({
  stacks,
  ballsInStack,
}: {
  stacks: number;
  ballsInStack: number;
}): TBallsFieldState => {
  const result: TBallsStack[] = [];

  Object.values(BALLS_COLOR_ENUM)
    .slice(0, stacks)
    .forEach((color) => {
      const newStack: TBallsStack = [];
      for (let i = 0; i < ballsInStack; i++) {
        newStack.push({ color });
      }
      result.push(newStack);
    });

  return {
    fieldState: result,
    emptySlot: { position: Math.floor(stacks / 2), ball: null },
  };
};

export const getLayersFromFieldState = (
  fieldState: TBallsFieldState
): TBallsLayer[] => {
  const layersArr: TBallsLayer[] = [];
  const { fieldState: field } = fieldState;

  for (let j = 0; j < field[0].length; j++) {
    const layer: TBallsLayer = [];
    for (let i = 0; i < field.length; i++) {
      layer.push(field[i][j]);
    }
    layersArr.push(layer);
  }
  return layersArr;
};

export const getFieldStateFromLayers = (
  layers: TBallsLayer[]
): TBallsStack[] => {
  const newFieldState: TBallsStack[] = new Array(layers[0].length)
    .fill(null)
    .map(() => []);
  layers.forEach((layer) => {
    layer.forEach((b, i) => {
      newFieldState[i].push(b);
    });
  });
  return newFieldState;
};

export const rotateLayer = (
  fieldState: TBallsFieldState,
  {
    direction,
    layerIdx,
  }: {
    direction: TBallsRotateDirection;
    layerIdx: number;
  }
): TBallsFieldState => {
  const layers: TBallsLayer[] = getLayersFromFieldState(fieldState);

  const rotateLeft = (): TBallsLayer[] => {
    layers[layerIdx] = [
      ...layers[layerIdx].slice(1, layers.length),
      layers[layerIdx][0],
    ];
    return layers;
  };

  const rotateRight = (): TBallsLayer[] => {
    layers[layerIdx] = [
      layers[layerIdx][layers[layerIdx].length - 1],
      ...layers[layerIdx].slice(0, layers[layerIdx].length - 1),
    ];
    return layers;
  };
  const newLayers = direction === "Right" ? rotateRight() : rotateLeft();
  const newFieldState = getFieldStateFromLayers(newLayers);
  return { ...fieldState, fieldState: newFieldState };
};

export const rotateEmptySlotLayer = (
  field: TBallsFieldState,
  direction: TBallsRotateDirection
) => {
  const { emptySlot, fieldState } = field;

  let newPosition = emptySlot.position;

  if (direction === "Right") {
    newPosition =
      emptySlot.position < fieldState.length - 1 ? emptySlot.position + 1 : 0;
  }
  if (direction === "Left") {
    newPosition =
      emptySlot.position > 0 ? emptySlot.position - 1 : fieldState.length - 1;
  }
  if (newPosition !== emptySlot.position) {
    const newEmptySlot = { ...emptySlot, position: newPosition };
    return { ...field, emptySlot: newEmptySlot };
  }
  return field;
};

export const onBallClick = (
  field: TBallsFieldState,
  {
    stackIdx,
    ballIdx,
  }: {
    stackIdx: number;
    ballIdx: number | null;
  }
): TBallsFieldState => {
  const { emptySlot, fieldState } = field;

  if (!emptySlot.ball?.color && stackIdx !== emptySlot.position)
    return { fieldState, emptySlot };

  if (ballIdx && fieldState[stackIdx][ballIdx] === null)
    return { fieldState, emptySlot };

  const extStack = [emptySlot.ball, ...fieldState[stackIdx]];
  const extStackBallIdx = ballIdx === null ? 0 : ballIdx + 1;

  let emptySlotIdx = null;
  let inc = 0;

  for (let i = 0; i < extStack.length; i++) {
    if (extStack[i] === null) {
      if (i > extStackBallIdx) {
        inc = -1;
      } else if (i < extStackBallIdx) {
        inc = 1;
      }
      if (inc !== 0) {
        emptySlotIdx = i;
        break;
      }
    }
  }

  if (inc === 0 || emptySlotIdx === null) return { fieldState, emptySlot };

  for (let i = emptySlotIdx; i !== extStackBallIdx; i += inc) {
    extStack[i] = extStack[i + inc];
  }

  extStack[extStackBallIdx] = null;
  const newEmptySlotState: TBallsEmptySlot = {
    ...emptySlot,
    ball: extStack[0],
  };
  const newStack = extStack.slice(1);
  const newFieldState = [...fieldState];
  newFieldState[stackIdx] = newStack;

  return { fieldState: newFieldState, emptySlot: newEmptySlotState };
};

const getIndexOfStackWithEmptyBall = (f: TBallsFieldState): number | null => {
  for (let i = 0; i < f.fieldState.length; i++) {
    for (let j = 0; j < f.fieldState[i].length; j++) {
      if (f.fieldState[i][j] === null) {
        return i;
      }
    }
  }
  return null;
};

// const rotateRandomLayers = (f: TBallsFieldState): TBallsFieldState => {
//   const stackItemsCount = f.fieldState[0].length;
//   let newFieldState = { ...f };

//   // const rotatesCount = Math.floor(Math.random() * stackItemsCount);
//   const rotatesCount = getRandomValueFromRange({ max: 10 });

//   for (let i = 0; i < rotatesCount; i++) {
//     const randomLayerIdx: number = getRandomValueFromRange({
//       max: stackItemsCount - 1,
//     });
//     const randomDirection: TBallsRotateDirection =
//       Math.random() >= 0.5 ? "Right" : "Left";
//     newFieldState = {
//       ...rotateLayer(newFieldState, {
//         layerIdx: randomLayerIdx,
//         direction: randomDirection,
//       }),
//     };
//   }
//   return newFieldState;
// };

// const rotateRandomLayersExceptLowest = (
//   f: TBallsFieldState
// ): TBallsFieldState => {
//   const stackItemsCount = f.fieldState[0].length;
//   let newFieldState = { ...f };

//   const rotatesCount = getRandomValueFromRange({ max: 10 });

//   for (let i = 0; i < rotatesCount; i++) {
//     const randomLayerIdx: number = getRandomValueFromRange({
//       max: stackItemsCount - 2,
//     });
//     const randomDirection: TBallsRotateDirection =
//       Math.random() >= 0.5 ? "Right" : "Left";
//     newFieldState = {
//       ...rotateLayer(newFieldState, {
//         layerIdx: randomLayerIdx,
//         direction: randomDirection,
//       }),
//     };
//   }
//   return newFieldState;
// };

export const getRotateRandomLayersCommand = (
  settings: TBallsSettings,
  withLowestLevel: boolean = true
): Array<{
  side: TBallsRotateDirection | null;
}> => {
  const layersQuantity =
    FIELD_OPTIONS_SIZES[settings.fieldSizeType].ballsInStack;

  const commands: Array<{ side: TBallsRotateDirection | null }> = new Array(
    layersQuantity
  )
    .fill(null)
    .map((_, idx) => ({
      side:
        !withLowestLevel && idx === layersQuantity - 1
          ? null
          : getRandomFromArray([getRandomFromArray<TBallsRotateDirection>(["Left", "Right"]), null]),
    }));

  return commands;
};

// const getBallFromRandomStack = (f: TBallsFieldState): TBallsFieldState => {
//   if (f.emptySlot.ball !== null) return f;

//   const layerItemsCount = f.fieldState.length;
//   const stackItemsCount = f.fieldState[0].length;

//   const randomStackIdx: number = getRandomValueFromRange({
//     max: stackItemsCount - 1,
//   });
//   const randomLayerIdx: number = getRandomValueFromRange({
//     max: layerItemsCount - 1,
//   });

//   const newEmptySlot = { ...f.emptySlot };
//   newEmptySlot.position = randomStackIdx;
//   const fs = { fieldState: [...f.fieldState], emptySlot: newEmptySlot };

//   const newFieldState = onBallClick(fs, {
//     stackIdx: randomStackIdx,
//     ballIdx: randomLayerIdx,
//   });

//   return newFieldState;
// };

const getBallFromStackBelowEmptySlot = (
  f: TBallsFieldState
): TBallsFieldState => {

  if (f.emptySlot.ball !== null) return f;

  const stackItemsCount = f.fieldState[0].length;
  const stackIdx: number = f.emptySlot.position;
  const layerIdx: number = stackItemsCount - 1;

  const newFieldState = onBallClick(f, {
    stackIdx: stackIdx,
    ballIdx: layerIdx,
  });

  return newFieldState;
};

const getBallFromEmptySlot = (f: TBallsFieldState): TBallsFieldState => {
  if (f.emptySlot.ball === null) return f;

  const stackIdx = getIndexOfStackWithEmptyBall(f);
  if (stackIdx === null) return f;

  const newEmptySlot = { ...f.emptySlot };
  newEmptySlot.position = stackIdx;
  const fs = { fieldState: [...f.fieldState], emptySlot: newEmptySlot };
  const newFieldState = onBallClick(fs, { stackIdx, ballIdx: null });

  return newFieldState;
};

// export const shuffleOnce = (field: TBallsFieldState): TBallsFieldState => {
//   const stepOneField = getBallFromStackBelowEmptySlot(field);
//   const stepTwoField = rotateRandomLayers(stepOneField);
//   const stepThreeField = getBallFromEmptySlot(stepTwoField);
//   return stepThreeField;
// };

export const shuffleStep = (
  field: TBallsFieldState,
  step: number
): TBallsFieldState => {
  switch (step) {
    case 1:
      return getBallFromStackBelowEmptySlot(field);
    case 2:
      return getBallFromEmptySlot(field);
    default:
      return field;
  }
};
