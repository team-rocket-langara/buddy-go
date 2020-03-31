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
          
          if(change.type == "added"){

            let newArr = {}
            newArr.origin = change.doc.data().me
            newArr.message = change.doc.data().msg

            var nano = change.doc.data().timestamp.nanoseconds.toString()
            var newNano = change.doc.data().timestamp.seconds + nano.charAt(0) + nano.charAt(1) + nano.charAt(2)

            var date = new Date(Number(newNano))
            // Hours part from the timestamp
            var hours = date.getHours()
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes()
            
            var formattedTime = hours + ':' + minutes.substr(-2)

            newArr.time = formattedTime
            this.msgList.push(newArr)

          }
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
      window.scrollTo(0,document.querySelector("body").scrollHeight);
    }
  },
  
  updated () {
  	this.scrollToEnd(); 
  },  
  mounted () {
  	this.scrollToEnd();	
  }
}
</script>
