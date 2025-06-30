
import { useState, useEffect } from 'react';
import ChessPiece from './ChessPiece';
import { isValidMove } from '../utils/chessRules';

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const ChessBoard = ({ currentPlayer, onTurnChange, setGameStatus, onPieceCapture }) => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const movePiece = (startPos, endPos) => {
    const newBoard = board.map(row => [...row]);
    const capturedPiece = newBoard[endPos.y][endPos.x];
    
    // If there's a piece being captured, notify parent
    if (capturedPiece) {
      onPieceCapture(capturedPiece);
    }
    
    newBoard[endPos.y][endPos.x] = newBoard[startPos.y][startPos.x];
    newBoard[startPos.y][startPos.x] = null;
    setBoard(newBoard);
    onTurnChange();
  };

  const handleSquareClick = (x, y) => {
    if (selectedPiece) {
      if (isValidMove(board, selectedPiece, { x, y }, currentPlayer)) {
        movePiece(selectedPiece, { x, y });
        setSelectedPiece(null);
      } else {
        setSelectedPiece(null);
      }
    } else {
      const piece = board[y][x];
      if (piece && (currentPlayer === 'white' ? piece === piece.toUpperCase() : piece === piece.toLowerCase())) {
        setSelectedPiece({ x, y });
      }
    }
  };

  useEffect(() => {
    // Check for checkmate or stalemate
    // This is a simplified check. You may want to implement a more robust check.
    const isKingCaptured = !board.flat().includes(currentPlayer === 'white' ? 'K' : 'k');
    if (isKingCaptured) {
      setGameStatus(`${currentPlayer === 'white' ? 'Black' : 'White'} wins!`);
    }
  }, [board, currentPlayer, setGameStatus]);

  return (
    <div className="grid grid-cols-8 gap-0 border-4 border-primary rounded-lg overflow-hidden glow">
      {board.map((row, y) =>
        row.map((piece, x) => (
          <div
            key={`${x}-${y}`}
            className={`w-16 h-16 flex items-center justify-center ${
              (x + y) % 2 === 0 ? 'bg-secondary' : 'bg-background'
            } ${selectedPiece && selectedPiece.x === x && selectedPiece.y === y ? 'bg-accent bg-opacity-50' : ''}`}
            onClick={() => handleSquareClick(x, y)}
          >
            {piece && <ChessPiece piece={piece} />}
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;
