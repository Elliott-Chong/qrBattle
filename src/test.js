import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child, update } from "firebase/database";

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

var postData = { UserID: 1 };

set(child(database, "xxx"), postData)
  .then((x) => {
    console.log(x);
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    console.log(1);
  });

function miniGame(player1Score, player2Score) {
  probability = 1 / (1 + 10 ** (Math.abs(player1Score - player2Score) / 600));
  return Math.random() < probability;
  // } else if (player1Score < player2Score) {
  //   probability = 1 / (1 + 10 ** ((player2Score - player1Score) / 600));
  //   return Math.random() > probability;
  //   //True = P1, False = P2
}
