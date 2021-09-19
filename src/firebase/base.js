import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(firebaseApp);

export default storage;
