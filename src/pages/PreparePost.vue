<template>
  <q-page class="prepare-post">

    <div class="prepare-post-display">

      <q-img
      :src="picture"
      :ratio="1"
      placeholder-src="../assets/layout/placeholder_01.png"
      />

    </div>

    <div class="ser">

      <q-input
      v-model="caption"
      label="Write a caption"
      class="input-textfield"
      maxlength="100"
      />

      <q-btn
      class="btn-big btn-round btn-purple"
      type="submit"
      @click="submitPost"
      >
      Share
      </q-btn>

    </div>

  </q-page>
</template>

<script>
import VueRouter from 'vue-router'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'

export default {
  name: 'PreparePost',
  data() {
    return{
      caption: '',
      date: new Date().toDateString(),
      picture: '',
      location: 'Change Late in sendPost'
    }
  },
  methods: {

    submitPost(){
      let currentUser = firebaseAuth.currentUser.uid;

      firebaseDb.collection("posts-feed").add({
          postUser: currentUser,
          postCaption: this.caption,
          postDate: this.date,
          postLike: '0',
          postComment: '0',
          // !For dev
          // postPic: this.picture,
          postLocation: this.location,
          postTime: new Date().getTime()
      })
      // ! FOR REAL WORLD BEGIN
      .then(docRef => {

        var storageRef = firebase.storage().ref()
        var postsImagesRef = storageRef.child(`posts/${docRef.id}`)
        var file = this.picture

        postsImagesRef.putString(file, 'data_url').then(snapshot => {
          
          console.log('Uploaded a data_url string! ' + docRef.id)

          this.$router.push({ path: '/FeedFollowing' })
          .catch(err => {
            console.log(err)
          })

        })
      })
      // ! FOR REAL WORLD END
    },

    genPic(){
      var picGen = this.$route.params.picId + '/' + this.$route.params.picStore + '/' + this.$route.params.picEmu + '/' + this.$route.params.picN + '/' + this.$route.params.picPic + '/' + this.$route.params.picName

      var res = picGen.replace("X", ";")

      // console.log(res)

      cordova.plugins.photoLibrary.getPhoto(
        res, // or libraryItem.id
        (fullPhotoBlob) => {

        var reader = new FileReader()

        reader.onloadend = e => {
          this.picture = e.currentTarget.result
        }

        reader.readAsDataURL(fullPhotoBlob)
      },
      function (err) {
        console.log('Error occured')
      });
    }

    
  },
  created(){
    this.genPic()
  }
}
</script>
