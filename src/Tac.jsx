import React, { useState } from 'react';

const initialBoard = Array(9).fill(null);

const checkWinner = (board) => {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isUserTurn, setIsUserTurn] = useState(true);

  const handleClick = (index) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isUserTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsUserTurn(!isUserTurn);

    if (!isUserTurn) {
      setTimeout(() => makeComputerMove(newBoard), 500);
    }
  };

  const makeComputerMove = (board) => {
    const emptyIndices = board.reduce((acc, val, idx) => (val === null ? acc.concat(idx) : acc), []);
    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randomIndex] = 'O';
    setBoard(board);
    setIsUserTurn(true);
  };

  const winner = checkWinner(board);
  const isDraw = board.every((cell) => cell) && !winner;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 flex items-center justify-center border-2 border-gray-300 cursor-pointer text-2xl"
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-4 text-2xl font-bold">
          Winner: {winner}
        </div>
      )}
      {isDraw && (
        <div className="mt-4 text-2xl font-bold">
          It's a Draw!
        </div>
      )}
    </div>
  );
};

export default Game;
