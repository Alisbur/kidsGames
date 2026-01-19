import { BALLS_COLOR_ENUM } from "../enum/ball-colors.enum";

export type TBall = {
  color: BALLS_COLOR_ENUM;
};

export type TBallsLayer = Array<TBall | null>;

export type TBallsStack = Array<TBall | null>;

export type TBallsFieldState = Array<TBallsStack>;

export type TBallsRotateDirection = "Left" | "Right";

export type TBallsEmptySlot = {
  ball: TBall | null;
  position: number;
};
