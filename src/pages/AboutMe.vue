<template>
  <q-layout class="about-me">

    <q-btn class="btn-back" flat @click="$router.go(-1)">
      <img src="../assets/layout/arrow-icon.svg">
    </q-btn>

    <q-img
    :src="usersInfo.avatar"
    :ratio="1" 
    placeholder-src="../assets/layout/placeholder_01.png"
    />

    <h1>{{ usersInfo.name }}</h1>
    <h2>{{ usersInfo.followers }} followers &bull; {{ usersInfo.following }} following</h2>
    
    <ul>
      <li><span>Breed:</span> {{ usersInfo.breed }}</li>
      <li><span>Gender:</span> {{ usersInfo.gender }}</li>
      <li><span>Birthday:</span> {{ usersInfo.birthday }}</li>
      <li><span>Favourite Food:</span> {{ usersInfo.food }}</li>
      <li><span>Favourite Toy:</span> {{ usersInfo.toy }}</li>
      <li><span>Hometown:</span> {{ usersInfo.hometown }}</li>
      <li><span>Bio:</span> {{ usersInfo.bio }}</li>
    </ul>

  </q-layout>
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import VueRouter from 'vue-router'
import * as firebase from "firebase/app"
import 'firebase/storage'

export default {
  name: 'AboutMe',
  watch: {
    $route(to, from) {
      this.getInfo(to.params.idUser)
    }
  },
  created(){
    this.getInfo()
  },
  data(){
    return {
      usersInfo: {}
    }
  },
  methods:{
    getInfo(){

      firebaseDb.collection("users-info").doc(this.$route.params.idUser).get()
      .then(doc => {

          if (doc.exists) {                

              const userInfos = {
                  name: doc.data().name,
                  breed: doc.data().breed,
                  gender: doc.data().gender,
                  birthday: doc.data().birthday,
                  food: doc.data().food,
                  toy: doc.data().toy,
                  hometown: doc.data().hometown,
                  bio: doc.data().bio,
                  followers: doc.data().followers,
                  following: doc.data().following,
                  // !FOR REAL WORLD
                  avatar: doc.data().avatar,
                  // !FOR DEV
                  // avatar: 'https://images.pexels.com/photos/3608618/pexels-photo-3608618.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
              }

              this.usersInfo = Object.assign(userInfos)

          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      })
      .catch(function(error) {
          console.log("Error getting document:", error);
      })
    }
  }
}
</script>
