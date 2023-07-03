// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChT4ksTH88jVczyABfQyRJMI5Gp-HEP2k",
  authDomain: "upload-img-860dc.firebaseapp.com",
  projectId: "upload-img-860dc",
  storageBucket: "upload-img-860dc.appspot.com",
  messagingSenderId: "120854300328",
  appId: "1:120854300328:web:83046de5706c344700649d",
  measurementId: "G-HBC2SCZ2PD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
