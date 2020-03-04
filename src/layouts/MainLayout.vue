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
      <q-item
        clickable
        to="/MyProfile"
        class="profile-btn-area"
      >
        <div class="absolute-top avatar-area">
          <q-avatar size="56px" class="q-mb-sm">
            <q-img src="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" :ratio="1" />
          </q-avatar>
          <div class="user-name">
            <p>Razvan Stoenescu</p>
            <p>View Profile</p>
          </div>
        </div>
      </q-item>
      <q-scroll-area class="fit">
        <q-list>

        </q-list>
      </q-scroll-area>
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
export default {
  name: 'MainLayout',
  data () {
    return {
      right: false
    }
  }
}
</script>