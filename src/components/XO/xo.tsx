import { useEffect, useReducer } from "react";

import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { Typography } from "@/shared/ui/typography/typography";

import { MenuButton } from "../../shared/ui/menu-button/menu-button";
import { useConfirm } from "../Modals/model/use-confirm";
import { INIT_GAME_STATE } from "./constants/init-game-state";
import { INIT_SETTINGS } from "./constants/init-settings";
import { GAME_ACTIONS_ENUM } from "./enums/game-actions.enum";
import { GAME_SETTINGS_ACTIONS_ENUM } from "./enums/game-settings-actions.enum";
import { GAME_STATE_ACTIONS_ENUM } from "./enums/game-state-actions.enum";
import { GAME_STEPS } from "./enums/game-steps.enum";
import { PLAYERS_TYPES_ENUM } from "./enums/players.enum";
import { fieldStateReducer } from "./helpers/field-state-reducer";
import { gameStateReducer } from "./helpers/game-state-reducer";
import { generateInitFieldState } from "./helpers/helpers";
import { settingsReducer } from "./helpers/settings-reducer";
import { TFieldState } from "./types/field-state.type";
import { TGameActions } from "./types/game-actions.type";
import { TGameSettingsActions } from "./types/game-settings-actions.type";
import { TGameState } from "./types/game-state.type";
import { TGameStateActions } from "./types/game-state-actions.type";
import { TXOSettings } from "./types/settings.type";
import { XOField } from "./ui/game-field/game-field";
import { XOGameSettings } from "./ui/xo-game-settings/xo-game-settings";
import styles from "./xo.module.scss";

const COMPUTER_MAX_DELAY = 800;
const COMPUTER_MIN_DELAY = 300;

const getRandomDelay = (min: number, max: number): number => {
  const randomDelay: number = Math.random() * (max - min) + min;
  return randomDelay;
};

export function XO() {
  const { confirm } = useConfirm();

  const [gameState, gameStateDispatch] = useReducer<
    (state: TGameState, action: TGameStateActions) => TGameState
  >(gameStateReducer, INIT_GAME_STATE);

  const [settings, settingsDispatch] = useReducer<
    (state: TXOSettings, action: TGameSettingsActions) => TXOSettings
  >(settingsReducer, INIT_SETTINGS);

  const [fieldState, fieldStateDispatch] = useReducer<
    (state: TFieldState, action: TGameActions) => TFieldState
  >(fieldStateReducer, generateInitFieldState());

  useEffect(() => {
    if (fieldState.winner) {
      gameStateDispatch({ type: GAME_STATE_ACTIONS_ENUM.STOP });
    }
  }, [fieldState.winner]);

  useEffect(() => {
    if (gameState.isGameStarted && !fieldState.winner) {
      gameStateDispatch({ type: GAME_STATE_ACTIONS_ENUM.NEXT_TURN });
    }
  }, [gameState.isGameStarted, fieldState.field, fieldState.winner]);

  useEffect(() => {
    let timeout: number | undefined;

    const handleComputerTurn = async () => {
      await new Promise(
        (res) =>
          (timeout = window.setTimeout(
            () => {
              fieldStateDispatch({
                type: GAME_ACTIONS_ENUM.MAKE_COMPUTER_MOVE,
              });
              res(true);
            },
            getRandomDelay(COMPUTER_MIN_DELAY, COMPUTER_MAX_DELAY),
          )),
      );
    };

    const computerMoveIsNeeded =
      settings[gameState.turn].isComputer && !fieldState.winner && gameState.isGameStarted;

    if (computerMoveIsNeeded) {
      handleComputerTurn();
    }

    return () => window.clearTimeout(timeout);
  }, [gameState.turn, fieldState.winner, gameState.isGameStarted, settings.playersType, settings]);

  useEffect(() => {
    if (gameState.step === GAME_STEPS.GAME) {
      fieldStateDispatch({
        type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE,
      });
    }
  }, [gameState.step]);

  switch (gameState.step) {
    case GAME_STEPS.INIT:
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Крестики-нолики
            </Typography>
          }
          mainContent={
            <>
              <MenuButton
                className={styles.button}
                text={"Играть с компьютером"}
                onClick={() => {
                  settingsDispatch({
                    type: GAME_SETTINGS_ACTIONS_ENUM.SET_PLAYERS_TYPE,
                    payload: PLAYERS_TYPES_ENUM.SINGLE,
                  });
                  gameStateDispatch({
                    type: GAME_STATE_ACTIONS_ENUM.SET_STEP,
                    payload: GAME_STEPS.GAME,
                  });
                }}
              />

              <MenuButton
                className={styles.button}
                text={"Играть вдвоём"}
                onClick={() => {
                  settingsDispatch({
                    type: GAME_SETTINGS_ACTIONS_ENUM.SET_PLAYERS_TYPE,
                    payload: PLAYERS_TYPES_ENUM.MULTI,
                  });
                  gameStateDispatch({
                    type: GAME_STATE_ACTIONS_ENUM.SET_STEP,
                    payload: GAME_STEPS.GAME,
                  });
                }}
              />

              <MenuButton
                className={styles.button}
                text={"Настройки"}
                onClick={() =>
                  gameStateDispatch({
                    type: GAME_STATE_ACTIONS_ENUM.SET_STEP,
                    payload: GAME_STEPS.SETTINGS,
                  })
                }
              />
            </>
          }
        />
      );

    case GAME_STEPS.SETTINGS:
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Настройки
            </Typography>
          }
          // mainContent={<BallsSettings settings={settings} setSettings={settingsDispatch} />}
          mainContent={<XOGameSettings setSettings={settingsDispatch} settings={settings} />}
          mainContentScroll
          mainDivider
          footerContent={
            <MenuButton
              className={styles.button}
              text={"Назад"}
              onClick={() => {
                gameStateDispatch({
                  type: GAME_STATE_ACTIONS_ENUM.SET_STEP,
                  payload: GAME_STEPS.INIT,
                });
              }}
            />
          }
        />
      );
    case GAME_STEPS.GAME: {
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"subtitle"} tag={"h3"} weight={"semibold"} color={"primary"}>
              Попробуй выиграть
            </Typography>
          }
          mainContent={
            <XOField
              fieldState={fieldState}
              onMove={async (idx) => {
                if (gameState.isGameStarted && !settings[gameState.turn].isComputer) {
                  fieldStateDispatch({ type: GAME_ACTIONS_ENUM.MAKE_MOVE, payload: idx });
                }
              }}
              isGameStarted={gameState.isGameStarted}
              playerData={{
                playerName: settings[gameState.turn].isComputer
                  ? "Компьютер"
                  : settings[gameState.turn].name,
                player: gameState.turn,
              }}
            />
          }
          mainDivider
          footerContent={
            <div className={styles.actionBar}>
              <MenuButton
                onClick={() => {
                  gameStateDispatch({ type: GAME_STATE_ACTIONS_ENUM.START });
                  fieldStateDispatch({ type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE });
                }}
                text={`${gameState.isGameStarted ? "Начать сначала" : "Новая игра"}`}
              />

              <MenuButton
                className={styles.button}
                text={"Завершить"}
                onClick={async () => {
                  if (gameState.isGameStarted) {
                    const ans = await confirm({
                      title: "Завершить?",
                      content: "Игра ещё не закончена, точно выйти?",
                    });
                    if (!ans) return;
                  }
                  gameStateDispatch({
                    type: GAME_STATE_ACTIONS_ENUM.SET_STEP,
                    payload: GAME_STEPS.END,
                  });
                }}
              />
            </div>
          }
        />
      );
    }
    case GAME_STEPS.END: {
      return (
        <PageContentLayout
          headerContent={
            <Typography view={"title"} tag={"h2"} weight={"semibold"} color={"primary"}>
              Результаты
            </Typography>
          }
          mainContent={<>Тут будут результаты</>}
          mainDivider
          footerContent={
            <div className={styles.actionBar}>
              <MenuButton
                className={styles.button}
                text={"Меню игры"}
                onClick={() => {
                  gameStateDispatch({
                    type: GAME_STATE_ACTIONS_ENUM.SET_STEP,
                    payload: GAME_STEPS.INIT,
                  });
                }}
              />

              <MenuButton
                className={styles.button}
                text={"Ещё раз"}
                onClick={() => {
                  gameStateDispatch({
                    type: GAME_STATE_ACTIONS_ENUM.SET_STEP,
                    payload: GAME_STEPS.GAME,
                  });
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
