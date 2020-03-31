<template>
  <q-layout class="picture-profile">

    <div class="white-space">
      <q-btn class="btn-back" flat @click="$router.go(-1)">
        <img src="../assets/layout/arrow-icon.svg">
      </q-btn>
    </div>

    <div class="picture-profile-top">
        <q-img
        :src="imageSrc"
        ratio="1"
        placeholder-src="../assets/layout/placeholder_01.png"
        >
        </q-img>
    </div>

    <h2>Chose a photo</h2>

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
        quality: 70,
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

      let adoptId = this.$route.params.adoptId;

      var storageRef = firebase.storage().ref()
      var adoptImagesRef = storageRef.child(`adopt/${adoptId}`)
      var file = this.fileToUse

      adoptImagesRef.putString(file, 'data_url').then(snapshot => {

        adoptImagesRef.getDownloadURL().then(url => {

          firebaseDb.collection('adopt-feed').doc(adoptId).update({
            picture: url
          })
          .then(response => {
            
            this.$router.push({ path: '/FeedAdopt' })
            .catch(err => {
              console.log(err)
            })
          })
        })
      })
    }
  },
  mounted(){
    this.accessLib()
  }
}
</script>

<style lang="scss" scoped>
.picture-profile{
  background: white;

  &-top{
    .q-img{
      border-radius: 0 !important;
      width: 50%;
    }
  }
}

.white-space{
  background: white;

  .btn-back{
    margin-left: 1rem;
    margin-top: 1rem;
  }
}

.q-scrollarea{
  width: 100%;
  height: 30vh;
  background: white;
}
</style>
