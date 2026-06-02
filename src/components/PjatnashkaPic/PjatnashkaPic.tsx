import { useCallback, useEffect, useReducer, useState } from "react";

import pics from "@/assets/images";
import { getRandomFromArray } from "@/shared/helpers/get-random-from-array";
import { useCroppedImage } from "@/shared/hooks/use-cropped-image";

import { PageContentLayout } from "../../shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";
import { Typography } from "../../shared/ui/typography/typography";
import { useConfirm } from "../Modals/model/use-confirm";
import { useModals } from "../Modals/model/use-modals";
import { INIT_SETTINGS } from "./constants/init-settings";
import { GAME_ACTIONS_ENUM } from "./enums/game-actions.enum";
import { GAME_STEPS as STEP } from "./enums/game-steps.enum";
import { GAME_TYPES_ENUM } from "./enums/game-types.enum";
import { fieldStateReducer } from "./helpers/field-state-reducer";
import { settingsReducer } from "./helpers/settings-reducer";
import styles from "./PjatnashkaPic.module.scss";
import { TFieldState } from "./types/field-state.type";
import { TGameActions } from "./types/game-actions.type";
import { TGameSettingsActions } from "./types/game-settings-actions.type";
import { TSettings } from "./types/settings.type";
import { GameField } from "./ui/game-field/game-field";
import { PjatnashkaSettings } from "./ui/pjatnashka-settings/pjatnashka-settings";

const BG_IMAGES = [
  pics.story_ezhik,
  pics.story_kengurenok,
  pics.story_kotenok,
  pics.story_lisenok,
  pics.story_medvegenok,
  pics.story_slonenok,
  pics.story_utenok,
  pics.story_zaichenok,
  pics.story_ziplenok,
  pics.drum,
];

const IMG_MAX_CROP_SIZE = 600;

export function PjatnashkaPic() {
  const [settings, settingsDispatch] = useReducer<
    (state: TSettings, action: TGameSettingsActions) => TSettings
  >(settingsReducer, INIT_SETTINGS);

  const [fieldState, fieldStateDispatch] = useReducer<
    (state: TFieldState, action: TGameActions) => TFieldState
  >(fieldStateReducer, []);

  const [step, setStep] = useState<STEP>(STEP.INIT);
  const [isShuffleDone, setIsShuffleDone] = useState(false);
  const [isShuffleRunning, setShuffleIsRunning] = useState(false);
  const [imgUrl, setImageUrl] = useState<string | null>(null);
  const { croppedUrl, cropImage } = useCroppedImage();
  const { confirm } = useConfirm();
  const { openModal } = useModals();

  useEffect(() => {
    if (isShuffleDone) setShuffleIsRunning(false);
  }, [isShuffleDone]);

  useEffect(() => {
    if (imgUrl) cropImage({ img: imgUrl, maxW: IMG_MAX_CROP_SIZE, maxH: IMG_MAX_CROP_SIZE });
  }, [imgUrl, cropImage]);

  const initNewGame = useCallback(() => {
    setIsShuffleDone(false);
    if (settings.gameType === GAME_TYPES_ENUM.PICTURE) setImageUrl(getRandomFromArray(BG_IMAGES));
    else setImageUrl(null);
    fieldStateDispatch({
      type: GAME_ACTIONS_ENUM.GENERATE_INIT_FIELDSTATE,
      payload: settings,
    });

    setStep(STEP.GAME);
  }, [settings]);

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
              <MenuButton className={styles.button} text={"Играть"} onClick={initNewGame} />

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
              {settings.gameType === GAME_TYPES_ENUM.NUMBERS && "Расставь числа по порядку"}
              {settings.gameType === GAME_TYPES_ENUM.PICTURE && "Собери картинку"}
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
              onGameOver={() => setStep(STEP.END)}
              isShuffleDone={isShuffleDone}
              setIsShuffleDone={setIsShuffleDone}
              isShuffleRunning={isShuffleRunning}
              imgUrl={croppedUrl}
            />
          }
          mainDivider
          footerContent={
            <div style={{ width: "100%", display: "flex", columnGap: "16px" }}>
              {!isShuffleDone ? (
                <MenuButton
                  className={styles.button}
                  text={"Перемешать"}
                  onClick={() => setShuffleIsRunning(true)}
                  disabled={isShuffleRunning}
                />
              ) : (
                settings.gameType === GAME_TYPES_ENUM.PICTURE && (
                  <MenuButton
                    className={styles.button}
                    text={"Подсказка"}
                    onClick={() => {
                      openModal({
                        modalType: "info_modal",
                        modalProps: {
                          title: "Подсказка",
                          content: (
                            <img
                              src={croppedUrl}
                              style={{ maxWidth: "100%", maxHeight: "300px", aspectRatio: "1/1" }}
                            />
                          ),
                        },
                      });
                    }}
                    disabled={isShuffleRunning}
                  />
                )
              )}

              <MenuButton
                className={styles.button}
                text={"Завершить"}
                onClick={async () => {
                  const ans = await confirm({
                    title: "Завершить?",
                    content: "Головоломка ещё не решена, точно выйти?",
                  });
                  if (ans) {
                    setStep(STEP.END);
                  }
                }}
              />
            </div>
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
                text={"Меню игры"}
                onClick={() => {
                  setStep(STEP.INIT);
                }}
              />

              <MenuButton className={styles.button} text={"Ещё раз"} onClick={initNewGame} />
            </div>
          }
        />
      );
    }
    default: {
      const _exhaustiveCheck: never = step;
      throw new Error(`Unhandled step: ${_exhaustiveCheck}`);
    }
  }
}
