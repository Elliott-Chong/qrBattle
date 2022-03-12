import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  onValue,
  child,
  update,
} from "firebase/database";

const rootURL = "http://localhost:5000";

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

const processData = () => {
  var userID = localStorage.getItem("userID");

  if (!userID) {
    userID = generateRandomNumber(0, 10000000).toString();
    update(child(database, userID), {
      score: generateRandomNumber(5, 1000),
    })
      .then((x) => {
        localStorage.setItem("userID", userID);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        console.log("Done");
      });
  } else {
    userID = userID.toString();
    //check if exists
    get(child(database, userID)).then((snapshot) => {
      if (!snapshot.exists()) {
        localStorage.removeItem(userID);
        userID = generateRandomNumber(0, 10000000);
        update(
          child(database, userID, {
            score: generateRandomNumber(5, 1000),
          })
            .then((x) => {
              localStorage.setItem("userID", userID);
            })
            .catch((e) => {
              alert(e);
            })
            .finally(() => {
              console.log("Done");
            })
        );
      }
    });
  }

  return userID;
};

function MainPage() {
  const [userID, setUserID] = useState();
  const [userScore, setUserScore] = useState();

  React.useEffect(() => {
    setUserID(processData());
  }, []);
  React.useEffect(() => {
    if (!userID) return;
    onValue(child(database, userID), (snapshot) => {
      setUserScore(snapshot.val().score);
    });
  }, [userID]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-poppins font-bold">Your QR Code:</h1>
      <img
        // className="h-100"
        src={`https://chart.googleapis.com/chart?chl=${rootURL}/${userID}&chs=400x400&cht=qr`}
        alt=""
      />
      <p className="text-xl font-poppins">Score: {userScore}</p>
    </div>
  );
}

export default MainPage;
