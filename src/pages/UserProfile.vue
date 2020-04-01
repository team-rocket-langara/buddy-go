<template>
  <q-page class="user-profile">
    
    <!-- User Info -->
    <div class="user-profile-info">

      <!-- User Avatar -->
      <q-avatar
      size="72px"
      >

        <q-img
        :src="usersInfo.avatar"
        :ratio="1"
        placeholder-src="../assets/layout/placeholder_01.png"
        />

      </q-avatar>
      <!-- /User Avatar -->

      <!-- User Name & Info -->
      <div class="user-profile-name">
        <q-item>
          <q-item-section>
            <q-item-label overline> {{ usersInfo.name }} </q-item-label>
            <q-item-label caption>{{ usersInfo.followers }} Followers &bull; {{ usersInfo.following }} Following</q-item-label>

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
      v-if="thisUser !== this.$route.params.idUser && ifollow === false"
      @click="startFollow"
      >
      Follow
      </q-btn>

      <q-btn
      class="btn-small btn-purple btn-round"
      v-if="thisUser !== this.$route.params.idUser && ifollow === true"
      @click="stopFollow"
      >
      Unfollow
      </q-btn>
    </div>
    <!-- /Btn Follow Area -->

    <!-- Picture Tiles -->
    <div class="picture-tiles-wrapper">
      <q-btn
      class="btn-picture"
      :to="postItem[0]"
      v-for="postItem in allPosts" v-bind:key="postItem.id"
      >
        <q-img
        :src="postItem[1]"
        :ratio="1"
        placeholder-src="../assets/layout/placeholder_01.png"
        />
      </q-btn>
    </div>
    <!-- /Picture Tiles -->

  </q-page>
</template>

<script>
import VueRouter from 'vue-router'
import { mapActions } from 'vuex'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'

export default {
  name: 'UserProfile',
  watch: {
    $route(to, from) {
      this.getInfo(to.params.idUser)
    }
  },
  created(){
    this.getAllPosts()
    this.checkFollow()
  },
  mounted(){    
    this.getInfo()
  },
  data(){
    return{
      thisUser: firebaseAuth.currentUser.uid,
      userAvatar: '',
      allPosts: [],
      usersInfo: {},
      ifollow: false
    }
  },
  methods:{
    aboutMe(){
      this.$router.push({ path: '/AboutMe/' + this.$route.params.idUser })
    },

    checkFollow(){
      let currentUser = firebaseAuth.currentUser.uid
      firebaseDb.collection('follow-list').doc(currentUser).collection('i-follow').doc(this.$route.params.idUser).get()
      .then(response => {
        
        if(response.exists === true){
          this.ifollow = true
        }
      })
    },

    getInfo(){

      firebaseDb.collection("users-info").doc(this.$route.params.idUser).get()
      .then(doc => {

          if (doc.exists) {                

              const userInfos = {
                  name: doc.data().name,
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
    },
    
    getAllPosts(){
      firebaseDb.collection("posts-feed")
      .where("user", "==", this.$route.params.idUser)
      .orderBy("timestamp", "desc")
      .get()
      .then((response) => {
        response.docs.forEach(doc => {
          var newArr = [
            '/SinglePost/' + doc.id + '/' + this.$route.params.idUser,
            doc.data().picture  
          ]

          this.allPosts.push(newArr)
        })
      })
    },

    startFollow(){
      let currentUser = firebaseAuth.currentUser.uid
      firebaseDb.collection('follow-list').doc(currentUser).collection('i-follow').doc(this.$route.params.idUser).set({
        follow: true
      })
      .then(response => {
        firebaseDb.collection('users-info').doc(this.$route.params.idUser).update({
          followers: firebase.firestore.FieldValue.increment(1)
        })
      })
      .then(
        firebaseDb.collection('users-info').doc(currentUser).update({
          following: firebase.firestore.FieldValue.increment(1)
        })
      )
      .then(        
        this.ifollow = true
      )
    },

    stopFollow(){
      let currentUser = firebaseAuth.currentUser.uid
      firebaseDb.collection('follow-list').doc(currentUser).collection('i-follow').doc(this.$route.params.idUser).delete()
      .then(response => {
        firebaseDb.collection('users-info').doc(this.$route.params.idUser).update({
          followers: firebase.firestore.FieldValue.increment(-1)
        })
      })
      .then(
        firebaseDb.collection('users-info').doc(currentUser).update({
          following: firebase.firestore.FieldValue.increment(-1)
        })
      )
      .then(        
        this.ifollow = false
      )
    }
  }
}
</script>
