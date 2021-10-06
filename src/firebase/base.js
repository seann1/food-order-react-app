import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const config = {
  projectId: "food-order-app-d078d",
  appId: "1:259467273114:web:30d5b69c0c9db4b23b5023",
  databaseURL: "https://food-order-app-d078d-default-rtdb.firebaseio.com",
  storageBucket: "food-order-app-d078d.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyDR64c87WSnLF6Pn6MiL6hyukSOKNdqhZ8",
  authDomain: "food-order-app-d078d.firebaseapp.com",
  messagingSenderId: "259467273114",
};
const firebaseApp = initializeApp(config);
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    //const uid = user.uid;
    console.log(user.uid);
    //console.log("user exists");
    // ...
  } else {
    console.log("change");
    // User is signed out
    // ...
  }
});
//const storage = getStorage(firebaseApp);

export default firebaseApp;
