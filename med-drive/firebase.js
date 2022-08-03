import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Config from "react-native-config";

// const firebaseConfig = {
//   apiKey: Config.REACT_APP_FIREBASE_API_KEY,
//   authDomain: Config.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: Config.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: Config.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: Config.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: Config.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: Config.REACT_APP_FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAW7cz0rp5_9OicmW64QRnfYeajFsbODFM",
  authDomain: "med-drive-f4626.firebaseapp.com",
  projectId: "med-drive-f4626",
  storageBucket: "med-drive-f4626.appspot.com",
  messagingSenderId: "587056061893",
  appId: "1:587056061893:web:3e449250e6433353977fac",
  measurementId: "G-KQ9E485D6Q"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 
const auth =getAuth(app); 

export {db, auth};