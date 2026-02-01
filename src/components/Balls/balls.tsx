import { useEffect, useReducer, useState } from "react";

import styles from "./balls.module.scss";

import { GAME_STEPS as STEP } from "./enum/game-steps.enum";

import { PageContentLayout } from "../../shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";

import { Typography } from "../../shared/ui/typography/typography";
import { TBallsFieldState, TBallsRotateDirection } from "./types/ball.type";
import { GameField } from "./ui/game-field/game-field";
import { EmtySlotLayer } from "./ui/empty-slot-layer/empty-slot-layer";
import { TBallsSettings } from "./types/settings.type";
import { TGameSettingsActions } from "./types/game-settings-actions.type";
import { settingsReducer } from "./helpers/settings-reducer";
import { INIT_SETTINGS } from "./config/init-settings";
import { TGameActions } from "./types/game-actions.type";
import { fieldStateReducer } from "./helpers/field-state-reducer";
import { GAME_ACTIONS_ENUM } from "./enum/game-actions.enum";
import { BallsSettings } from "./ui/balls-settings/balls-settings";
import { FIELD_OPTIONS_SIZES } from "./config/field-options";

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

  useEffect(() => {
    if (step === STEP.GAME) {
      fieldStateDispatch({
        type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE,
        payload: settings,
      });
    }
  }, [step]);

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
              Настройки
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
              Расставь шарики в столбики по цветам
            </Typography>
          }
          mainContent={
            fieldState.fieldState.length && (
              <GameField
                field={fieldState}
                settings={settings}
                handleShuffleStep={(step: number) =>
                  fieldStateDispatch({
                    type: GAME_ACTIONS_ENUM.SHUFFLE_STEP,
                    payload: step,
                  })
                }
                emptySlot={
                  <EmtySlotLayer
                    slot={fieldState.emptySlot}
                    maxItems={
                      FIELD_OPTIONS_SIZES[settings.fieldSizeType].stacks
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
            )
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
