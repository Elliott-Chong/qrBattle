import React from "react";
import { getDatabase, ref, get, child, update } from "firebase/database";
import { useHistory } from "react-router-dom";
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
function battle(player1Score, player2Score) {
  let probability;
  let flag;
  if (player1Score > player2Score) {
    probability = 1 / (1 + 10 ** (Math.abs(player1Score - player2Score) / 60));
    flag = Math.random > probability;
    if (flag) {
      return "P2";
    } else {
      return "P1";
    }
  } else {
    probability = 1 / (1 + 10 ** (Math.abs(player2Score - player1Score) / 60));
    flag = Math.random > probability;
    if (flag) {
      return "P1";
    } else {
      return "P2";
    }
  }
}

var database = ref(getDatabase());
function Game({ match }) {
  const history = useHistory();
  const userID = match.params.userID;
  const [player1Score, setPlayer1Score] = React.useState();
  const [player2Score, setPlayer2Score] = React.useState();
  const [winner, setWinner] = React.useState();
  //Create a match

  function setScores(WuserID, LuserID, WScore) {
    console.log("inside set score");
    console.log(WScore, WuserID, LuserID);
    update(child(database, WuserID.toString()), {
      score: WScore,
    });

    update(child(database, LuserID.toString()), {
      score: 0,
    });
  }
  //Start Match

  React.useEffect(() => {
    const winPerson = battle(player1Score, player2Score);
    console.log(winPerson);
    console.log("userid", userID);
    setWinner(winPerson);
    if (player1Score && player2Score) {
      if (winPerson === "P1") {
        console.log("p1 wins");
        setScores(
          userID.toString(),
          localStorage.getItem("userID").toString(),
          Math.ceil(parseInt(player1Score) + parseInt(player2Score) / 2)
        );
      } else {
        console.log("p2 wins");
        setScores(
          localStorage.getItem("userID").toString(),
          userID.toString(),
          Math.ceil(parseInt(player2Score) + parseInt(player1Score) / 2)
        );
      }
    }

    get(child(database, userID.toString())).then((snapshot) => {
      setPlayer1Score(snapshot.val().score);
    });

    get(child(database, localStorage.getItem("userID").toString())).then(
      (snapshot) => {
        setPlayer2Score(snapshot.val().score);
      }
    );
  }, [userID, player1Score, player2Score]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p>Player 1 score: {player1Score}</p>
      <p>Player 2 score: {player2Score}</p>
      {winner === "P2" ? "Player 2 wins!" : "Player 1 wins!"}
      <button className="mt-2" onClick={(_) => history.push("/")}>
        Back Home
      </button>
    </div>
  );
}

export default Game;
