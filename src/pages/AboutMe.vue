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
    <h2>000 followers &bull; 000 following</h2>
    
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
                  // !FOR DEV
                  // avatar: doc.data().avatar
              }

              // !FOR REAL WORLD BEGIN
              var storageRef = firebase.storage().ref()
              var avatarImagesRef = storageRef.child(`avatars/${this.$route.params.idUser}`)      

              avatarImagesRef.getDownloadURL().then(url => {

                userInfos.avatar = url
                
                this.usersInfo = Object.assign(userInfos)
              })
              .catch(err => {
                console.log(err)
              })
              // !FOR REAL WORLD END

              // !FOR DEV
              // this.usersInfo = Object.assign(userInfos)

              console.log(this.usersInfo)

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
