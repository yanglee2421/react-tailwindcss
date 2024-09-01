import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const app = initializeApp({
  apiKey: "AIzaSyAuKaDly2ursfwyGmehlXuLiC8jDsHLkwQ",
  authDomain: "rest-api-40617.firebaseapp.com",
  projectId: "rest-api-40617",
  storageBucket: "rest-api-40617.appspot.com",
  messagingSenderId: "733238189477",
  appId: "1:733238189477:web:4c7b07d4338afd235f5c4c",
  measurementId: "G-KRR8X41CFY",
});

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const authReady = auth.authStateReady();
export const firestore = getFirestore(app);
export const storage = getStorage(app);

// Auth Provider
export const githubAuthProvider = new GithubAuthProvider();
export const googleAuthProvider = new GoogleAuthProvider();
