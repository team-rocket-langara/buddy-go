<template>
  <q-layout class="login">

    <div class="login-logo">
      <img src="../assets/layout/buddy-go-logo-login.svg">
    </div>

    <h1>Welcome!</h1>

    <div class="login-form">
      <q-input
      v-model="text"
      label="Email"
      :type="text"
      class="input-textfield"
      />
      <q-input
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      class="input-textfield"
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
      to="/FeedFollowing"
      >
      Continue
      </q-btn>

      <q-item
      class="btn-small">
      Forgot your password?
      </q-item>
    </div>

  </q-layout>
</template>

<script>
export default {
  name: 'CreateAccount',
  data () {
    return {
      isPwd: true
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