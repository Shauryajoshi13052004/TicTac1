import React, { useState, useEffect } from "react";
import { PiNumberZeroBold } from "react-icons/pi";
import { HiMiniXMark } from "react-icons/hi2";

// TicTacToe Component
const initialBoard = Array(9).fill(null);

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (winner) {
      setMessage(`${winner} wins!`);
    } else if (board.every((square) => square)) {
      setMessage("It's a draw!");
    } else if (!isXNext) {
      const bestMove = findBestMove(board, "O");
      setTimeout(() => makeMove(bestMove), 500);
    }
  }, [board, isXNext, winner]);

  const makeMove = (index) => {
    const newBoard = board.slice();
    newBoard[index] = "O";
    setBoard(newBoard);
    setIsXNext(true);
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  const renderSquare = (index) => {
    return (
      <button
        onClick={() => handleClick(index)}
        className="w-24 h-24 bg-slate-600 border-2 border-gray-400 text-2xl font-bold flex items-center justify-center rounded-md"
      >
        {board[index] === "X" ? (
          <HiMiniXMark className="h-14 text-blue-500" />
        ) : board[index] === "O" ? (
          <PiNumberZeroBold className="h-14 text-orange-500" />
        ) : null}
      </button>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-4 w-72 mb-4">
          {Array(9)
            .fill(null)
            .map((_, index) => (
              <div key={index}>{renderSquare(index)}</div>
            ))}
        </div>
        {message && <div className="text-2xl text-white">{message}</div>}
        <button
          onClick={() => {
            setBoard(initialBoard);
            setIsXNext(true);
            setMessage("");
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const findBestMove = (board, player) => {
  let bestMove = -1;
  let bestValue = -Infinity;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const newBoard = board.slice();
      newBoard[i] = player;
      const moveValue = minimax(newBoard, 0, false);
      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = i;
      }
    }
  }
  return bestMove;
};

const minimax = (board, depth, isMax) => {
  const winner = calculateWinner(board);
  if (winner === "X") return -10 + depth;
  if (winner === "O") return 10 - depth;
  if (board.every((square) => square)) return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = board.slice();
        newBoard[i] = "O";
        best = Math.max(best, minimax(newBoard, depth + 1, false));
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = board.slice();
        newBoard[i] = "X";
        best = Math.min(best, minimax(newBoard, depth + 1, true));
      }
    }
    return best;
  }
};

// Layout Component
const Tac = () => {
  return (
    <div className="grid place-items-center bg-slate-800 h-[100vh]">
      <div className="flex justify-center mb-8">
        <HiMiniXMark className="h-14 text-blue-500" />
        <PiNumberZeroBold className="h-14 text-orange-500" />
      </div>
      <TicTacToe />
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-blue-500 items-center justify-center w-24 h-16 rounded-md flex">
          1
        </div>
        <div className="bg-gray-400 items-center justify-center w-24 h-16 rounded-md flex">
          2
        </div>
        <div className="bg-orange-400 items-center justify-center w-24 h-16 rounded-md flex">
          3
        </div>
      </div>
    </div>
  );
};

export default Tac;
