<template>
  <q-layout class="login">

    <q-btn class="btn-back" flat @click="$router.go(-1)">
      <img src="../assets/layout/arrow-icon.svg">
    </q-btn>

    <h1>What do you want to change?</h1>

    <q-form
    class="login-form"
    @submit="updateInfo"
    >

      <q-input
      v-model="myUserInfo.name"
      label="Pet's Name *"
      class="input-textfield"
      :rules="[
        val => val !== null && val !== ''
      ]"
      />

      <q-input
      v-model="myUserInfo.breed"
      label="Breed *"
      class="input-textfield"
      :rules="[
        val => val !== null && val !== ''
      ]"
      />

      <q-input
      v-model="myUserInfo.gender"
      label="Gender"
      class="input-textfield"
      />

      <q-input
      v-model="myUserInfo.birthday"
      label="Birthday"
      class="input-textfield"
      type="date"
      />

      <q-input
      v-model="myUserInfo.food"
      label="Favourite Food"
      class="input-textfield"
      />

      <q-input
      v-model="myUserInfo.toy"
      label="Favourite Toy"
      class="input-textfield"
      />

      <q-input
      v-model="myUserInfo.hometown"
      label="Hometown"
      class="input-textfield"
      />


      <q-input
      v-model="myUserInfo.bio"
      label="Bio"
      class="input-textfield"
      type="textarea"
      />
      
      <q-btn
      class="btn-big btn-round btn-purple"
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
  name: 'EditProfile',
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions('user', ['userInfo', 'updateUser']),
    getUserInfo(){
      this.userInfo()
    },
    updateInfo(){
      this.updateUser(this.myUserInfo)
    }
  },
  computed: {
    myUserInfo(){
      return this.$store.getters['user/getUserInfo']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/palette';

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