<template>
  <q-page class="chat-room" ref="container">

    <q-chat-message
    v-for="message in msgList" v-bind:key="message.id"
    :name="message.origin === true ? 'me' : userChat"
    :stamp="message.time"
    :text="[message.message]"
    :sent="message.origin"
    />

  </q-page>
</template>

<script>
import SideMenuContent from 'components/SideMenuContent'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'
import VueRouter from 'vue-router'

export default {
  name: 'ChatRoom',
  created(){
    this.getInfoUser()
    this.getMsg()
  },
  data(){
    return{
      msgList: [],
      userChat: ''
    }
  },
  methods: {
    getMsg(){
      let currentUser = firebaseAuth.currentUser.uid
      firebaseDb.collection('chat-list').doc(currentUser).collection(this.$route.params.userId).orderBy("timestamp").onSnapshot(snapshot => {
        let changes = snapshot.docChanges()
        changes.forEach(change => {
          
          let newArr = {}
          newArr.origin = change.doc.data().me
          newArr.message = change.doc.data().msg
          newArr.time = change.doc.data().time
          this.msgList.push(newArr)

        })
      })
    },
    getInfoUser(){
      firebaseDb.collection('users-info').doc(this.$route.params.userId).get()
      .then(doc => {
        this.userChat = doc.data().name
      })
    },

    scrollToEnd () {
      var content = this.$refs.container;
      content.scrollTop = content.scrollHeight;
    }
  },
  
  updated () {
  	// This will be called when the component updates
    // try toggling a todo
  	this.scrollToEnd(); 
  },
  
  mounted () {
  	// This will be called on load
  	this.scrollToEnd();	
  }
}
</script>
