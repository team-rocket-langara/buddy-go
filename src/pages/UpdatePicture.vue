<template>
  <q-layout class="picture-profile">

    <div class="picture-profile-top">
      <div class="border">
        <q-img
        :src="imageSrc"
        ratio="1"
        placeholder-src="https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"
        >
        </q-img>
      </div>
    </div>

    <h2>Chose a profile photo</h2>

    <q-scroll-area>
      <q-btn
      class="btn-picture"
      v-for="imgItem in imgThumb" v-bind:key="imgItem.id"
      @click="changeTop(imgItem.photoURL, imgItem.id)"
      >

        <q-img
        :src="imgItem.thumbnailURL"
        :ratio="1"
        />

      </q-btn>
    </q-scroll-area>

    <div class="picture-profile-bottom">

      <q-btn
      class="btn-round btn-purple"
      @click="openCamera"
      >
        <q-icon
        name="camera_enhance"
        />
      </q-btn>

      <q-btn
      class="btn-round btn-purple"
      @click="picUpload"
      :disable="!imageSrc"
      >
        <q-icon
        name="arrow_forward"
        />
      </q-btn>

    </div>

  </q-layout>
</template>

<script>
import * as firebase from "firebase/app"
import 'firebase/storage'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import VueRouter from 'vue-router'

export default {
  name: 'UpdatePicture',
  watch: {
    imgThumb: "accessLib"
  },
  data () {
    return {
      imageSrc: '',
      imgThumb: '',
      fileToUse: ''
    }
  },
  methods: {
    accessLib() {
      cordova.plugins.photoLibrary.getLibrary(
        result => {
          this.imgThumb = result.library;
        },
        function (err) {
          if (err.startsWith('Permission')) {
            cordova.plugins.photoLibrary.requestAuthorization(
              function () {
                // User gave us permission to his library, retry reading it!
              },
              function (err) {
                // User denied the access
              }, // if options not provided, defaults to {read: true}.
              {
                read: true,
                write: true
              }
            );
            console.log(err)
          }
        }
      );
    },

    changeTop(photoUrl, idPhoto){
      this.imageSrc = photoUrl

      cordova.plugins.photoLibrary.getPhoto(
        idPhoto, // or libraryItem.id
        (fullPhotoBlob) => {

          var reader = new FileReader()

          reader.onloadend = e => {
            this.fileToUse = e.currentTarget.result
          }
          
          reader.readAsDataURL(fullPhotoBlob)
        },
        function (err) {
            console.log('Error occured')
      });
    },

    openCamera(){

      var camOpt = {
        quality: 100,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        encodingType: navigator.camera.EncodingType.JPEG,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        mediaType: navigator.camera.MediaType.PICTURE,
        cameraDirection: navigator.camera.Direction.BACK,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }

       navigator.camera.getPicture(this.camSuccess, this.camFail, camOpt)
    },

    camSuccess(imageUrl){

      resolveLocalFileSystemURL(imageUrl, (entry) => {

        this.imageSrc = entry.toInternalURL()

        entry.file(file => {

          var reader = new FileReader()

          reader.onloadend = (e) => {
            this.fileToUse = e.target._result
            // console.log(this.fileToUse)
          }

          // The most important point, use the readAsDatURL Method from the file plugin
          reader.readAsDataURL(file)
        })
      })
    },

    camFail(err){
      console.log(err)
    },

    picUpload(){

      let currentUser = firebaseAuth.currentUser.uid;

      if (currentUser) {
        // Update document in collection "users-info"
        firebaseDb.collection("users-info").doc(currentUser).update({
          avatar: this.fileToUse
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        })
      }

      // var myId = firebaseAuth.currentUser.uid

      // // Create a root reference
      // var storageRef = firebase.storage().ref()

      // // Create a reference to 'images/mountains.jpg'
      // var mountainImagesRef = storageRef.child(`avatars/${myId}`)

      // // Data URL string
      // var message = this.fileToUse

      // mountainImagesRef.putString(message, 'data_url').then(snapshot => {
        
      //   console.log('Uploaded a data_url string! ' + myId)
      //   this.$router.push({ path: '/FeedFollowing' })
      //   .catch(err => {
      //     console.log(err)
      //   })

      // })
    }

  },
  mounted(){
    this.accessLib()
  }
}
</script>
