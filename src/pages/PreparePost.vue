<template>
  <q-page class="prepare-post">

    <div class="prepare-post-display">

      <q-img
      :src="sendInfo.picture"
      :ratio="1"
      />

    </div>

    <div class="ser">

      <q-input
      v-model="sendInfo.caption"
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
import { mapActions } from 'vuex'
import * as firebase from "firebase/app"
import 'firebase/storage'
import { firebaseAuth } from 'boot/firebase'

export default {
  name: 'PreparePost',
  data() {
    return{
      sendInfo: {
        caption: '',
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        picture: '',
        location: 'Change Late in sendPost'
      },
      preview: ''
    }
  },
  methods: {
    ...mapActions('post', ['sendPost']),
    submitPost(){
      this.sendPost(this.sendInfo)
    },
    genPic(){
      var picGen = this.$route.params.picId + '/' + this.$route.params.picStore + '/' + this.$route.params.picEmu + '/' + this.$route.params.picN + '/' + this.$route.params.picPic + '/' + this.$route.params.picName

      var res = picGen.replace("X", ";")

      console.log(res)

      cordova.plugins.photoLibrary.getPhoto(
        res, // or libraryItem.id
        (fullPhotoBlob) => {

        var reader = new FileReader()

        reader.onloadend = e => {
          this.sendInfo.picture = e.currentTarget.result
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
