<template>
  <q-layout class="login">

    <q-btn class="btn-back" flat @click="$router.go(-1)">
      <img src="../assets/layout/arrow-icon.svg">
    </q-btn>

    <h1>What do you want to change?</h1>

    <q-form
    @submit="submitForm()"
    class="login-form">

      <q-input
      v-model="formData.password"
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
      v-model="formData.confirm"
      :type="isPwd ? 'password' : 'text'"
      label="Confirm Password"
      class="input-textfield"
      :rules="[
        val => val !== null && val !== '' && val === formData.password
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
    type="submit"
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
      }
    }
  },
  methods: {
    submitForm() {
      if(this.formData.password === this.formData.confirm){
        
      }
      else{
        this.$q.notify({
          message: "Confirmation doesn't match!",
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
  width: 50%;
  font-size: .9rem;
  text-align: center;
  margin-top: 1rem;
  line-height: 1.5;
}

h1{
  font-size: 1.5rem;
  font-weight: bolder;
  color: $primary;
  margin-top: 3rem;
}
</style>
