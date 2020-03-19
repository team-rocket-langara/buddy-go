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
            :src="postInfo[0][6]"
            :ratio="1"
            />

          </q-avatar>

        </q-btn>
        <!-- /Post Item Avatar -->

        <!-- Post Item Info -->
        <div class="post-list-info">
          <q-item
          clickable
          :to="postInfo[0][1]"
          >
            <q-item-section>
              <q-item-label overline>{{ postInfo[0][0] }}</q-item-label>
              <q-item-label caption>{{ postInfo[0][0] }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>{{ postInfo[0][2] }}</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Post Item Pic -->
      <q-img
      :src="postInfo[0][5]"
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
        <p class="counter">{{ postInfo[0][4] }}</p>
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

export default {
  name: 'SinglePost',
  created() {
    this.getPostInfo()
  },
  data(){
    return {
      postInfo: [],
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
            var newArr = []
            var postUser = newget.data().name
            var postUserId = '/UserProfile/' + response.data().postUser
            var postCap = response.data().postCaption
            var postDate = response.data().postDay
            var postLike = response.data().postLike
            var postPic = response.data().postPic
            var userAvatar = newget.data().avatar

            newArr.push(postUser, postUserId, postCap, postDate, postLike, postPic, userAvatar);

            this.postInfo.push(newArr)

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
            
            this.comments.push(newArr)
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
