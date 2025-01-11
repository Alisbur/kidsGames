import { useEffect, useState } from "react";
import styles from "./XO-page.module.scss";
import { XOField } from "../../components/XOField/XOField";
import xFigure from "../../assets/icons/x-figure.svg";
import oFigure from "../../assets/icons/o-figure.svg";
import { MenuButton } from "../../shared/ui/menu-button/menu-button";

export function XOPage() {
  const [fieldArr, setFieldArr] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [turn, setTurn] = useState<"O" | "X">("X");
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  const [linesState, setLinesState] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [winner, setWinner] = useState<"X" | "O" | "=" | null>(null);
  const [winLine, setWinLine] = useState<number[]|null>(null);

  useEffect(() => {
    const newLinesState = lines.map((l) =>
      l.reduce((acc, el) => acc + fieldArr[el], 0)
    );
    setLinesState(newLinesState);
  }, [fieldArr]);

  useEffect(() => {
    if (linesState.includes(3)) {
      setWinner("X");
      setWinLine(lines[linesState.indexOf(3)]);
      setIsGameStarted(false);
      return;
    }
    if (linesState.includes(-3)) {
      setWinner("O");
      setWinLine(lines[linesState.indexOf(-3)]);
      setIsGameStarted(false);
      return;
    }
    if (!fieldArr.includes(0)) {
      setWinner("=");
      setIsGameStarted(false);
      return;
    }
  }, [linesState, fieldArr]);

  const initNewGame = () => {
    setLinesState([0, 0, 0, 0, 0, 0, 0, 0]);
    setFieldArr([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setIsGameStarted(true);
    setWinner(null);
    setWinLine(null);
    setTurn("X");
  };

  const handleMove = (idx: number) => {
    if (isGameStarted && !fieldArr[idx]) {
      setFieldArr(
        fieldArr.map((f, i) => {
          if (i === idx) {
            return turn === "X" ? 1 : -1;
          } else {
            return f;
          }
        })
      );
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  return (
    <div className={styles.container}>
      <XOField fieldArr={fieldArr} onMove={handleMove} win={winLine}/>
      {isGameStarted && (
        <div className={styles.turnData}>
          {"Ход:  "}
          <img src={turn === "X" ? xFigure : oFigure} />
        </div>
      )}
      {winner && (
        <div className={styles.turnData}>
          {winner === "=" ? (
            <span>Ничья!</span>
          ) : (
            <>
              <span>Победил:</span>
              <img src={winner === "X" ? xFigure : oFigure} />
            </>
          )}
        </div>
      )}
      <MenuButton
        onClick={() => {
          initNewGame();
        }}
        text={`${isGameStarted ? "Начать сначала" : "Новая игра"}`}
      />
    </div>
  );
}
