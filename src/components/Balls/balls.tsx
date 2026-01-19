import { useEffect, useState } from "react";

import styles from "./balls.module.scss";

import { GAME_STEPS as STEP } from "./enum/game-steps.enum";

import { PageContentLayout } from "../../shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";

import { Typography } from "../../shared/ui/typography/typography";
import { BALLS_COLOR_ENUM } from "./enum/ball-colors.enum";
import { BallsLayer } from "./ui/balls-layer/balls-layer";
import {
  TBall,
  TBallsEmptySlot,
  TBallsFieldState,
  TBallsLayer,
  TBallsRotateDirection,
  TBallsStack,
} from "./types/ball.type";
import { GameField } from "./ui/game-field/game-field";
import { EmtySlotLayer } from "./ui/empty-slot-layer/empty-slot-layer";

// const convertFieldStateToLayers
const STACKS_QUANTITY = Object.keys(BALLS_COLOR_ENUM).length;
const BALLS_IN_STACK = Object.keys(BALLS_COLOR_ENUM).length;

const generateInitFieldState = (): TBallsFieldState => {
  const result: TBallsFieldState = [];

  Object.values(BALLS_COLOR_ENUM).forEach((color) => {
    const newStack: TBallsStack = [];
    for (let i = 0; i < BALLS_IN_STACK; i++) {
      newStack.push({ color });
    }
    result.push(newStack);
  });

  return result;
};

export function Balls() {
  const getLayersFromFieldState = (field: TBallsFieldState): TBallsLayer[] => {
    const layersArr: TBallsLayer[] = [];

    for (let j = 0; j < field[0].length; j++) {
      const layer: TBallsLayer = [];
      for (let i = 0; i < field.length; i++) {
        layer.push(field[i][j]);
      }
      layersArr.push(layer);
    }
    return layersArr;
  };

  const getFieldStateFromLayers = (layers: TBallsLayer[]): TBallsFieldState => {
    const newFieldState: TBallsFieldState = new Array(layers[0].length)
      .fill(null)
      .map(() => []);
    layers.forEach((layer) => {
      layer.forEach((b, i) => {
        newFieldState[i].push(b);
      });
    });
    return newFieldState;
  };

  const rotateLayer = ({
    field,
    direction,
    layerIdx,
  }: {
    field: TBallsFieldState;
    direction: TBallsRotateDirection;
    layerIdx: number;
  }): TBallsFieldState => {
    const layers: TBallsLayer[] = getLayersFromFieldState(field);

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
    return newFieldState;
  };

  const onBallClick = ({
    fieldState,
    stackIdx,
    ballIdx,
    emptySlot,
  }: {
    fieldState: TBallsFieldState;
    stackIdx: number;
    ballIdx: number | null;
    emptySlot: TBallsEmptySlot;
  }): { fieldState: TBallsFieldState; emptySlot: TBallsEmptySlot } => {
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

  const [step, setStep] = useState<STEP>(STEP.INIT);
  const [fieldState, setFieldState] = useState<TBallsFieldState>(
    generateInitFieldState()
  );
  const [layers, setLayers] = useState<TBallsLayer[]>(
    getLayersFromFieldState(fieldState) ?? []
  );
  const [emptySlot, setEmptySlot] = useState<TBallsEmptySlot>({
    ball: null,
    position: Math.round(STACKS_QUANTITY / 2 - 1),
  });

  const handleRotateEmptySlotLayer = (direction: TBallsRotateDirection) => {
    let newPosition = emptySlot.position;

    if (direction === "Right") {
      newPosition =
        emptySlot.position < STACKS_QUANTITY - 1 ? emptySlot.position + 1 : 0;
    }
    if (direction === "Left") {
      newPosition =
        emptySlot.position > 0 ? emptySlot.position - 1 : STACKS_QUANTITY - 1;
    }
    if (newPosition !== emptySlot.position)
      setEmptySlot((prev) => ({ ...prev, position: newPosition }));
  };

  useEffect(() => {
    console.log(emptySlot);
  }, [emptySlot]);

  useEffect(() => {
    if (fieldState.length) {
      setLayers(getLayersFromFieldState(fieldState));
    }
  }, [fieldState]);

  const handleRotateLayer = ({
    layerIdx,
    direction,
  }: {
    layerIdx: number;
    direction: TBallsRotateDirection;
  }) => {
    const newState = rotateLayer({
      field: fieldState,
      direction: direction,
      layerIdx,
    });
    setFieldState(newState);
  };

  useEffect(() => {
    console.log("NEW EMPTY SLOT");
  }, [emptySlot]);

  switch (step) {
    case STEP.INIT:
      return (
        <PageContentLayout
          headerContent={
            <Typography
              view={"title"}
              tag={"h2"}
              weight={"semibold"}
              color={"primary"}
            >
              Шарики
            </Typography>
          }
          mainContent={
            <GameField
              // layers={getLayersFromFieldState(fieldState)}
              layers={layers}
              emptySlot={
                <EmtySlotLayer
                  slot={emptySlot}
                  maxItems={STACKS_QUANTITY}
                  handleRotateEmptySlotLayer={handleRotateEmptySlotLayer}
                  onBallClick={() => {
                    const { fieldState: fs, emptySlot: es } = onBallClick({
                      fieldState,
                      stackIdx: emptySlot.position,
                      ballIdx: null,
                      emptySlot,
                    });
                    setFieldState(fs);
                    setEmptySlot(es);
                  }}
                />
              }
              onBallClick={({
                layerIdx,
                ballIdx,
              }: {
                layerIdx: number | null;
                ballIdx: number;
              }) => {
                const { fieldState: fs, emptySlot: es } = onBallClick({
                  fieldState,
                  stackIdx: ballIdx,
                  ballIdx: layerIdx,
                  emptySlot,
                });
                setFieldState(fs);
                setEmptySlot(es);
              }}
              handleRotateLayer={({ layerIdx, direction }) =>
                handleRotateLayer({ layerIdx, direction })
              }
            />
          }
        />
      );

    case STEP.SETTINGS:
      return (
        <PageContentLayout
          headerContent={
            <Typography
              view={"title"}
              tag={"h2"}
              weight={"semibold"}
              color={"primary"}
            >
              Шарики
            </Typography>
          }
          mainContent={
            <Typography
              view={"title"}
              tag={"h2"}
              weight={"semibold"}
              color={"primary"}
            >
              Настройки
            </Typography>
          }
          mainDivider
          footerContent={
            <MenuButton
              className={styles.button}
              text={"Назад"}
              onClick={() => {
                setStep(STEP.INIT);
              }}
            />
          }
        />
      );
    case STEP.GAME: {
      return (
        <PageContentLayout
          headerContent={
            <Typography
              view={"subtitle"}
              tag={"h3"}
              weight={"semibold"}
              color={"primary"}
            >
              Шаи
            </Typography>
          }
          mainContent={<></>}
          mainDivider
          footerContent={
            <MenuButton
              className={styles.button}
              text={"Завершить"}
              onClick={() => setStep(STEP.END)}
            />
          }
        />
      );
    }
    case STEP.END: {
      return (
        <PageContentLayout
          headerContent={
            <Typography
              view={"title"}
              tag={"h2"}
              weight={"semibold"}
              color={"primary"}
            >
              Результаты
            </Typography>
          }
          mainContent={<></>}
          mainDivider
          footerContent={
            <div style={{ width: "100%", display: "flex", gap: "8px" }}>
              <MenuButton
                className={styles.button}
                text={"Главное меню"}
                onClick={() => {
                  // setStep(STEP.INIT);
                }}
              />

              <MenuButton
                className={styles.button}
                text={"Ещё раз"}
                onClick={() => {
                  // examplesDispatch({
                  //   type: EXAMPLE_ACTIONS_ENUM.GENERATE_EXAMPLES,
                  //   payload: settings,
                  // });
                  // setStep(STEP.GAME);
                }}
              />
            </div>
          }
        />
      );
    }
    default:
      return null;
  }
}
