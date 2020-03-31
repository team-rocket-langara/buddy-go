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
        :to="postItem.profileUrl"
        :ripple="false"
        >

          <q-avatar
          size="48px"
          >

            <q-img
            :src="postItem.avatar"
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
          :to="postItem.profileUrl"
          >
            <q-item-section>
              <q-item-label overline>{{ postItem.userName }}</q-item-label>
              <q-item-label caption>{{ postItem.location }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>{{ postItem.caption }}</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Post Item Pic -->
      <q-img
      :src="postItem.picture"
      ratio="1"
      placeholder-src="../assets/layout/placeholder_01.png"
      />
      <!-- /Post Item Pic -->

      <!-- Post Item Btns -->
      <div class="post-list-social">
        <q-btn
        class="btn-social"
        @click="thisLike === false ? genLike(postItem.postId) : ''"
        >
          <img v-if="thisLike === true" src="../assets/layout/paw-icon-active.svg">
          <img v-if="thisLike === false" src="../assets/layout/paw-icon.svg">
        </q-btn>
        <p class="counter">{{ postItem.like }}</p>

        <q-btn
        class="btn-social"
        :to="postItem.postUrl"
        >
          <img src="../assets/layout/comments-icon.svg">
        </q-btn>
        <p class="counter">{{ postItem.comment }}</p>
        <span>{{ postItem.date }}</span>
      </div>
      <!-- /Post Item Btns -->

    </div>
    <!-- /Post Item -->

    <div class="no-follow" v-if="showPosts === false">

      <img src="../assets/layout/not-following.svg" alt="">

      <h1>Hello buddy!</h1>

      <p>It seems that you don't follow anyone yet... <br>

      <q-item
      clickable
      to="/Explore"
      class="btn-purple"
      >
        <q-item-label>
          Let's find some buddies
        </q-item-label>
      </q-item>

      </p>

    </div>

  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'

export default {
  name: 'FeedFollowing',
  data() {
    return {
      getPostList: [],
      showPosts: true,
      thisLike: false
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
          firebaseDb.collection('posts-feed').where('user', 'in', whoFollow).orderBy("timestamp", "asc").get()
          .then(docs => {
            if(docs.empty === false){
              docs.forEach(doc => {
                firebaseDb.collection("users-info").doc(doc.data().user).get()
                .then(response => {
                  
                  let nano = doc.data().timestamp.nanoseconds.toString()
                  let newNano = doc.data().timestamp.seconds + nano.charAt(0) + nano.charAt(1) + nano.charAt(2)

                  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

                  let date = new Date(Number(newNano))
                  let month = months[date.getMonth()]
                  let day = date.getDate()
                  let formattedTime = `${day} ${month}`

                  const newObj = {
                    userName: response.data().name,
                    profileUrl: '/UserProfile/' + doc.data().user,
                    postUrl: '/SinglePost/' + doc.id + '/' + doc.data().user,
                    caption: doc.data().caption,
                    like: doc.data().like,
                    location: doc.data().location,
                    comment: doc.data().comment,
                    date: formattedTime,
                    postId: doc.id,
                    // ! FOR REAL WORLD
                    picture: doc.data().picture,
                    avatar: response.data().avatar
                    // !FOR DEV
                    // avatar: 'https://images.pexels.com/photos/3608618/pexels-photo-3608618.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                    // picture: 'https://images.pexels.com/photos/3608618/pexels-photo-3608618.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                  }

                  firebaseDb.collection('posts-feed').doc(doc.id).collection('likes').doc(currentUser).get()
                  .then(likeGet => {
                    
                    if(likeGet.exists === true){

                      this.thisLike = true

                    } else {

                      this.thisLike = false

                    }
                    
                    this.getPostList.unshift(newObj)

                  })
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
        like: firebase.firestore.FieldValue.increment(1)
      })
      .then(response => {
        firebaseDb.collection('posts-feed').doc(postId).collection('likes').doc(currentUser).set({
          like: true
        })
        this.thisLike = true
      })
      .catch(err => {
        console.log(err)
      })
      // console.log(postId)
    }
  },
  created(){
    this.userInfoLogin(),
    this.genPostList()
  }
}
</script>