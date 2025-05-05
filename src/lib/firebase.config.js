import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNqPDVDU0jQRVTgq_cH2yxghh3ruiZv4Y",
  authDomain: "leksika-f3d50.firebaseapp.com",
  projectId: "leksika-f3d50",
  storageBucket: "leksika-f3d50.appspot.com",
  messagingSenderId: "646110462058",
  appId: "1:646110462058:web:f6b6d4443fc838ebbc4a13",
  measurementId: "G-289FTY8ENJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export { signInWithGoogle };
