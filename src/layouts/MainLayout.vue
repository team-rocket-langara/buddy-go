<template>
  <q-layout view="hHh lpR fFf">

    <!-- Q Header -->
    <q-header bordered :class="mainTop ? 'main-header' : 'single-post-header'" >

      <q-toolbar>

        <q-btn class="btn-back" flat @click="$router.go(-1)"  v-if="!mainTop">
          <img src="../assets/layout/arrow-white-icon.svg">
        </q-btn>

        <q-toolbar-title v-if="commentPage">
          Comments
        </q-toolbar-title>

        <q-toolbar-title v-if="messagesPage">
          Messages
        </q-toolbar-title>

        <q-toolbar-title v-if="postPage">
          Post
        </q-toolbar-title>

        <q-toolbar-title v-if="mainTop">
          <img src="../assets/layout/buddy-go-logo-top.svg">
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
      
      <transition name="router-anim" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">  
        <router-view />
      </transition>
    </q-page-container>
    <!-- /Q Page Container -->

  	<!-- Q Footer -->
    <q-footer bordered :class="mainBottom ? 'main-menu' : 'single-post-input'">

        <BottomMenuContent v-if="mainBottom" />
        <SinglePostBottom v-if="commentPage" />
        <SendMsgBottom v-if="messagesPage" />

    </q-footer>
    <!-- /Q Footer -->

  </q-layout>
</template>

<script>
import SideMenuContent from 'components/SideMenuContent'
import BottomMenuContent from 'components/BottomMenuContent'
import SinglePostBottom from 'components/SinglePostBottom'
import SendMsgBottom from 'components/SendMsgBottom'
import VueRouter from 'vue-router'
import * as firebase from "firebase/app"
import 'firebase/storage'
import { firebaseAuth, firebaseDb } from 'boot/firebase'

export default {
  name: 'MainLayout',
  watch: {
    $route(to, from) {
      this.getPage()
    },
    alert: 'getAlerts'
  },
  components: {
    SideMenuContent,
    BottomMenuContent,
    SinglePostBottom,
    SendMsgBottom,
  },
  data () {
    return {
      right: false,
      mainTop: true,
      mainBottom: true,
      postPage: false,
      commentPage: false,
      messagesPage: false,
      alert: ''
    }
  },
  methods: {
    getPage(){
      if(this.$route.params.userId){
        this.mainTop = false
        this.mainBottom = false
        this.postPage = false
        this.commentPage = false
        this.messagesPage = true
      } else if(this.$route.params.postId){
        this.mainTop = false
        this.mainBottom = false
        this.postPage = false
        this.commentPage = true
        this.messagesPage = false
      } else if(this.$route.params.picId){        
        this.mainTop = false
        this.mainBottom = true
        this.postPage = true
        this.commentPage = false
        this.messagesPage = false
      } else {
        this.mainTop = true
        this.mainBottom = true
        this.postPage = false
        this.commentPage = false
        this.messagesPage = false
      }
    },

    getAlerts(){
      firebaseDb.collection('push-alert').doc(firebaseAuth.currentUser.uid).collection('alert').orderBy('timestamp', 'desc').limit(1).onSnapshot(snapshot => {
        let changes = snapshot.docChanges()
        changes.forEach(change => {

          if(change.type == 'added'){

            this.alert = change.doc.data().from
            this.pushAlert(change.doc.data().from, change.doc.data().msg, change.doc.id, change.doc.data().userId, change.doc.data().type)
        
          }
        })
      })
    },

    pushAlert(from, msg, id, userId, type){
      firebaseDb.collection('push-alert').doc(firebaseAuth.currentUser.uid).collection('alert').doc(id).get()
      .then(doc => {
        if(doc.data().status === true){
          
          let route = this.$route.path
          if(type == 'chat'){

            if(route.includes('/ChatRoom/')){

              if(userId != this.$route.params.userId){

                cordova.plugins.notification.local.schedule({
                  title: from,
                  text: msg,
                  foreground: true,
                  vibrate: true
                });
              }
              
            } else {
              cordova.plugins.notification.local.schedule({
                title: from,
                text: msg,
                foreground: true,
                vibrate: true
              });
            }
          } else {
            cordova.plugins.notification.local.schedule({
              title: from,
              text: msg,
              foreground: true,
              vibrate: true
            });
          }
          
          firebaseDb.collection('push-alert').doc(firebaseAuth.currentUser.uid).collection('alert').doc(id).update({
            status: false
          })
        }      
      })
    }
  },
  created() {
    this.getAlerts()
  }
}
</script>