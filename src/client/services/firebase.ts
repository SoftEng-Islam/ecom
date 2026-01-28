import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHmDOUHxgn1LZlI3BEZeoCrnP6FYz6DCU",
    authDomain: "ecome-site.firebaseapp.com",
    projectId: "ecome-site",
    storageBucket: "ecome-site.firebasestorage.app",
    messagingSenderId: "501157673925",
    appId: "1:501157673925:web:ca7db04737e016c83429ac",
    measurementId: "G-GCMLKS2EC5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
