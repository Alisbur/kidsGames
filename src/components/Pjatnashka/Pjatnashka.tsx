import { useReducer, useState } from "react";

import { PageContentLayout } from "../../shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";
import { Typography } from "../../shared/ui/typography/typography";
import { INIT_SETTINGS } from "./constants/init-settings";
import { GAME_ACTIONS_ENUM } from "./enums/game-actions.enum";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { fieldStateReducer } from "./helpers/field-state-reducer";
import { settingsReducer } from "./helpers/settings-reducer";
import styles from "./Pjatnashka.module.scss";
import { TFieldState } from "./types/field-state.type";
import { TGameActions } from "./types/game-actions.type";
import { TGameSettingsActions } from "./types/game-settings-actions.type";
import { TSettings } from "./types/settings.type";
import { GameField } from "./ui/game-field/game-field";
import { PjatnashkaSettings } from "./ui/pjatnashka-settings/pjatnashka-settings";

export function Pjatnashka() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TGameSettingsActions) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const [fieldState, fieldStateDispatch] = useReducer<
    (state: TFieldState, action: TGameActions) => TFieldState
  >(fieldStateReducer, []);

  const [step, setStep] = useState<STEP>(STEP.INIT);

  switch (step) {
    case STEP.INIT:
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Игра-головоломка
            </Typography>
          }
          mainContentScroll={false}
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
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Настройки
            </Typography>
          }
          mainContent={<PjatnashkaSettings settings={settings} setSettings={settingsDispatch} />}
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
            <Typography view={"subtitle"} tag={"h3"} weight={"semibold"} color={"primary"}>
              Расставь фишки по-порядку
            </Typography>
          }
          mainContent={
            <GameField
              settings={settings}
              fieldState={fieldState}
              setNewFieldState={(id: number) => {
                fieldStateDispatch({
                  type: GAME_ACTIONS_ENUM.MOVE_PIECE,
                  payload: id,
                });
              }}
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
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Результаты
            </Typography>
          }
          mainContent={<div>Здесь будет контент</div>}
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
                  fieldStateDispatch({
                    type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE,
                    payload: settings,
                  });
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
