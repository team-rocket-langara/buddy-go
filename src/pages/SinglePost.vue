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
            :src="postInfo.avatar"
            :ratio="1"
            />

          </q-avatar>

        </q-btn>
        <!-- /Post Item Avatar -->

        <!-- Post Item Info -->
        <div class="post-list-info">
          <q-item
          clickable
          :to="postInfo.profileUrl"
          >
            <q-item-section>
              <q-item-label overline>{{ postInfo.user }}</q-item-label>
              <q-item-label caption>{{ postInfo.location }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>{{ postInfo.caption }}</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Post Item Pic -->
      <q-img
      :src="postInfo.picture"
      ratio="1"
      />
      <!-- /Post Item Pic -->

      <!-- Post Item Btns -->
      <div class="post-list-social">
        <q-btn
        class="btn-social"
        @click="genHtml('a')"
        >
          <img v-if="thisLike === true" src="../assets/layout/paw-icon-active.svg">
          <img v-if="thisLike === false" src="../assets/layout/paw-icon.svg">
        </q-btn>
        <p class="counter">{{ postInfo.like }}</p>
        <span>{{ postInfo.date }}</span>
      </div>
      <!-- /Post Item Btns -->

      <div class="remove-area"
      v-if="postInfo.userId == currentUser"
      @click="removePost"
      >
        <q-btn
        label="Delete Post"
        />
      </div>

      <!-- Post Item Comments -->
      <div class="post-list-comments-wrapper">
        <ul>
          <li v-for="comment in comments" v-bind:key="comment.id">
            <span class="name">
              <q-item
              clickable
              :to="comment[3]"
              >
                <q-item-label>
                  {{ comment[2] }}
                </q-item-label>
              </q-item>
              </span>{{ comment[0] }}
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
      comments: [],
      thisLike: false,
      currentUser: firebaseAuth.currentUser.uid
    }
  },
  methods: {
    getPostInfo(){
      let currentUser = firebaseAuth.currentUser.uid
      firebaseDb.collection("posts-feed").doc(this.$route.params.postId).get()
      .then((response) => {

        if(response.exists){

          firebaseDb.collection("users-info").doc(response.data().user).get()
          .then((newget) => {

            let nano = response.data().timestamp.nanoseconds.toString()
            let newNano = response.data().timestamp.seconds + nano.charAt(0) + nano.charAt(1) + nano.charAt(2)

            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            let date = new Date(Number(newNano))
            let day = date.getDate()
            let month = months[date.getMonth()]
            
            let formattedTime = `${day} ${month}`

            var newObj = {
              user: newget.data().name,
              profileUrl: '/UserProfile/' + response.data().user,
              caption: response.data().caption,
              like: response.data().like,
              location: response.data().location,
              avatar: newget.data().avatar,
              picture: response.data().picture,
              date: formattedTime,
              userId: newget.id
              // ! FOR DEV
              // picture: 'https://images.pexels.com/photos/3608618/pexels-photo-3608618.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
              // avatar: 'https://images.pexels.com/photos/3608618/pexels-photo-3608618.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
            }

            firebaseDb.collection('posts-feed').doc(this.$route.params.postId).collection('likes').doc(currentUser).get()
            .then(likeGet => {
              
              if(likeGet.exists === true){

                this.thisLike = true

              } else {

                this.thisLike = false

              }
              
              this.postInfo = Object.assign(newObj)

            })            
            
          })
        } else {
          console.log('Error')
        }
      })
    },
    getComments(){
      firebaseDb.collection('posts-comments').doc(this.$route.params.postId).collection('comments').orderBy('timestamp').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          if(change.type == 'added'){

            let nano = change.doc.data().timestamp.nanoseconds.toString()
            let newNano = change.doc.data().timestamp.seconds + nano.charAt(0) + nano.charAt(1) + nano.charAt(2)

            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            let date = new Date(Number(newNano))
            let day = date.getDate()
            let month = months[date.getMonth()]
            
            let formattedTime = `${day} ${month}`

            let newArr = []
            let comment = change.doc.data().comment
            let dateComment = formattedTime

            // console.log(change.doc.data())
            newArr.push(comment, dateComment)
            
            firebaseDb.collection('users-info').doc(change.doc.data().user).get()
            .then(response => {
              let userName = response.data().name
              let userProfile = '/UserProfile/' + response.id
              newArr.push(userName, userProfile)
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
    },
    
    removePost(){

      navigator.notification.confirm(
        'Do you really want to delete this post?', // message
        this.confirmLog, // callback
        'Delete Post', // title
      );
      
    },

    confirmLog(button){
      if(button == 1){
        firebaseDb.collection("posts-feed").doc(this.$route.params.postId).delete()
        .then(response => {
          this.$router.push({
              path: '/FeedFollowing'
          })
          .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(`Code: ${errorCode} -- ${errorMessage}`);
          })
        })
      }
    }
  },
  mounted(){    
    this.getComments()
  }
}
</script>

<style lang="scss">
@import '../css/palette';

.remove-area{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: .5rem .5rem;
  color: $error;
}
</style>