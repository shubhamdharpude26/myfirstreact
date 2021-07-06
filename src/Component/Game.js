import React, { useState } from "react";
import Square from "./Square";
import Restart from "./Restart";

function Game() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(square);
  const nextSymbol = isXNext ? "X" : "O";

  function getStatus() {
    if (winner) {
      return "Winner:" + winner;
    } else if (isBoardFull(square)) {
      return "Draw!";
    } else {
      return "Next player:" + nextSymbol;
    }
  }

  function renderSqaure(i) {
    return (
      <Square
        value={square[i]}
        onClick={() => {
          if (square[i] != null || winner != null) {
            return;
          }
          const nextSquare = square.slice();
          nextSquare[i] = nextSymbol;
          setSquare(nextSquare);

          setIsXNext(!isXNext);
        }}
      />
    );
  }

  function calculateWinner(sqaure) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  function isBoardFull(sqaure) {
    for (let i = 0; i < sqaure.length; i++) {
      if (sqaure[i] == null) return false;
    }

    return true;
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquare(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSqaure(0)}
            {renderSqaure(1)}
            {renderSqaure(2)}
          </div>
          <div className="board-row">
            {renderSqaure(3)}
            {renderSqaure(4)}
            {renderSqaure(5)}
          </div>
          <div className="board-row">
            {renderSqaure(6)}
            {renderSqaure(7)}
            {renderSqaure(8)}
          </div>
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}

export default Game;
