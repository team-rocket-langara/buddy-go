<template>
  <q-layout class="login adopt">

    <q-btn class="btn-back" flat @click="$router.go(-1)">
      <img src="../assets/layout/arrow-icon.svg">
    </q-btn>

    <h1>We need some details</h1>

    <p>We are very happy that you are helping this buddy!</p>

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

      <q-select
      borderless
      v-model="formData.vaccine"
      :options="options"
      label="Vaccines"
      class="select-input"
      />

      <q-input
      v-model="formData.desc"
      label="So, tell us something "
      class="input-textfield"
      type="textarea"
      />
      
      <q-btn
      class="btn-big btn-round btn-purple"
      type="submit"
      >
      Continue
      </q-btn>

      <q-btn
      class="btn-big btn-round"
      @click="removePost"
      style="margin-top: 1rem;"
      >
      Delete
      </q-btn>

    </q-form>
  </q-layout>
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import VueRouter from 'vue-router'
import * as firebase from "firebase/app"

export default {
  name: 'EditAdopt',
  data() {
    return {
      formData: {
        name: '',
        breed: '',
        gender: '',
        vaccine: '',
        desc: ''
      },
      options: [
        'Yes', 'No'
      ],
      genderOpt: [
        'Male', 'Female'
      ],
      model: null
    }
  },
  methods: {
    submitDetails(){
      firebaseDb.collection('adopt-feed').doc(this.$route.params.adoptId).update({
        userId: firebaseAuth.currentUser.uid,
        name: this.formData.name,
        breed: this.formData.breed,
        gender: this.formData.gender,
        desc: this.formData.desc,
        vaccine: this.formData.vaccine,
        timestamp: firebase.firestore.Timestamp.now()
      })
      .then(response => {
        this.$router.push({ path: '/PostAdopt/' + this.$route.params.adoptId})
      })
      .catch(err => {
        console.log(err)
      })
    },

    getAdopt(){
      let currentAdopt = this.$route.params.adoptId
      firebaseDb.collection('adopt-feed').doc(currentAdopt).get()
      .then(response => {
          this.formData.name = response.data().name,
          this.formData.desc = response.data().desc,
          this.formData.breed = response.data().breed,
          this.formData.gender = response.data().gender,
          this.formData.vaccine = response.data().vaccine
      })
    },

    removePost(){
      navigator.notification.confirm(
        'Do you really want to delete this post?', // message
        this.confirmLog, // callback
        'Delete Post', // title
      );
    },

    confirmLog(button){
      if(button == 1){
        firebaseDb.collection("adopt-feed").doc(this.$route.params.adoptId).delete()
        .then(response => {
          this.$router.push({
              path: '/FeedAdopt'
          })
          .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(`Code: ${errorCode} -- ${errorMessage}`);
          })
        })
      }
    }
  },
  created() {
    this.getAdopt()
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

.adopt{
  padding-top: 1rem;

  .btn-back{
    align-self: flex-start;
    margin-left: 2rem;
  }

  h1{
    font-size: 2rem;
    font-weight: bolder;
    color: $primary;
    margin-top: 2rem;
  }
}
</style>