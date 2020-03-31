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

      <q-input
      v-model="location"
      label="Share your location"
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
      picture: '',
      location: ''
    }
  },
  methods: {

    submitPost(){
      let currentUser = firebaseAuth.currentUser.uid;

      firebaseDb.collection("posts-feed").add({
        user: currentUser,
        caption: this.caption,
        like: '0',
        comment: '0',
        timestamp: firebase.firestore.Timestamp.now(),
        location: this.location,
        // !For dev
        // picture: 'https://images.pexels.com/photos/3608618/pexels-photo-3608618.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        
      })
      // ! FOR REAL WORLD BEGIN
      .then(response => {

        var storageRef = firebase.storage().ref()
        var postsImagesRef = storageRef.child(`posts/${response.id}`)
        var file = this.picture

        postsImagesRef.putString(file, 'data_url').then(snapshot => {
          
          postsImagesRef.getDownloadURL().then(url => {

            firebaseDb.collection('posts-feed').doc(response.id).update({
              picture: url
            })
            .then(response => {

              this.$router.push({ path: '/FeedFollowing' })
              .catch(err => {
                console.log(err)
              })
            })
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
