<template>
  <q-page class="flex flex-center">
    <q-btn color="primary" label="Get Picture" @click="captureImage" />
    <q-img
      :src="imageSrc"
      placeholder-src="statics/quasar-logo.png"
      :alt="'Imagem: ' + imageSrc" id="photo"
    />
  </q-page>
</template>

<script>
export default {
  name: 'Camera',
  data () {
    return {
      imageSrc: ''
    }
  },

  methods: {
    captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc = `data:image/jpeg;base64, ${data}`
          // document.getElementById('photo').src = data
        },
        () => { // on fail
          this.$q.notify('Não foi possível acessar a câmera do dispositivo.')
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
    }
  }
}
</script>
