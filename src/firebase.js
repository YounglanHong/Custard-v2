import * as firebase from "firebase/app";
// import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

import {
  API_KEY,
  AUTH_DOMAIN,
  DB_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "./config/firebase";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// let database = firebase.firestore();
let database = firebase.database();

export default database;
