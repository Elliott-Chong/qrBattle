import React from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import { initializeApp } from "@firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBGA0jaymuCb8BNiv-26XrWD1GG4gqa3Kw",
  authDomain: "qrbattle-1fc4e.firebaseapp.com",
  databaseURL:
    "https://qrbattle-1fc4e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qrbattle-1fc4e",
  storageBucket: "qrbattle-1fc4e.appspot.com",
  messagingSenderId: "1015207029765",
  appId: "1:1015207029765:web:a5942746701b22a5de806c",
};

initializeApp(firebaseConfig);

var database = ref(getDatabase());
function Game({ match }) {
  const userID = match.params.id;
  const [player1Score, setPlayer1Score] = React.useState();
  const [player2Score, setPlayer2Score] = React.useState();
  React.useEffect(() => {
    get(child(database, userID)).then((snapshot) => {
      setPlayer1Score(snapshot.val().score);
    });
    get(child(database, localStorage.getItem("userID").toString())).then(
      (snapshot) => {
        setPlayer2Score(snapshot.val().score);
      }
    );
  }, [userID]);

  function battle(player1Score, player2Score) {
    let probability;
    if (player1Score > player2Score) {
      probability =
        1 / (1 + 10 ** (Math.abs(player1Score - player2Score) / 60));
    } else {
      probability =
        1 / (1 + 10 ** (Math.abs(player2Score - player1Score) / 60));
    }
    let flag = Math.random > probability;
    if (flag) {
      return "P2";
    } else {
      return "P1";
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p>Player 1 score: {player1Score}</p>
      <p>Player 2 score: {player2Score}</p>
      {battle(player1Score, player2Score) === "P2" &&
      player1Score &&
      player2Score
        ? "Player 2 wins!"
        : "Player 1 wins!"}
    </div>
  );
}

export default Game;
