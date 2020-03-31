<template>
  <q-page>

    <!-- Picture Tiles -->
    <div class="picture-tiles-wrapper">
      <q-btn
      class="btn-picture"
      v-for="imgItem in imgThumb" v-bind:key="imgItem.id"
      @click="goTo(imgItem.id)"
      >
        <!-- :src="imgItem.thumbnailURL" -->
        <q-img
        :src="imgItem.thumbnailURL"
        :ratio="1"
        placeholder-src="../assets/layout/placeholder_01.png"
        />
      </q-btn>
    </div>
    <!-- /Picture Tiles -->

    <!-- Camera Btn -->
    <div class="camera-btn-area">
      <q-btn
      class="btn-picture btn-yellow"
      @click="openCamera"
      >
      <q-icon name="camera_enhance" />
      </q-btn>
    </div>
    <!-- /Camera Btn -->
    
  </q-page>
</template>

<script>
export default {
  name: 'Camera',
  watch: {
    imgThumb: "accessLib"
  },
  data () {
    return {
      imageSrc: '',
      imgThumb: ''
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

    goTo(photoId){
      var str = photoId
      var res = str.replace(";", "X")
      this.$router.push({path: '/PreparePost/' + res})
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted(){
    this.accessLib()
  }
}
</script>

<style lang="scss">
.picture-tiles-wrapper{
  margin-bottom: 85px;
}

.camera-btn-area{
  position: fixed;
  width: 100%;
  bottom: .5rem;
  height: 150px;
  display: flex;
  justify-content: center;

  .btn-picture{
    height: 70px;
    width: 70px;
    border-radius: 100%;
    font-size: 1.3rem;
  }
}
</style>