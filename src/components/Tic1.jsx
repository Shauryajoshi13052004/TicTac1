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
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
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

  const getBestMove = (newBoard) => {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = "O";
        let score = minimax(newBoard, 0, false);
        newBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    let scores = {
      X: -1,
      O: 1,
      tie: 0,
    };

    let result = calculateWinner(newBoard);
    if (result !== null) {
      return scores[result] || scores['tie'];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "O";
          let score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "X";
          let score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
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
    return squares.includes(null) ? null : 'tie';
  };

  const winner = calculateWinner(board);
  const status = winner
    ? winner === 'tie' ? "It's a tie!" : `Winner: ${winner}`
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
