<template>
  <q-layout class="login">

    <div class="login-logo">
      <img src="../assets/layout/buddy-go-logo-login.svg">
    </div>

    <h1>Welcome!</h1>

    <q-form
    class="login-form"
    @submit="submitForm()">

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
      class="btn-small">
      Forgot your password?
      </q-item>

    </q-form>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'

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
    ...mapActions('login', ['loginAuth']),
    submitForm() {
      this.loginAuth(this.formData)
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
</style>