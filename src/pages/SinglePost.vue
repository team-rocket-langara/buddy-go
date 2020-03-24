<template>
  <q-page class="post-list">

    <!-- Post Item -->
    <div class="post-list-item">

      <!-- Post Header -->
      <header>

        <!-- Post Item Avatar -->
        <q-btn
        to="/UserProfile"
        :ripple="false"
        >

          <q-avatar
          size="48px"
          >

            <q-img
            :src="postInfo.userAvatar"
            :ratio="1"
            />

          </q-avatar>

        </q-btn>
        <!-- /Post Item Avatar -->

        <!-- Post Item Info -->
        <div class="post-list-info">
          <q-item
          clickable
          :to="postInfo.postUserUrl"
          >
            <q-item-section>
              <q-item-label overline>{{ postInfo.postUser }}</q-item-label>
              <q-item-label caption>{{ postInfo.postLocation }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>{{ postInfo.postCap }}</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Post Item Pic -->
      <q-img
      :src="postInfo.postPic"
      ratio="1"
      />
      <!-- /Post Item Pic -->

      <!-- Post Item Btns -->
      <div class="post-list-social">
        <q-btn
        class="btn-social"
        @click="genHtml('a')"
        >
          <img src="../assets/layout/paw-icon.svg">
        </q-btn>
        <p class="counter">{{ postInfo.postLike }}</p>
        <span>{{ postInfo.postDate }}</span>
      </div>
      <!-- /Post Item Btns -->

      <!-- Post Item Comments -->
      <div class="post-list-comments-wrapper">
        <ul>
          <li v-for="comment in comments" v-bind:key="comment.id">
            <span class="name">{{ comment[2] }}: </span>{{ comment[0] }}
            <br>
            <span class="date">{{ comment[1] }}</span>
          </li>
        </ul>
      </div>
      <!-- /Post Item Comments -->

    </div>
    <!-- /Post Item -->

  </q-page>
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import VueRouter from 'vue-router'
import * as firebase from "firebase/app"
import 'firebase/storage'

export default {
  name: 'SinglePost',
  created() {
    this.getPostInfo()
  },
  data(){
    return {
      postInfo: {},
      comments: []
    }
  },
  methods: {
    getPostInfo(){
      firebaseDb.collection("posts-feed").doc(this.$route.params.postId).get()
      .then((response) => {

        if(response.exists){

          firebaseDb.collection("users-info").doc(response.data().postUser).get()
          .then((newget) => {
            var newArr = {}
            newArr.postUser = newget.data().name
            newArr.postUserUrl = '/UserProfile/' + response.data().postUser
            newArr.postCap = response.data().postCaption
            newArr.postDate = response.data().postDate
            newArr.postLike = response.data().postLike
            newArr.postLocation = response.data().postLocation
            // ! FOR DEV
            // newArr.postPic = response.data().postPic
            // ! FOR DEV
            // newArr.userAvatar = newget.data().avatar

            // !FOR REAL WORLD BEGIN
            var storageRef = firebase.storage().ref()
            var avatarImagesRef = storageRef.child(`avatars/${response.data().postUser}`)      

            avatarImagesRef.getDownloadURL().then(url => {

              newArr.userAvatar = url

            })
            .then(resp => {
              var postsImagesRef = storageRef.child(`posts/${this.$route.params.postId}`)      

              postsImagesRef.getDownloadURL().then(url => {

                newArr.postPic = url

              })
              .then(resp => {
                this.postInfo = Object.assign(newArr)
              })
              .catch(err => {
                console.log(err)
              })
            })
            .catch(err => {
              console.log(err)
            })
            // !FOR REAL WORLD END

             // ! FOR DEV
            // this.postInfo = Object.assign(newArr)

            // console.log(this.postInfo)
          })
        } else {
          console.log('Error')
        }
      })
    },
    getComments(){
      firebaseDb.collection('posts-comments').doc(this.$route.params.postId).collection('comments').orderBy('time').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          if(change.type == 'added'){
            let newArr = []
            let comment = change.doc.data().comment
            let dateComment = change.doc.data().date

            // console.log(change.doc.data())
            newArr.push(comment, dateComment)
            
            firebaseDb.collection('users-info').doc(change.doc.data().user).get()
            .then(response => {
              let userName = response.data().name
              newArr.push(userName)
            })
            .then(response => {            
              this.comments.push(newArr)
            })
            // console.log(this.comments)
          } else if(change.type == 'removed'){
            this.comments = []
          }
        })
      })
    }
  },
  mounted(){    
    this.getComments()
  }
}
</script>
