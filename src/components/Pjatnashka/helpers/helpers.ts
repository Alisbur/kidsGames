import { getRandomFromArray } from "../../../shared/helpers/get-random-from-array";
import { TFieldState } from "../types/field-state.type";
import { TPieceType } from "../types/piece.type";

export const definePiecePos = (
  field: TFieldState,
  pieceName: number
): TPieceType | null => {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === pieceName) {
        return { name: 0, x: j, y: i };
      }
    }
  }

  return null;
};

export const move = (field: number[][], piece: number): TFieldState => {
  const zeroPos = definePiecePos(field, 0);
  const piecePos = definePiecePos(field, piece);
  if (zeroPos === null || piecePos === null) return field;

  const { x: zeroX, y: zeroY } = zeroPos;
  const { x: pieceX, y: pieceY } = piecePos;
  if (pieceX === zeroX && pieceY === zeroY) return field;

  const newFieldState = field.map((el) => el.slice());
  if (pieceX === zeroX) {
    const inc = pieceY < zeroY ? -1 : 1;
    for (let i = zeroY; i !== pieceY; i += inc) {
      newFieldState[i][zeroX] = newFieldState[i + inc][zeroX];
    }
    newFieldState[pieceY][pieceX] = 0;
  }
  if (pieceY === zeroY) {
    const inc = pieceX < zeroX ? -1 : 1;
    for (let i = zeroX; i !== pieceX; i += inc) {
      newFieldState[zeroY][i] = newFieldState[zeroY][i + inc];
    }
    newFieldState[pieceY][pieceX] = 0;
  }

  return newFieldState;
};

export const generateArr = ({
  fieldH,
  fieldW,
}: {
  fieldH: number;
  fieldW: number;
}) => {
  const newFieldState: Array<number[]> = [];
  for (let i = 0; i < fieldH; i++) {
    const newRow = [];
    for (let j = 0; j < fieldW; j++) {
      newRow.push(i * fieldH + j + 1);
    }
    newFieldState.push(newRow);
  }
  newFieldState[fieldH - 1][fieldW - 1] = 0;
  return newFieldState;
};

export const shuffle = (field: TFieldState, dir: "HOR" | "VERT"): number | null => {
  if (!field || !field.length) return null;
  const zeroPos = definePiecePos(field, 0);
  if (zeroPos === null) return null;
  const { x: zeroX, y: zeroY } = zeroPos;

  // const dir = Math.random() >= 0.5 ? "VERT" : "HOR";
  const piecesArray = [];

  if (dir === "VERT") {
    for (let i = 0; i < field.length; i++) {
      const val = field[i][zeroX];
      if (val) {
        piecesArray.push(val);
      }
    }
  } else {
    for (let j = 0; j < field[zeroY].length; j++) {
      const val = field[zeroY][j];
      if (val) {
        piecesArray.push(val);
      }
    }
  }

  return getRandomFromArray(piecesArray);
};

export const checkIsGameOver = (field: TFieldState): boolean => {
  const counter = 1;

  if (!field || !field.length) return true;

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] !== counter) return false;
    }
  }

  return true;
};
