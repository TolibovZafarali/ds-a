import { useState } from 'react';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button className={isWinning ? "square winning" : "square"} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay}) {
  const [winner, winningLine] = calculateWinner(squares);
  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  function isFull(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === null) {
          return false;
        }
    }
    return true;
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!winner && isFull(squares)) {
    status = 'Draw'
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const rows = Array(3).fill(null);
  
  for (let i = 0; i < 3; i++) {
    const squaresInRows = Array(3).fill(null);
    for (let z = 0; z < 3; z++) {
      const idx = i * 3 + z
      squaresInRows[z] = <Square value={squares[idx]} onSquareClick={() => handleClick(idx)} isWinning={winningLine?.includes(idx)} key={idx}/>
    }
    rows[i] = squaresInRows;
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows.map((row, index) => (
        <div className='board-row' key={index}>
          {row.map(s => (
              s
          ))}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), lastMove: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, idx) {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, lastMove: idx}];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((entry, move) => {
    
    const lastMove = entry.lastMove

    let row, col;

    if (lastMove !== null) {
      row = Math.floor(lastMove / 3) + 1;
      col = (lastMove % 3) + 1;
    }

    let description;
    if (move === currentMove && move !== 0) {
      description = <>You are at move #{move} ({row}, {col})</>
    } else if (move === 0 && move === currentMove) {
      description = <>You are at game start</>
    } else if (move === 0 && move !== currentMove) {
      description = <button onClick={() => jumpTo(move)}>Go to game start</button>
    } else {
      description = <button onClick={() => jumpTo(move)}>Go to move #{move} ({row}, {col})</button>
    }
    return (
      <li key={move}>
        {description}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {isAscending ? moves : [...moves].reverse()}
        </ol>
        <button onClick={() => setIsAscending(!isAscending)}>Sort</button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}
