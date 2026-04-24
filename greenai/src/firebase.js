import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdYuW5vRlnTa51UPdnqg91ySxJFIiFf4w",
  authDomain: "greenai-tracker.firebaseapp.com.",
  projectId: "greenai-tracker",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log("Firebase connected");