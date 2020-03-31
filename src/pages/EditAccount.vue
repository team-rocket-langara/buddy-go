<template>
  <q-layout class="login">

    <q-btn class="btn-back" flat @click="$router.go(-1)">
      <img src="../assets/layout/arrow-icon.svg">
    </q-btn>

    <h1>What do you want to change?</h1>

    <q-btn
    class="btn-big btn-round btn-yellow margin-top"
    @click="showForm = !showForm"
    v-if="showForm === false"
    >
    Change My Password
    </q-btn>

    <q-form
    class="login-form"
    @submit="verifyLogin(formData)"
    v-if="showForm === true && newPass === false"
    >

      <p>Please confirm your login again!</p>

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
      class="btn-big btn-round btn-purple"
      type="submit"
      >
      Continue
      </q-btn>

    </q-form>

    <q-form
    @submit="submitForm()"
    class="login-form"
    v-if="newPass === true"
    >
      <q-input
      v-model="newData.password"
      :type="isPwd ? 'password' : 'text'"
      label="Password (Min 8 characters)"
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
      <q-input
      v-model="newData.confirm"
      :type="isPwd ? 'password' : 'text'"
      label="Confirm Password"
      class="input-textfield"
      :rules="[
        val => val !== null && val !== '' && val === newData.password
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
      class="btn-big btn-round btn-purple"
      type="submit"
      >
      Continue
      </q-btn>

    </q-form>

    <q-btn
    class="btn-big btn-round btn-yellow margin-top"
    to="/PictureUpdate"
    >
    Change My Profile Picture
    </q-btn>

  </q-layout>
</template>

<script>
import { firebaseAuth, firebaseDb } from '../boot/firebase'
import * as firebase from "firebase/app"

export default {
  name: 'EditAccount',
  data () {
    return {
      isPwd: true,
      formData: {
        email: '',
        password: '',
        confirm: ''
      },
      newData: {
        password: '',
        confirm: ''
      },
      showForm: false,
      newPass: false
    }
  },
  methods: {
    submitForm() {
      if(this.newData.password === this.newData.confirm){
        firebaseAuth.currentUser.updatePassword(this.newData.password)
        .then(response => {
          this.$q.notify({
            message: "Password Changed!",
            color: 'positive',
            position: 'top'
          })
          this.showForm = false,
          this.newPass = false
        })
      }
      else{
        this.$q.notify({
          message: "Confirmation doesn't match!",
          color: 'negative',
          position: 'top'
        })
      }
    },
    verifyLogin(payload){
      firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        return firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password);
      })
      .then(response => {
        this.newPass = true
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`loginAuth() -> Code: ${errorCode} -- ${errorMessage}`);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/palette';
.margin-top{
  margin-top: 2rem;
}

.btn-back{
  align-self: flex-start;
  margin-top: 2rem;
  margin-left: 2rem;
}

.login{
  background: $accent;
  padding-top: 0;
  padding-bottom: 3rem;
}

p{
  width: 80%;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  color: $primary;
}

h1{
  font-size: 1.5rem;
  font-weight: bolder;
  color: $primary;
  margin-top: 3rem;
}
</style>
