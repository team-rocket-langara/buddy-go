<template>
  <q-layout view="hHh lpR fFf">

    <!-- Q Header -->
    <q-header bordered class="main-header" >

      <q-toolbar>

        <q-btn class="btn-back" flat @click="$router.go(-1)">
          <img src="../assets/layout/arrow-white-icon.svg">
        </q-btn>

        <q-toolbar-title>
          Post
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
    <q-footer bordered class="main-menu">

      <!-- Q Toolbar -->
      <q-toolbar>

        <!-- Btn Home -->
        <q-item
        clickable
        to="/FeedFollowing"
        class="btn-home"
        exact
        >
        </q-item>
        <!-- /Btn Home -->

        <!-- Btn Map -->
        <q-item
        clickable
        to="/Map"
        class="btn-map"
        exact
        >
        </q-item>
        <!-- /Btn Map -->

        <!-- Btn Camera -->
        <q-item
        clickable
        to="/Camera"
        class="btn-camera"
        exact
        >
        </q-item>
        <!-- /Btn Camera -->

        <!-- Btn Adopt -->
        <q-item
        clickable
        to="/FeedAdopt"
        class="btn-adopt"
        exact
        >
        </q-item>
        <!-- /Btn Adopt -->

        <!-- Btn Chat -->
        <q-item
        clickable
        to="/ChatList"
        class="btn-chat"
        exact
        >
        </q-item>
        <!-- /Btn Chat -->

      </q-toolbar>
      <!-- /Q Toolbar -->

    </q-footer>
    <!-- /Q Footer -->

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

<style lang="scss" scoped>
@import '../css/palette';

.q-layout{
  background: $accent;
}
</style>