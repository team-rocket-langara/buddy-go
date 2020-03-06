<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="header">
      <q-toolbar>
        <q-toolbar-title>
          <img src="../assets/logo-top.svg">
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

    <q-footer bordered class="main-menu">
      <q-toolbar>
        <q-item
        clickable
        to="/FeedFollowing"
        exact>
        <q-item-label class="btn-home">
        </q-item-label>
        </q-item>
        <q-item
        clickable
        to="/Maps"
        exact>
        <q-item-label class="btn-map">
        </q-item-label>
        </q-item>
        <q-item
        clickable
        to="/Camera"
        exact>
        <q-item-label class="btn-camera">
        </q-item-label>
        </q-item>
        <q-item
        clickable
        to="/BuddyAdopt"
        exact>
        <q-item-label class="btn-paw">
        </q-item-label>
        </q-item>
        <q-item
        clickable
        to="/ChatList"
        exact>
        <q-item-label class="btn-msg">
        </q-item-label>
        </q-item>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import SideMenuContent from 'components/SideMenuContent'

export default {
  name: 'MainLayout',
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