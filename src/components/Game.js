import React from "react";

function Game({ match }) {
  console.log(match.params.userId);
  return <div>Game</div>;
}

export default Game;
