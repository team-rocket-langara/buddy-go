<template>
  <q-page>

    <!-- Picture Tiles -->
    <div class="picture-tiles-wrapper">
      <q-btn
      class="btn-picture"
      v-for="imgItem in imgThumb" v-bind:key="imgItem.id"
      @click="goTo(imgItem.thumbnailURL)"
      >
      <!-- :src="imgItem.thumbnailURL" -->
        <q-img
        src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        :ratio="1"
        />
      </q-btn>
    </div>
    <!-- /Picture Tiles -->

    <!-- Camera Btn -->
    <div class="camera-btn-area">
      <q-btn
      class="btn-picture btn-yellow"
      @click="captureImage"
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
    // imgThumb: "accessLib"
  },
  data () {
    return {
      imageSrc: 'a',
      imgThumb: {
        thumbnailURL: 'https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
      }
    }
  },
  methods: {
    accessLib() {
      cordova.plugins.photoLibrary.getLibrary(
        result => {
          this.imgThumb = result.library;
          console.log(this.imgThumb)
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
    captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc = `data:image/jpeg;base64, ${data}`
        },
        () => { // on fail
          this.$q.notify('Access Denied')
        },
        {
          // camera options
          quality: 50,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          MEDIATYPE: navigator.camera.MediaType.PICTURE,
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          mediaType: navigator.camera.MediaType.PICTURE,
          cameraDirection: navigator.camera.Direction.BACK,
          saveToPhotoAlbum: true
        }
      )
    },
    goTo(page){
      this.$router.push({path: '/PreparePost/' + page})
    }
  },
  mounted(){
    // this.accessLib()
  }
}
</script>

<style lang="scss">
.picture-tiles-wrapper{
  grid-template-columns: repeat(4, 1fr);
  gap: .1rem;
  margin-bottom: 85px;
}

.camera-btn-area{
  position: fixed;
  width: 100%;
  bottom: 0;
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