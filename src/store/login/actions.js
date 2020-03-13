import { firebaseAuth } from 'boot/firebase'
import * as firebase from "firebase/app"
import router from 'src/router';

export function loginAuth({}, payload){
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    return firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password);
  })
  .then(response => {
    this.$router.push({
      path: '/FeedFollowing'
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`loginAuth Route Code: ${errorCode} -- ${errorMessage}`);
    })
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(`loginAuth() -> Code: ${errorCode} -- ${errorMessage}`);
  });
}

export function logOut(){
  firebaseAuth.signOut()
  .then(
    this.$router.push({
      path: '/'
    })
    .catch(function(error) {
      
    })
  )
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(`logOut() -> Code: ${errorCode} -- ${errorMessage}`);
  })
}