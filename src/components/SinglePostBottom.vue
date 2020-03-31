<template>
  <!-- Q Toolbar -->
  <q-toolbar>
    <q-input
    v-model="text"
    placeholder=""
    dense
    maxlength="150"
    >
    </q-input>
    
    <q-btn
    class="btn-send"
    @click="sendComment"
    :disable="!text"
    >
      <img src="../assets/layout/send-icon.svg">
    </q-btn>
  </q-toolbar>
  <!-- /Q Toolbar -->  
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import VueRouter from 'vue-router'
import * as firebase from "firebase/app"

export default {
  name: 'SinglePostBottom',
  data () {
    return {
      text: ''
    }
  },
  methods:{
    sendComment(){
      firebaseDb.collection("posts-comments").doc(this.$route.params.postId).collection('comments').add({
        user: firebaseAuth.currentUser.uid,
        comment: this.text,
        timestamp: firebase.firestore.Timestamp.now()
      })
      .then(res => {
        firebaseDb.collection("posts-feed").doc(this.$route.params.postId).update({
          comment: firebase.firestore.FieldValue.increment(1)
        })
      })
      .then(response => {
        if(firebaseAuth.currentUser.uid != this.$route.params.userComment){
          firebaseDb.collection('push-alert').doc(this.$route.params.userComment).collection('alert').add({
            userId: firebaseAuth.currentUser.uid,
            from: this.$store.getters['user/getUserInfo'].name,
            msg: 'Commented: ' + this.text,
            type: 'comment',
            status: true,
            timestamp: firebase.firestore.Timestamp.now()
          })
        }
      })
      .then(res => {
        this.text = ''
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>