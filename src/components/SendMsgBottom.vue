<template>
  <!-- Q Toolbar -->
  <q-toolbar>
    <q-input
    placeholder=""
    dense
    v-model="message"
    >
    </q-input>
    <q-btn
    class="btn-send"
    @click="sendMsg"
    :disable="!message"
    >
      <img src="../assets/layout/send-icon.svg">
    </q-btn>
  </q-toolbar>
  <!-- /Q Toolbar -->
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import VueRouter from 'vue-router'

export default {
  name: 'SendMsgBottom',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    sendMsg(){
      let currentUser = firebaseAuth.currentUser.uid
      let msg = this.message
      this.message = ''
      firebaseDb.collection('chat-list').doc(currentUser).collection(this.$route.params.userId).add({
        me: true,
        msg: msg,
        timestamp: firebase.firestore.Timestamp.now()
      })
      .then(response => {
        firebaseDb.collection('chat-list').doc(this.$route.params.userId).collection(currentUser).add({
          me: false,
          msg: msg,
          timestamp: firebase.firestore.Timestamp.now()
        })
      })
      .then(response => {
        firebaseDb.collection('have-chat').doc(currentUser).collection('with').doc(this.$route.params.userId).set({
          chat: true,
          msg: msg,
          timestamp: firebase.firestore.Timestamp.now()
        })
      })
      .then(response => {
        firebaseDb.collection('have-chat').doc(this.$route.params.userId).collection('with').doc(currentUser).set({
          chat: true,
          msg: msg,
          timestamp: firebase.firestore.Timestamp.now()
        })
      })
      .then(response => {
        firebaseDb.collection('push-alert').doc(this.$route.params.userId).collection('alert').add({
          userId: currentUser,
          from: this.$store.getters['user/getUserInfo'].name,
          msg: msg,
          type: 'chat',
          status: true,
          timestamp: firebase.firestore.Timestamp.now()
        })
      })
    }
  }
}
</script>