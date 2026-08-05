import { FIELD_LINES } from "../constants/field-lines";
import { FIGURE_TYPE_ENUM } from "../enums/figure-types.enum";
import { TFieldState } from "../types/field-state.type";

export const generateInitFieldState = (): TFieldState => {
  const initFieldState: TFieldState = {
    field: new Array(9).fill(0),
    // lines: new Array(8).fill(0),
    turn: FIGURE_TYPE_ENUM.X,
    winLine: null,
    winner: null,
  };

  return initFieldState;
};

const getLinesState = (field: number[]): number[] => {
  const linesState = FIELD_LINES.map((l) => l.reduce((acc, el) => acc + field[el], 0));

  return linesState;
};

type TCheckIfGameIsOver = Pick<TFieldState, "winner" | "winLine">;

export const checkIfGameIsOver = (field: number[], lines: number[]): TCheckIfGameIsOver => {
  const result: TCheckIfGameIsOver = { winner: null, winLine: null };

  if (lines.includes(3)) {
    result.winner = FIGURE_TYPE_ENUM.X;
    result.winLine = FIELD_LINES[lines.indexOf(3)];
    return result;
  }
  if (lines.includes(-3)) {
    result.winner = FIGURE_TYPE_ENUM.O;
    result.winLine = FIELD_LINES[lines.indexOf(-3)];
    return result;
  }
  if (!field.some((el) => el === 0)) {
    result.winner = "no";
  }

  return result;
};

export const handleMove = (state: TFieldState, idx: number): TFieldState => {
  if (!state.field[idx]) {
    const newField: number[] = [...state.field];
    newField[idx] = state.turn === FIGURE_TYPE_ENUM.X ? 1 : -1;
    const newLines: number[] = getLinesState(newField);
    const winnerCheck = checkIfGameIsOver(newField, newLines);
    const nextTurn = state.turn === FIGURE_TYPE_ENUM.X ? FIGURE_TYPE_ENUM.O : FIGURE_TYPE_ENUM.X;
    const newFieldState = {
      field: newField,
      turn: nextTurn,
      winner: winnerCheck.winner,
      winLine: winnerCheck.winLine,
    };
    return newFieldState;
  }
  return state;
};

export const handleComputerMove = (state: TFieldState): TFieldState => {
  const hasLineFreeIndices = (field: number[], line: number[]): number | null => {
    for (let i = 0; i < line.length; i++) {
      if (!field[line[i]]) {
        return line[i];
      }
    }
    return null;
  };

  const findBestMove = (board: TFieldState, value: number): number | null => {
    const field = board.field;
    const lines = getLinesState(field);
    for (let i = 0; i < lines.length; i++) {
      const nextMove = hasLineFreeIndices(field, FIELD_LINES[i]);
      if (lines[i] === 2 * value && nextMove !== null) {
        return nextMove;
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const nextMove = hasLineFreeIndices(field, FIELD_LINES[i]);
      if (lines[i] === -2 * value && nextMove !== null) {
        return nextMove;
      }
    }

    return null;
  };

  const getRandomMove = (board: number[]): number | null => {
    const emptyIndices = board.reduce<number[]>((acc, cell, idx) => {
      if (cell === 0) acc.push(idx);
      return acc;
    }, []);
    if (emptyIndices.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[randomIndex];
  };

  const moveValue = state.turn === FIGURE_TYPE_ENUM.X ? 1 : -1;

  let move = findBestMove(state, moveValue);
  if (move === null) move = getRandomMove(state.field);
  if (move !== null) {
    return handleMove(state, move);
  }

  return state;
};
