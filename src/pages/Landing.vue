<template>
  <q-layout class="login">

    <div class="login-logo">
      <img src="../assets/layout/buddy-go-logo-login.svg">
    </div>

    <div class="login-logo-text">
      <img src="../assets/layout/buddy-go-logo-text-login.svg">
    </div>

    <h1>Connecting pets Everywhere!</h1>

    <div class="login-btn-area">

      <q-btn
      class="btn-big btn-round btn-pink"
      to="/CreateAccount"
      >
      Sing up Free
      </q-btn>

      <!-- <q-btn
      class="btn-big btn-round btn-facebook"
      @click="submitGoogle"
      >
      Continue with Facebook
      </q-btn> -->

      <q-btn
      class="btn-big btn-round"
      to="/Login"
      :ripple="false"
      >
      Log in
      </q-btn>

    </div>

  </q-layout>
</template>

<script>
import * as firebase from "firebase/app"
import 'firebase/storage'
import { firebaseAuth, firebaseDb, firebaseGoogle } from 'boot/firebase'
import VueRouter from 'vue-router'


export default {
  name: 'Landig',
  methods: {
    submitGoogle(){
      firebaseAuth.signInWithPopup(firebaseGoogle).then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  }
}
</script>