import { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(true);
  const [isNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (winner) {
      setMessage(`${winner} wins!`);
    } else if (board.every((square) => square)) {
      setMessage("Its a draw");
    } else if (!isNext) {
      const bestMove = findBestMove(board, "o");
      setTimeout(() => makeMove(bestMove), 500);
    }
  }, [board, isNext, winner]);
//   board, isNext, winner

  const makeMove = (index) => {
    const newBoard = board.slice();
    newBoard[index] = "0";
    setBoard(newBoard);
    setIsXNext(true);
  };

  const handleClick = (index) => {
    if (board(index) || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isNext ? "x" : "o";
    setBoard(newBoard);
    setIsXNext(!isNext);
  };

  const renderSquare = (index) => {
    <button
      onClick={() => {
        handleClick(index);
      }}
    >
      {board[index]}
    </button>;
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap w-60 mb-4">
          {Array(9)
            .fill(null)
            .map((_, index) => {
              <div key={index}>
                {renderSquare(index)}
              </div>;
            })}
        </div>
        {message && <div className="text-2xl">{message}</div>}
      </div>
    </>
  );
};

const calculateWinner = (square) => {
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

  for (let i = 0; i < lines.lenght; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[c]) {
      return square[a];
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
        bestValue = i;
      }
    }
  }
  return bestMove;
};

// const minimax = (board,depth + 1,false) =>{
const minimax = (board, depth, isMax) => {
  const winner = calculateWinner(board);
  if (winner === "x") return -10 + depth;
  if (winner === "o") return -10 - depth;
  if (board.every((square) => square)) return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = board.slice();
        newBoard[i] = "0";
        best = Math.max(best, minimax(newBoard, depth + 1, false));
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const newBoard = board.slice();
        newBoard[i] = "x";
        best = Math.min(best, minimax(newBoard, depth + 1, true));
      }
    }
    return best;
  }
};

export default TicTacToe;
