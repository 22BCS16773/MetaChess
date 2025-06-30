
import { useState, useEffect } from 'react';
import ChessBoard from '../components/ChessBoard';
import GameInfo from '../components/GameInfo';
import ScoreCard from '../components/ScoreCard';

const Index = () => {
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameStatus, setGameStatus] = useState('ongoing');
  const [capturedPieces, setCapturedPieces] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [gameTime, setGameTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStatus === 'ongoing') {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStatus]);

  const handleTurnChange = () => {
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    setMoveCount(prev => prev + 1);
  };

  const handlePieceCapture = (capturedPiece) => {
    setCapturedPieces(prev => [...prev, capturedPiece]);
  };

  const resetGame = () => {
    setCurrentPlayer('white');
    setGameStatus('ongoing');
    setCapturedPieces([]);
    setMoveCount(0);
    setGameTime(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-5xl font-bold mb-8 text-primary">Futuristic Chess</h1>
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          <ChessBoard 
            currentPlayer={currentPlayer} 
            onTurnChange={handleTurnChange} 
            setGameStatus={setGameStatus}
            onPieceCapture={handlePieceCapture}
          />
          <GameInfo 
            currentPlayer={currentPlayer} 
            gameStatus={gameStatus}
            onReset={resetGame}
          />
        </div>
        <ScoreCard 
          capturedPieces={capturedPieces}
          moveCount={moveCount}
          gameTime={gameTime}
        />
      </div>
    </div>
  );
};

export default Index;
