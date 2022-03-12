import React from "react";
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

localStorage.setItem("", "");

function MainPage() {
  get(child(database, "xxx"), { xd: 3000 })
    .then((x) => {
      console.log(x);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log(1);
    });

  return <div>MainPage</div>;
}

export default MainPage;
