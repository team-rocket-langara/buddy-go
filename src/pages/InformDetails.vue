<template>
  <q-layout class="login">

    <h1>Tell Us About Your Buddy</h1>

    <p>We are just collecting some details for your profile</p>

    <q-form
    class="login-form"
    @submit="submitDetails"
    >

      <q-input
      v-model="formData.name"
      label="Pet's Name *"
      class="input-textfield"
      :rules="[
        val => val !== null && val !== ''
      ]"
      />

      <q-input
      v-model="formData.breed"
      label="Breed *"
      class="input-textfield"
      :rules="[
        val => val !== null && val !== ''
      ]"
      />

      <q-select
      borderless
      v-model="formData.gender"
      :options="genderOpt"
      label="Gender"
      class="select-input"
      />

      <q-input
      v-model="formData.birthday"
      label="Birthday"
      class="input-textfield"
      type="date"
      />

      <q-input
      v-model="formData.food"
      label="Favourite Food"
      class="input-textfield"
      />

      <q-input
      v-model="formData.toy"
      label="Favourite Toy"
      class="input-textfield"
      />

      <q-input
      v-model="formData.hometown"
      label="Hometown"
      class="input-textfield"
      />

      <q-input
      v-model="formData.bio"
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
  name: 'InformDetails',
  data() {
    return {
      formData: {
        name: '',
        breed: '',
        gender: '',
        birthday: '',
        food: '',
        toy: '',
        bio: '',
        hometown: ''
      },
      genderOpt: [
        'Male', 'Female'
      ]
    }
  },
  methods: {
    ...mapActions('user', ['firstUpdate']),
    submitDetails(){
      this.firstUpdate(this.formData);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/palette';

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
  font-size: 3rem;
  font-weight: bolder;
  color: $primary;
  margin-top: 3rem;
}
</style>
