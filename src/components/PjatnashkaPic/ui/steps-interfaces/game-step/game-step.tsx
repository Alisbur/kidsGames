import { Dispatch, FC, SetStateAction } from "react";

import { useConfirm } from "@/components/Modals/model/use-confirm";
import { useModals } from "@/components/Modals/model/use-modals";
import { FooterControlsLayout } from "@/shared/layouts/footer-controls-layout/footer-controls-layout";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { PageContentLayoutGameHeader } from "@/shared/ui/page-content-layout-game-header/page-content-layout-game-header";

import { GAME_ACTIONS_ENUM } from "../../../enums/game-actions.enum";
import { GAME_STEPS_ENUM as STEP } from "../../../enums/game-steps.enum";
import { GAME_TYPES_ENUM } from "../../../enums/game-types.enum";
import { TFieldState } from "../../../types/field-state.type";
import { TGameActions } from "../../../types/game-actions.type";
import { TSettings } from "../../../types/settings.type";
import { GameField } from "../../game-field/game-field";

type TGameStepProps = {
  settings: TSettings;
  isLoading: boolean;
  isShuffleRunning: boolean;
  isShuffleDone: boolean;
  setIsShuffleDone: Dispatch<SetStateAction<boolean>>;
  setShuffleIsRunning: Dispatch<SetStateAction<boolean>>;
  croppedUrl: string;
  fieldState: TFieldState;
  fieldStateDispatch: Dispatch<TGameActions>;
  setStep: Dispatch<SetStateAction<STEP>>;
};

export const GameStep: FC<TGameStepProps> = ({
  settings,
  isLoading,
  isShuffleRunning,
  croppedUrl,
  fieldState,
  fieldStateDispatch,
  isShuffleDone,
  setIsShuffleDone,
  setShuffleIsRunning,
  setStep,
}) => {
  const { confirm } = useConfirm();
  const { openModal } = useModals();

  return (
    <PageContentLayout
      withMainHeader={false}
      headerContent={
        <PageContentLayoutGameHeader
          title={
            (settings.gameType === GAME_TYPES_ENUM.NUMBERS && "Расставь числа по порядку") ||
            (settings.gameType === GAME_TYPES_ENUM.PICTURE && "Собери картинку") ||
            "Пятнашка"
          }
        />
      }
      headerDivider
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
          onGameOver={() => setStep(STEP.RESULTS)}
          isShuffleDone={isShuffleDone}
          setIsShuffleDone={setIsShuffleDone}
          isShuffleRunning={isShuffleRunning}
          imgUrl={croppedUrl}
          isLoading={isLoading}
        />
      }
      mainDivider
      footerContent={
        <FooterControlsLayout>
          {!isShuffleDone ? (
            <MenuButton
              text={isShuffleRunning ? "Перемешиваю..." : "Начать"}
              color={"accent"}
              onClick={() => setShuffleIsRunning(true)}
              disabled={isShuffleRunning}
              trigger={!isShuffleRunning ? "blinking" : undefined}
            />
          ) : (
            settings.gameType === GAME_TYPES_ENUM.PICTURE && (
              <MenuButton
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
            text={"Завершить"}
            onClick={async () => {
              const ans = await confirm({
                title: "Завершить?",
                content: "Головоломка ещё не решена, точно выйти?",
              });
              if (ans) {
                setStep(STEP.RESULTS);
              }
            }}
          />
        </FooterControlsLayout>
      }
    />
  );
};
