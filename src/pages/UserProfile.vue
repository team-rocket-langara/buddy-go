<template>
  <q-page class="user-profile">
    
    <!-- User Info -->
    <div class="user-profile-info">

      <!-- User Avatar -->
      <q-avatar
      size="72px"
      >

        <q-img
        :src="userAvatar"
        :ratio="1"
        />

      </q-avatar>
      <!-- /User Avatar -->

      <!-- User Name & Info -->
      <div class="user-profile-name">
        <q-item>
          <q-item-section>
            <q-item-label overline> {{ userInfo.name }} </q-item-label>
            <q-item-label caption>{{ followInfo.followers }} Followers &bull; {{ followInfo.following }} Following</q-item-label>

            <q-list>

              <q-item
              clickable
              @click="aboutMe"
              class="btn-text"
              >
                <q-item-label>
                  About Me
                </q-item-label>
              </q-item>

              <i v-if="thisUser == this.$route.params.idUser">&bull;</i>

              <q-item
              clickable
              to="/EditProfile"
              class="btn-text"
              v-if="thisUser == this.$route.params.idUser"
              >
                <q-item-label>
                  Edit Profile
                </q-item-label>
              </q-item>

            </q-list>

          </q-item-section>
        </q-item>
      </div>
      <!-- User Name & Info -->

    </div>
    <!-- /User Info -->

    <!-- Btn Follow Area -->
    <div class="global-separator">
      <q-btn
      class="btn-small btn-purple btn-round"
      v-if="thisUser !== this.$route.params.idUser"
      @click="pressFollow"
      >
      Follow
      </q-btn>
    </div>
    <!-- /Btn Follow Area -->

    <!-- Picture Tiles -->
    <div class="picture-tiles-wrapper">
      <q-btn
      class="btn-picture"
      to="/SinglePost"
      >
        <q-img
        src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        :ratio="1"
        />
      </q-btn>
    </div>
    <!-- /Picture Tiles -->

  </q-page>
</template>

<script>
import VueRouter from 'vue-router'
import { mapActions } from 'vuex'
import * as firebase from "firebase/app"
import 'firebase/storage'
import { firebaseAuth } from 'boot/firebase'

export default {
  name: 'UserProfile',
  watch: {
    $route(to, from) {
      this.getInfo(to.params.idUser)
    }
  },
  created(){
    this.getInfo()
    this.getAvatar()
  },
  data(){
    return{
      thisUser: firebaseAuth.currentUser.uid,
      userAvatar: ''
    }
  },
  methods:{
    ...mapActions('user', ['otherUser']),
    ...mapActions('follow', ['startFollow']),
    aboutMe(){
      this.$router.push({ path: '/AboutMe/' + this.$route.params.idUser })
    },
    getInfo(){
      this.otherUser(this.$route.params.idUser)
    },
    pressFollow(){
      this.startFollow(this.$route.params.idUser)
    },
    getAvatar(){

      // Create a root reference
      var storageRef = firebase.storage().ref()

      // Create a reference to 'images/mountains.jpg'
      var mountainImagesRef = storageRef.child(`avatars/${this.$route.params.idUser}`)      

      mountainImagesRef.getDownloadURL().then(url => {

        this.userAvatar = url

      })
    }
  },
  computed: {
    userInfo(){
      return this.$store.getters['user/getOtherUserInfo']
    },
    followInfo(){
      return this.$store.getters['follow/getOtherFollow']
    }
  }
}
</script>
