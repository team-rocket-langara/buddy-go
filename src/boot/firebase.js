// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCAt2eI253PoDnWjgvJqNjaRckbVnZfVEw",
  authDomain: "buddydb-93bf8.firebaseapp.com",
  databaseURL: "https://buddydb-93bf8.firebaseio.com",
  projectId: "buddydb-93bf8",
  storageBucket: "buddydb-93bf8.appspot.com",
  messagingSenderId: "124668771423",
  appId: "1:124668771423:web:7b71e99bc9c71a22086fea"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.firestore();

export {
  firebaseAuth,
  firebaseDb
}