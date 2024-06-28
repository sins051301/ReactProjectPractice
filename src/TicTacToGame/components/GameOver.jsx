function GameOver({ winner, RematchClick }) {
  return (
    <div>
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>draw..</p>}
      <p>
        <button onClick={RematchClick}>Rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;
