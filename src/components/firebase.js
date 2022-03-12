var postData = { UserID: 1 };

function Game({ match }) {
  console.log(match.params.userId);
  return <div>Game</div>;
}

export default Game;
