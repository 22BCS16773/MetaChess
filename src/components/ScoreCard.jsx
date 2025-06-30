
import { Crown, Star, Zap, Triangle, Rocket, CircleDot } from 'lucide-react';

const ScoreCard = ({ capturedPieces, moveCount, gameTime }) => {
  const getPieceIcon = (piece) => {
    const size = 20;
    switch (piece.toLowerCase()) {
      case 'p':
        return <CircleDot size={size} />;
      case 'r':
        return <Rocket size={size} />;
      case 'n':
        return <Triangle size={size} />;
      case 'b':
        return <Zap size={size} />;
      case 'q':
        return <Star size={size} />;
      case 'k':
        return <Crown size={size} />;
      default:
        return null;
    }
  };

  const whiteCaptured = capturedPieces.filter(piece => piece === piece.toUpperCase());
  const blackCaptured = capturedPieces.filter(piece => piece === piece.toLowerCase());

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-primary glow">
      <h2 className="text-2xl font-bold mb-4 text-primary">Score Card</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-accent mb-2">Captured by White</h3>
          <div className="flex flex-wrap gap-2 min-h-[40px] bg-secondary p-2 rounded">
            {blackCaptured.map((piece, index) => (
              <div key={index} className="text-destructive">
                {getPieceIcon(piece)}
              </div>
            ))}
            {blackCaptured.length === 0 && <span className="text-muted-foreground text-sm">No captures yet</span>}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-accent mb-2">Captured by Black</h3>
          <div className="flex flex-wrap gap-2 min-h-[40px] bg-secondary p-2 rounded">
            {whiteCaptured.map((piece, index) => (
              <div key={index} className="text-primary">
                {getPieceIcon(piece)}
              </div>
            ))}
            {whiteCaptured.length === 0 && <span className="text-muted-foreground text-sm">No captures yet</span>}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-foreground">Total Moves:</span>
            <span className="font-semibold text-accent">{moveCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground">Game Time:</span>
            <span className="font-semibold text-accent">{formatTime(gameTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
