<template>
  <q-page class="adopt-profile">

    <!-- Post Item -->
    <div v-for="postItem in thisPost" v-bind:key="postItem.id" class="post-list-item">

      <!-- Post Item Info -->
      <div class="post-list-info">
        <h2>{{ postItem.name }}</h2>
      </div>
      <!-- /Post Item Info -->

      <!-- Post Item Pic -->
      <q-img
      :src="postItem.picture"
      ratio="1"
      />

      <div class="remove-area"
      v-if="postItem.userId == currentUser"
      >
        <q-btn
        label="Edit"
        :to="'/EditAdopt/' + postItem.id"
        />
      </div>
      <!-- Post Item Title -->
      <div class="post-list-title">
        <p>{{ postItem.desc }}</p>

        <ul>
          <li><span>Breed:</span> {{ postItem.breed }}</li>
          <li><span>Gender:</span> {{ postItem.gender }}</li>
          <li><span>Vaccines:</span> {{ postItem.vaccine }}</li>
        </ul>
      </div>
      <!-- /Post Item Title -->

      <!-- Btn Area -->
      <div class="global-separator">
        <q-btn
        class="btn-small btn-purple btn-round"
        :to="'/ChatRoom/' + postItem.userId"
        >
        Contact
        </q-btn>
      </div>
      <!-- /Btn Area -->

    </div>
    <!-- /Post Item -->

  </q-page>
</template>

<script>
import VueRouter from 'vue-router'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"

export default {
  name: 'AdoptProfile',
  data () {
    return {
      thisPost: [],
      currentUser: firebaseAuth.currentUser.uid
    }
  },
  created(){
    this.getAdopt()
  },
  methods: {
    getAdopt(){
      let currentAdopt = this.$route.params.adoptId
      firebaseDb.collection('adopt-feed').doc(currentAdopt).get()
      .then(response => {
        let newObj = {
          name: response.data().name,
          desc: response.data().desc,
          breed: response.data().breed,
          gender: response.data().gender,
          picture: response.data().picture,
          vaccine: response.data().vaccine,
          userId: response.data().userId,
          id: response.id
        }
        this.thisPost.push(newObj)
      })
    },

    removePost(){
      firebaseDb.collection("adopt-feed").doc(this.$route.params.adoptId).delete()
      .then(response => {
        this.$router.push({
            path: '/FeedAdopt'
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(`Code: ${errorCode} -- ${errorMessage}`);
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/palette';

.remove-area{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: .5rem .5rem;
  color: $error;
}
</style>