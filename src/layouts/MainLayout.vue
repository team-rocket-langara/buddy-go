<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="header">
      <q-toolbar>
        <q-toolbar-title>
          <img src="../assets/logo-neg-hor.svg">
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" behavior="mobile" elevated>
      
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="main-menu">
      <q-toolbar>
        <q-item
        clickable
        to="/"
        exact>
        <q-item-label>
          <img class="home-btn" src="../assets/home.svg" alt="">
        </q-item-label>
        </q-item>
        <q-item
        clickable
        to="/page"
        exact>
        <q-item-label>
          <img class="map-btn" src="../assets/map.svg" alt="">
        </q-item-label>
        </q-item>
        <q-item
        clickable
        to="/page"
        exact>
        <q-item-label>
          <img class="map-btn" src="../assets/map.svg" alt="">
        </q-item-label>
        </q-item>
        <q-item
        clickable
        to="/page"
        exact>
        <q-item-label>
          <img class="map-btn" src="../assets/map.svg" alt="">
        </q-item-label>
        </q-item>
        <q-item
        clickable
        to="/page"
        exact>
        <q-item-label>
          <img class="map-btn" src="../assets/map.svg" alt="">
        </q-item-label>
        </q-item>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      right: false
    }
  }
}
</script>