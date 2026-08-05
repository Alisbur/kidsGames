import classNames from "classnames";
import { FC, useRef, useState } from "react";

import { AnswerInput } from "@/shared/ui/answer-input/answer-input";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";
import { Typography } from "@/shared/ui/typography/typography";

import { GAME_SETTINGS_ACTIONS_ENUM } from "../../enums/game-settings-actions.enum";
import { TGameSettingsActions } from "../../types/game-settings-actions.type";
import { TXOSettings } from "../../types/settings.type";
import styles from "./xo-game-settings.module.scss";

type TXOGameSettingsProps = {
  settings: TXOSettings;
  setSettings: (value: TGameSettingsActions) => void;
};

export const XOGameSettings: FC<TXOGameSettingsProps> = ({ settings, setSettings }) => {
  const [firstPlayerName, setFirstPlayerName] = useState(settings.PLAYER_1.name);
  const [secondPlayerName, setSecondPlayerName] = useState(settings.PLAYER_2.name);

  const input1Submitted = useRef<boolean>(false);
  const input2Submitted = useRef<boolean>(false);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const saveBtn1 = useRef<HTMLButtonElement>(null);
  const saveBtn2 = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Имя игрока 1:
        </Typography>
        <div className={styles.inputSection}>
          <AnswerInput
            ref={inputRef1}
            maxLength={30}
            value={firstPlayerName}
            setValue={setFirstPlayerName}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                firstPlayerName &&
                settings.PLAYER_1.name !== firstPlayerName
              ) {
                setSettings({
                  type: GAME_SETTINGS_ACTIONS_ENUM.SET_FIRST_PLAYER_NAME,
                  payload: firstPlayerName,
                });
                input1Submitted.current = true;
                inputRef1.current?.blur();
              }
            }}
            onBlur={(e) => {
              if (e.relatedTarget !== saveBtn1.current && !input1Submitted.current)
                setFirstPlayerName(settings.PLAYER_1.name);
              input1Submitted.current = false;
            }}
            inputMode="text"
            className={classNames(styles.nameInput, styles.nameInput_first)}
            style={{ width: "100%" }}
          />
          <MenuButton
            text="Сохранить"
            ref={saveBtn1}
            disabled={settings.PLAYER_1.name === firstPlayerName || !firstPlayerName}
            fullWidth={false}
            onClick={() => {
              setSettings({
                type: GAME_SETTINGS_ACTIONS_ENUM.SET_FIRST_PLAYER_NAME,
                payload: firstPlayerName,
              });
            }}
          />
        </div>
      </div>

      <div className={styles.optionsBlock}>
        <Typography view={"subtitle"} tag={"h4"} color={"primary"}>
          Имя игрока 2:
        </Typography>
        <div className={styles.inputSection}>
          <AnswerInput
            ref={inputRef2}
            maxLength={30}
            value={secondPlayerName}
            setValue={setSecondPlayerName}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                secondPlayerName &&
                settings.PLAYER_2.name !== secondPlayerName
              ) {
                setSettings({
                  type: GAME_SETTINGS_ACTIONS_ENUM.SET_SECOND_PLAYER_NAME,
                  payload: secondPlayerName,
                });
                input2Submitted.current = true;
                inputRef2.current?.blur();
              }
            }}
            onBlur={(e) => {
              if (e.relatedTarget !== saveBtn2.current && !input2Submitted.current)
                setSecondPlayerName(settings.PLAYER_2.name);
              input1Submitted.current = false;
            }}
            inputMode="text"
            className={classNames(styles.nameInput, styles.nameInput_second)}
            style={{ width: "100%" }}
          />
          <MenuButton
            text="Сохранить"
            ref={saveBtn2}
            disabled={settings.PLAYER_2.name === secondPlayerName || !secondPlayerName}
            fullWidth={false}
            onClick={() => {
              setSettings({
                type: GAME_SETTINGS_ACTIONS_ENUM.SET_SECOND_PLAYER_NAME,
                payload: secondPlayerName,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
