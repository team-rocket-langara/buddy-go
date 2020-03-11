import { firebaseAuth } from 'boot/firebase'
import * as firebase from "firebase/app"
import router from 'src/router';

export function loginAuth({}, payload){
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password);
  })
  .then(response => {
    this.$router.push({ path: '/FeedFollowing'})
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(`loginAuth() -> Code: ${errorCode} -- ${errorMessage}`);
  });
}

export function checkUser(){
  firebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      console.log(displayName)
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}

export function alreadyLogged(){
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      this.$router.push({ path: '/FeedFollowing'})
    }
  });
}

export function logOut(){
  firebaseAuth.signOut()
  .then(response => {
    this.$router.push({ path: '/'})
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(`logOut() -> Code: ${errorCode} -- ${errorMessage}`);
  })
}