<template>
  <q-layout class="about-me">

    <q-btn class="btn-back" flat @click="$router.go(-1)">
      <img src="../assets/layout/arrow-icon.svg">
    </q-btn>

    <q-img
    :src="userInfo.avatar"
    :ratio="1" 
    />

    <h1>{{ userInfo.name }}</h1>
    <h2>000 followers &bull; 000 following</h2>
    
    <ul>
      <li><span>Breed:</span> {{ userInfo.breed }}</li>
      <li><span>Gender:</span> {{ userInfo.gender }}</li>
      <li><span>Birthday:</span> {{ userInfo.birthday }}</li>
      <li><span>Favourite Food:</span> {{ userInfo.food }}</li>
      <li><span>Favourite Toy:</span> {{ userInfo.toy }}</li>
      <li><span>Hometown:</span> {{ userInfo.hometown }}</li>
      <li><span>Bio:</span> {{ userInfo.bio }}</li>
    </ul>

  </q-layout>
</template>

<script>
import VueRouter from 'vue-router'
import { mapActions } from 'vuex'

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
  methods:{
    ...mapActions('user', ['otherUser']),
    aboutMe(){
      this.$router.push({ path: '/AboutMe/' + this.$route.params.idUser })
    },
    getInfo(){
      this.otherUser(this.$route.params.idUser)
    }
  },
  computed: {
    userInfo(){
      return this.$store.getters['user/getOtherUserInfo']
    }
  }
}
</script>
