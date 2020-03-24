<template>
  <q-page class="post-list page">

    <!-- Post Item -->
    <div
    v-if="showPosts === true"
    v-for="postItem in getPostList"
    v-bind:key="postItem.id"
    class="post-list-item"
    >

      <!-- Post Header -->
      <header>

        <!-- Post Item Avatar -->
        <q-btn
        :to="postItem.postUserUrl"
        :ripple="false"
        >

          <q-avatar
          size="48px"
          >

            <q-img
            :src="postItem.userAvatar"
            :ratio="1"
            placeholder-src="../assets/layout/placeholder_01.png"
            />

          </q-avatar>

        </q-btn>
        <!-- /Post Item Avatar -->

        <!-- Post Item Info -->
        <div class="post-list-info">
          <q-item
          clickable
          :to="postItem.postUserUrl"
          >
            <q-item-section>
              <q-item-label overline>{{ postItem.postUser }}</q-item-label>
              <q-item-label caption>{{ postItem.postLocation }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>{{ postItem.postCap }}</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Post Item Pic -->
      <q-img
      :src="postItem.postPic"
      ratio="1"
      placeholder-src="../assets/layout/placeholder_01.png"
      />
      <!-- /Post Item Pic -->

      <!-- Post Item Btns -->
      <div class="post-list-social">
        <q-btn
        class="btn-social"
        @click="genLike(postItem.postId)"
        >
          <img src="../assets/layout/paw-icon.svg">
        </q-btn>
        <p class="counter">{{ postItem.postLike }}</p>

        <q-btn
        class="btn-social"
        :to="postItem.postUrl"
        >
          <img src="../assets/layout/comments-icon.svg">
        </q-btn>
        <p class="counter">{{ postItem.postComment }}</p>
        <span>{{ postItem.postDate }}</span>
      </div>
      <!-- /Post Item Btns -->

    </div>
    <!-- /Post Item -->

    <h1
    v-if="showPosts === false"
    >Message Here</h1>

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
      getPostList: [],
      showPosts: true
    }
  },
  methods: {
    ...mapActions('user', ['userInfo']),
    userInfoLogin(){
      this.userInfo()
    },
    genPostList(){
      let currentUser = firebaseAuth.currentUser.uid
      let whoFollow = []

      firebaseDb.collection('follow-list').doc(currentUser).collection('i-follow').get()
      .then(docs => {
        let i = 0
        docs.forEach(doc => {
          whoFollow[i] = doc.id
          i++
        })
      })
      .then(response => {
          firebaseDb.collection('posts-feed').where('postUser', 'in', whoFollow).orderBy("postTime", "desc").get()
          .then(docs => {
            if(docs.empty === false){
              docs.forEach(doc => {
                firebaseDb.collection("users-info").doc(doc.data().postUser).get()
                .then(response => {
                  const newArr = {}

                  newArr.postUser = response.data().name
                  newArr.postUserUrl = '/UserProfile/' + doc.data().postUser
                  newArr.postUrl = '/SinglePost/' + doc.id
                  newArr.postCap = doc.data().postCaption
                  newArr.postDate = doc.data().postDate
                  newArr.postLike = doc.data().postLike
                  // !For Dev
                  // newArr.postPic = change.doc.data().postPic
                  newArr.postLocation = doc.data().postLocation
                  newArr.postComment = doc.data().postComment
                  // !For Dev
                  // newArr.userAvatar = response.data().avatar
                  newArr.postId = doc.id
                  
                  // !FOR REAL WORLD BEGIN
                  var storageRef = firebase.storage().ref()
                  var avatarImagesRef = storageRef.child(`avatars/${doc.data().postUser}`)      

                  avatarImagesRef.getDownloadURL().then(url => {

                    newArr.userAvatar = url

                  })
                  .then(resp => {
                    var postsImagesRef = storageRef.child(`posts/${doc.id}`)      

                    postsImagesRef.getDownloadURL().then(url => {

                      newArr.postPic = url

                    })
                    .then(resp => {
                      this.getPostList.unshift(newArr)
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
                  // this.getPostList.unshift(newArr)

                  // console.log(this.getPostList)
                })
              })
            } else {
              this.showPosts = false
            }
          })
      })
      .catch(err => {
        console.log(err)
      })
    },
    genLike(postId){
      let currentUser = firebaseAuth.currentUser.uid
      firebaseDb.collection('posts-feed').doc(postId).update({
        postLike: firebase.firestore.FieldValue.increment(1)
      })
      .then(response => {
        firebaseDb.collection('posts-feed').doc(postId).collection('likes').doc(currentUser).set({
          like: true
        })
      })
      .catch(err => {
        console.log(err)
      })
      // console.log(postId)
    }
  }
}
</script>