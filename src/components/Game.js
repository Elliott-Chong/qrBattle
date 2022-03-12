import React from "react";
import {
  getDatabase,
  ref,
  get,
  onValue,
  child,
  update,
} from "firebase/database";
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
  const [userID, setUserID] = React.useState(match.params.userId);
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
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p>Player 1 score: {player1Score}</p>
      <p>Player 2 score: {player2Score}</p>
    </div>
  );
}

export default Game;
