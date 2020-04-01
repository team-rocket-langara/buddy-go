<template>
  <q-layout class="login">

    <div class="login-logo">
      <img src="../assets/layout/buddy-go-logo-login.svg">
    </div>

    <h1>Welcome!</h1>

    <q-form
    class="login-form"
    @submit="submitForm(formData)">

      <q-input
      v-model="formData.email"
      label="Email"
      class="input-textfield"
      :rules="[
        val => val !== null && val !== ''
      ]"
      />
      <q-input
      v-model="formData.password"
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      class="input-textfield"
      :rules="[
        val => val !== null && val !== ''
      ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn
      class="btn-big btn-round btn-yellow"
      type="submit"
      >
      Continue
      </q-btn>

      <q-item
      class="btn-small"
      clickable
      @click="sendReset()"
      >
      Forgot your password?
      </q-item>

      <q-item
      class="btn-small last"
      to="/CreateAccount">
      Create account
      </q-item>

    </q-form>
  </q-layout>
</template>

<script>
import { firebaseAuth } from 'boot/firebase'
import * as firebase from "firebase/app"

export default {
  name: 'Login',
  data () {
    return {
      isPwd: true,
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm(payload) {
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
      .catch(error => {
        this.$q.notify({
          message: "E-mail or Password Incorrect!",
          color: 'negative',
          position: 'top'
        })
      });
    },

    sendReset(){
      let userMail = this.formData.email
      if(userMail != ''){
        firebaseAuth.sendPasswordResetEmail(userMail)
        .then(response => {
          this.$q.notify({
            message: "We sent an email to you!",
            color: 'positive',
            position: 'top'
          })
        })
        .catch(function(error) {
          console.log(error)
        });
      } else {
        this.$q.notify({
          message: "Please, inform your email",
          color: 'negative',
          position: 'top'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/palette';

.btn-small{
  margin-top: 3rem;
  font-size: .8rem;
  color: $accent;
  font-weight: 500;
  text-decoration: underline;
  text-underline-position: under;
}

.last{
  margin-top: 0 !important;
}
</style>