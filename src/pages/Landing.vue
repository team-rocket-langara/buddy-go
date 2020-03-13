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

      <q-btn
      class="btn-big btn-round btn-facebook"
      >
      Continue with Facebook
      </q-btn>

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

export default {
  name: 'Landig',
}
</script>