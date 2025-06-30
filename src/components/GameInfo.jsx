
const GameInfo = ({ currentPlayer, gameStatus, onReset }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-primary glow">
      <h2 className="text-2xl font-bold mb-4 text-primary">Game Info</h2>
      <p className="mb-2 text-foreground">
        Current Turn: <span className="font-semibold capitalize text-accent">{currentPlayer}</span>
      </p>
      <p className="mb-2 text-foreground">
        Game Status: <span className="font-semibold capitalize text-accent">{gameStatus}</span>
      </p>
      {gameStatus !== 'ongoing' && (
        <button
          className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-accent transition-colors duration-300"
          onClick={onReset}
        >
          New Game
        </button>
      )}
    </div>
  );
};

export default GameInfo;
