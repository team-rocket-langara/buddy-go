<template>
  <q-layout view="hHh lpR fFf">

    <!-- Q Header -->
    <q-header bordered class="single-post-header" >

      <q-toolbar>

        <q-btn class="btn-back" flat @click="$router.go(-1)">
          <img src="../assets/layout/arrow-white-icon.svg">
        </q-btn>

        <q-toolbar-title>
          Messages
        </q-toolbar-title>

        <q-btn dense flat icon="menu" @click="right = !right" />
      </q-toolbar>
      
    </q-header>
    <!-- /Q Header -->

    <!-- Q Drawer -->
    <q-drawer v-model="right" side="right" behavior="mobile" elevated>
      <SideMenuContent />
    </q-drawer>
    <!-- /Q Drawer -->

    <!-- Q Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- /Q Page Container -->

  	<!-- Q Footer -->
    <q-footer bordered class="single-post-input">

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
        >
          <img src="../assets/layout/send-icon.svg">
        </q-btn>
      </q-toolbar>
      <!-- /Q Toolbar -->

    </q-footer>
    <!-- /Q Footer -->

  </q-layout>
</template>

<script>
import SideMenuContent from 'components/SideMenuContent'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import VueRouter from 'vue-router'

export default {
  name: 'ChatRoomLayout',
  components: {
    SideMenuContent
  },
  data () {
    return {
      right: false,
      message: ''
    }
  },
  methods: {
    sendMsg(){
      let currentUser = firebaseAuth.currentUser.uid
      let currentDate = new Date()
      let timestamp = currentDate.getTime()
      let dateToTransform = new Date(timestamp)
      // Hours part from the timestamp
      let hours = dateToTransform.getHours();
      // Minutes part from the timestamp
      let minutes = "0" + dateToTransform.getMinutes();
      firebaseDb.collection('chat-list').doc(currentUser).collection(this.$route.params.userId).doc(' '+timestamp).set({
        me: true,
        msg: this.message,
        time: hours + ':' + minutes.substr(-2),
        timestamp: timestamp
      })
      .then(response => {
        firebaseDb.collection('chat-list').doc(this.$route.params.userId).collection(currentUser).doc(' '+timestamp).set({
          me: false,
          msg: this.message,
          time: hours + ':' + minutes.substr(-2),
          timestamp: timestamp
        })
      })
      .then(response => {
        firebaseDb.collection('have-chat').doc(currentUser).collection('with').doc(this.$route.params.userId).set({
          chat: true
        })
      })
      .then(response => {
        firebaseDb.collection('have-chat').doc(this.$route.params.userId).collection('with').doc(currentUser).set({
          chat: true
        })
      })
      .then(response => {
        this.message = ''
      })
    }
  }
}
</script>