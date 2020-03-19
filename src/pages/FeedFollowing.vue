<template>
  <q-page class="post-list page">

    <!-- Post Item -->
    <div v-for="postItem in getPostList" v-bind:key="postItem.id" class="post-list-item">

      <!-- Post Header -->
      <header>

        <!-- Post Item Avatar -->
        <q-btn
        :to="postItem[2]"
        :ripple="false"
        >

          <q-avatar
          size="48px"
          >

            <q-img
            :src="postItem[7]"
            :ratio="1"
            />

          </q-avatar>

        </q-btn>
        <!-- /Post Item Avatar -->

        <!-- Post Item Info -->
        <div class="post-list-info">
          <q-item
          clickable
          :to="postItem[2]"
          >
            <q-item-section>
              <q-item-label overline>{{ postItem[1] }}</q-item-label>
              <q-item-label caption>{{ postItem[1] }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>{{ postItem[3] }}</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Post Item Pic -->
      <q-img
      :src="postItem[6]"
      ratio="1"
      >
        <template v-slot:loading>
          <q-spinner-gears color="black" />
        </template>
      </q-img>
      <!-- /Post Item Pic -->

      <!-- Post Item Btns -->
      <div class="post-list-social">
        <q-btn
        class="btn-social"
        @click="checkLogin()"
        >
          <img src="../assets/layout/paw-icon.svg">
        </q-btn>
        <p class="counter">{{ postItem[5] }}</p>

        <q-btn
        class="btn-social"
        :to="postItem[0]"
        >
          <img src="../assets/layout/comments-icon.svg">
        </q-btn>
        <p class="counter">10</p>
      </div>
      <!-- /Post Item Btns -->

    </div>
    <!-- /Post Item -->

  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'

export default {
  name: 'FeedFollowing',
  created(){
    this.userInfoLogin(),
    this.genPostList()
  },
  data() {
    return {
      getPostList: []
    }
  },
  methods: {
    ...mapActions('login', ['checkUser']),
    ...mapActions('user', ['userInfo']),
    checkLogin(){
        this.checkUser()
    },
    userInfoLogin(){
      this.userInfo()
    },
    genPostList(){
      firebaseDb.collection("posts-feed").orderBy('postTime', "desc").get()
      .then((response) => {
        response.docs.forEach(doc => {
          firebaseDb.collection("users-info").doc(doc.data().postUser).get()
          .then((newget) => {
            var newArr = []
            var run = false
            var postUser = newget.data().name
            var postUserId = '/UserProfile/' + doc.data().postUser
            var postId = '/SinglePost/' + doc.id
            var postCap = doc.data().postCaption
            var postDate = doc.data().postDay
            var postLike = doc.data().postLike
            var postPic = doc.data().postPic
            var userAvatar = newget.data().avatar

            newArr.push(postId, postUser, postUserId, postCap, postDate, postLike, postPic, userAvatar);

            // var storageRef = firebase.storage().ref()
            // var avatarImgRef = storageRef.child(`avatars/${doc.data().postUser}`)
            // var postImgRef = storageRef.child(`posts/${doc.data().postPic}`)      

            // avatarImgRef.getDownloadURL()
            // .then(avatarUrl => {

            //   newArr.push(avatarUrl)
            //   run = true

            //   if(run){
            //     postImgRef.getDownloadURL()
            //     .then(postUrl => {

            //       newArr.push(postUrl)

            //     })
            //   }

            // })

            // console.log(newArr)

            this.getPostList.push(newArr)
          })
        })
      })
    }
  }
}
</script>