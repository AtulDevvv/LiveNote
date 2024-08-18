import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {

  apiKey: "AIzaSyDmKXuQVb8Cy8ZVPKURW8RqtuCVkW4MZ2M",

  authDomain: "ai-productivity-app-2e3a1.firebaseapp.com",

  projectId: "ai-productivity-app-2e3a1",

  storageBucket: "ai-productivity-app-2e3a1.appspot.com",

  messagingSenderId: "219861120122",

  appId: "1:219861120122:web:fc6e840e313a26c60d37c3",

  measurementId: "G-XR5K1W81L5"

};

  const app= getApps().length===0 ? initializeApp(firebaseConfig):getApp()
  const db=getFirestore(app)

  export {db};