import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.VITE_apiKey,
  authDomain: import.meta.VITE_authDomain,
  projectId: import.meta.VITE_projectId,
  storageBucket: import.meta.VITE_storageBucket,
  messagingSenderId: import.meta.VITE_messagingSenderId,
  appId: import.meta.VITE_appId,
  measurementId: import.meta.VITE_measurementId,
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);