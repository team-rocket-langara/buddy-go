<template>
  <q-layout>

    <!-- My Profile Btn -->
    <q-item
    class="absolute-top btn-my-profile"
    clickable
    @click="myProfile"
    >
      <!-- Drawer Avatar -->
      <q-avatar
      size="56px"
      class="q-mb-sm"
      >

        <q-img
        :src="myPic"
        :ratio="1"
        />

      </q-avatar>
      <!-- /Drawer Avatar -->

      <!-- My Profile Btn Label -->
      <div class="btn-my-profile-label">
        <p>{{ userInfo.name }}</p>
        <p>View Profile</p>
      </div>
      <!-- /My Profile Btn Label -->

    </q-item>
    <!-- /My Profile Btn -->

    <!-- Drawer List Menu -->
    <q-list>

      <q-item
      clickable
      to="/UpdatePicture">
        <q-item-label>
          Account
        </q-item-label>
      </q-item>

      <q-item
      clickable
      @click="logginOut()"
      >
        <q-item-label>
          Logout
        </q-item-label>
      </q-item>

    </q-list>
    <!-- /Drawer List Menu -->

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import * as firebase from "firebase/app"
import 'firebase/storage'
import { firebaseAuth, firebaseDb } from 'boot/firebase'

export default {
  name: 'SideMenuContent',
  watch:{
    myPic: "myAvatar"
  },
  created(){
    this.myAvatar()
  },
  data(){
    return{
      id: firebaseAuth.currentUser.uid,
      myPic: ''
    }
  },
  methods: {
    ...mapActions('login', ['logOut']),
    logginOut() {
      this.logOut()
    },
    myProfile(){
      this.$router.push({ path: '/UserProfile/' + this.id })
    },
    myAvatar(){

      firebaseDb.collection("users-info").doc(this.id).get()
      .then((newget) => {
        this.myPic = newget.data().avatar
      })

      // // Create a root reference
      // var storageRef = firebase.storage().ref()

      // // Create a reference to 'images/mountains.jpg'
      // var mountainImagesRef = storageRef.child(`avatars/${this.id}`)      

      // mountainImagesRef.getDownloadURL().then(url => {

      //   this.myPic = url

      // })
    }
  },
  computed: {
    userInfo(){
      return this.$store.getters['user/getUserInfo']
    }
  }
}
</script>
