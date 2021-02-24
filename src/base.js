import Rebase from "re-base";
import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCD51KxKAm1l9LiNDx4bnTHQ3SSGJUlVC0",
  authDomain: "catch-of-the-day-brwb.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-brwb-default-rtdb.europe-west1.firebasedatabase.app",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
