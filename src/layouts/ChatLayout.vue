<template>
  <q-layout view="hHh lpR fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header bordered class="header">
      <q-toolbar>

        <q-btn class="back-btn" flat @click="$router.go(-1)">
          <img src="~assets/arrow-white.svg">
        </q-btn>
        
        <q-toolbar-title class="chat-layout-header">
          Messages
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" behavior="mobile" elevated>
      <SideMenuContent />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="chat-text-box">
      <q-toolbar>
        <q-input
        v-model="text"
        placeholder=""
        dense
        >
        </q-input>
        <q-btn>
          S
        </q-btn>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import SideMenuContent from 'components/SideMenuContent'

export default {
  name: 'ChatLayout',
  components: {
    SideMenuContent
  },
  data () {
    return {
      right: false
    }
  }
}
</script>
