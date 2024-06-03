import React, { useState, useEffect } from "react";
import "./App.css";

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);

  useEffect(() => {
    if (!isXTurn && !calculateWinner(board) && board.includes(null)) {
      makeComputerMove();
    }
  }, [isXTurn, board]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXTurn(false);
  };

  const makeComputerMove = () => {
    const bestMove = getBestMove(board);
    if (bestMove !== null) {
      const newBoard = board.slice();
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      setIsXTurn(true);
    }
  };

  const getBestMove = (board) => {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (board, depth, isMaximizing) => {
    const scores = {
      X: -1,
      O: 1,
      tie: 0,
    };

    const result = calculateWinner(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
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
    return squares.includes(null) ? null : "tie";
  };

  const winner = calculateWinner(board);
  const status = winner
    ? winner === "tie"
      ? "It's a tie!"
      : `Winner: ${winner}`
    : `Next player: ${isXTurn ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-white border-2 border-gray-400 text-2xl font-bold flex items-center justify-center"
          >
            {value}
          </button>
        ))}
      </div>
      <div className="mt-4">{status}</div>
      <button
        onClick={() => {
          setBoard(initialBoard);
          setIsXTurn(true);
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
}

export default App;
