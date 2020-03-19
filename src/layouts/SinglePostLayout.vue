<template>
  <q-layout view="hHh lpR fFf">

    <!-- Q Header -->
    <q-header bordered class="single-post-header" >

      <q-toolbar>

        <q-btn class="btn-back" flat @click="$router.go(-1)">
          <img src="../assets/layout/arrow-white-icon.svg">
        </q-btn>

        <q-toolbar-title>
          Comments
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

    </q-footer>
    <!-- /Q Footer -->

  </q-layout>
</template>

<script>
import SideMenuContent from 'components/SideMenuContent'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import VueRouter from 'vue-router'

export default {
  name: 'SinglePostLayout',
  components: {
    SideMenuContent
  },
  data () {
    return {
      right: false,
      text: ''
    }
  },
  methods:{
    sendComment(){

      // console.log(this.$route.params.postId)
      
      firebaseDb.collection("posts-comments").doc(this.$route.params.postId).collection('comments').add({
        user: firebaseAuth.currentUser.uid,
        comment: this.text,
        date: new Date().toDateString(),
        time: new Date()
      })

      this.text = ''
    }
  }
}
</script>