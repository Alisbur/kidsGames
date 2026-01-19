import { useEffect, useReducer, useState } from "react";

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
import {
  generateInitFieldState,
  getLayersFromFieldState,
  onBallClick,
  rotateLayer,
} from "./helpers/helpers";
import { TBallsSettings } from "./types/settings.type";
import { TGameSettingsActions } from "./types/game-settings-actions.type";
import { settingsReducer } from "./helpers/settings-reducer";
import { INIT_SETTINGS } from "./config/init-settings";
import { TGameActions } from "./types/game-actions.type";
import { fieldStateReducer } from "./helpers/field-state-reducer";
import { GAME_ACTIONS_ENUM } from "./enum/game-actions.enum";
import { BallsSettings } from "./ui/balls-settings/balls-settings";
import { FIELD_OPTIONS_SIZES } from "./config/field-options";

// const convertFieldStateToLayers
const STACKS_QUANTITY = Object.keys(BALLS_COLOR_ENUM).length;
const BALLS_IN_STACK = Object.keys(BALLS_COLOR_ENUM).length;

export function Balls() {
  const [step, setStep] = useState<STEP>(STEP.INIT);

  const [settings, settingsDispatch] = useReducer<
    (state: TBallsSettings, action: TGameSettingsActions) => TBallsSettings
  >(settingsReducer, INIT_SETTINGS);

  const [fieldState, fieldStateDispatch] = useReducer<
    (state: TBallsFieldState, action: TGameActions) => TBallsFieldState
  >(fieldStateReducer, {
    fieldState: [],
    emptySlot: { position: 0, ball: null },
  });

  // const [fieldState, setFieldState] = useState<TBallsFieldState>(
  //   generateInitFieldState(BALLS_IN_STACK)
  // );
  const [layers, setLayers] = useState<TBallsLayer[]>(
    // getLayersFromFieldState(fieldState) ?? []
    []
  );
  // const [emptySlot, setEmptySlot] = useState<TBallsEmptySlot>({
  //   ball: null,
  //   position: Math.round(STACKS_QUANTITY / 2 - 1),
  // });

  useEffect(() => {
    if (fieldState?.fieldState?.length) {
      setLayers(getLayersFromFieldState(fieldState));
    }
  }, [fieldState]);

  // const handleRotateLayer = ({
  //   layerIdx,
  //   direction,
  // }: {
  //   layerIdx: number;
  //   direction: TBallsRotateDirection;
  // }) => {
  //   const newState = rotateLayer({
  //     field: fieldState,
  //     direction: direction,
  //     layerIdx,
  //   });
  //   setFieldState(newState);
  // };

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
            <>
              <MenuButton
                className={styles.button}
                text={"Играть"}
                onClick={() => {
                  // setIsGameStarted(true);

                  fieldStateDispatch({
                    type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE,
                    payload: settings,
                  });

                  setStep(STEP.GAME);
                }}
              />

              <MenuButton
                className={styles.button}
                text={"Настройки"}
                onClick={() => setStep(STEP.SETTINGS)}
              />
            </>
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
            <BallsSettings settings={settings} setSettings={settingsDispatch} />
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
              Игра - головоломка
            </Typography>
          }
          mainContent={
            <GameField
              layers={layers}
              emptySlot={
                <EmtySlotLayer
                  slot={fieldState.emptySlot}
                  maxItems={
                    FIELD_OPTIONS_SIZES[settings.fieldSizeType].ballsInStack
                  }
                  handleRotateEmptySlotLayer={(
                    direction: TBallsRotateDirection
                  ) =>
                    fieldStateDispatch({
                      type: GAME_ACTIONS_ENUM.ROTATE_EMPTY_SLOT_LAYER,
                      payload: direction,
                    })
                  }
                  onBallClick={() =>
                    fieldStateDispatch({
                      type: GAME_ACTIONS_ENUM.BALL_CLICK,
                      payload: {
                        stackIdx: fieldState.emptySlot.position,
                        ballIdx: null,
                      },
                    })
                  }
                />
              }
              onBallClick={({
                layerIdx,
                ballIdx,
              }: {
                layerIdx: number | null;
                ballIdx: number;
              }) => {
                fieldStateDispatch({
                  type: GAME_ACTIONS_ENUM.BALL_CLICK,
                  payload: {
                    stackIdx: ballIdx,
                    ballIdx: layerIdx,
                  },
                });
              }}
              handleRotateLayer={({ layerIdx, direction }) =>
                fieldStateDispatch({
                  type: GAME_ACTIONS_ENUM.ROTATE_LAYER,
                  payload: { layerIdx, direction },
                })
              }
            />
          }
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
          mainContent={<>Тут будут результаты</>}
          mainDivider
          footerContent={
            <div style={{ width: "100%", display: "flex", gap: "8px" }}>
              <MenuButton
                className={styles.button}
                text={"Главное меню"}
                onClick={() => {
                  setStep(STEP.INIT);
                }}
              />

              <MenuButton
                className={styles.button}
                text={"Ещё раз"}
                onClick={() => {
                setStep(STEP.GAME);
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
