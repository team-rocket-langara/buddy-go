<template>
  <q-layout class="login">

    <div class="login-logo">
      <img src="../assets/layout/buddy-go-logo-login.svg">
    </div>

    <h1>Create your Account</h1>

    <q-form    
    @submit="submitForm()"
    class="login-form">

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
      class="btn-big btn-round btn-yellow"
      type="submit"
      >
      Continue
      </q-btn>

    </q-form>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateAccount',
  data () {
    return {
      isPwd: true,
      formData: {
        email: '',
        password: '',
        confirm: '',
        displayName: ''
      }
    }
  },
  methods: {
    ...mapActions('users', ['registerUser']),
    submitForm() {
      if(this.formData.password === this.formData.confirm){
        this.registerUser(this.formData)
      }
      else{
        this.$q.notify({
          message: "Confirmation doesn't match!",
          color: 'negative'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  margin-top: 3rem;
}
</style>
