import * as firebase from "firebase/app";
// import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0pkMBAiF3Ec9AY7qbdLVcqLz84dKkPZE",
  authDomain: "custard-deploy.firebaseapp.com",
  databaseURL: "https://custard-deploy.firebaseio.com",
  projectId: "custard-deploy",
  storageBucket: "custard-deploy.appspot.com",
  messagingSenderId: "607815226964",
  appId: "1:607815226964:web:3c245bfb0ae22bbb213fc1",
  measurementId: "G-1PF8ZL4YWG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// let database = firebase.firestore();
let database = firebase.database();

export default database;
