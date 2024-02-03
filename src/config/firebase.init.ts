import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBpNiA1eHbxAadsV50Ho97DQrFLJOEoH2c",
  authDomain: "novanexus-341f4.firebaseapp.com",
  projectId: "novanexus-341f4",
  storageBucket: "novanexus-341f4.appspot.com",
  messagingSenderId: "565517830376",
  appId: "1:565517830376:web:010223ee0305fcd6c9615d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
