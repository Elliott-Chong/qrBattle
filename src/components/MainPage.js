import React, { useState } from "react";
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

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function MainPage() {
  var userID = localStorage.getItem("userID");

  if (!userID) {
    userID = generateRandomNumber(0, 10000000);
    update(child(database, userID, { score: generateRandomNumber(5, 1000) }))
      .then(() => {
        localStorage.setItem("userID", userID);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        console.log("Done");
      });
  }

  const [userIDState, setUserID] = useState();
  const [userScore, setUserScore] = useState();
  setUserID(userID);

  database.ref(`${userIDState}`).on("value", (snapshot) => {
    console.log(snapshot.val());
    setUserScore(snapshot.val().score);
  });

  return (
    <div>
      <img
        src={`https://chart.googleapis.com/chart?chl=${userIDState}&chs=200x400&cht=qr`}
        alt=""
      />
      {userScore}
    </div>
  );
}

export default MainPage;
