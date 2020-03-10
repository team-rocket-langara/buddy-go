import { firebaseAuth } from 'boot/firebase'
import VueRouter from 'vue-router'

export function loginAuth({}, payload){
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
        if(response){
            this.$router.push({ path: '/FeedFollowing'})
        }
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
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

          alert(email)
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });
}