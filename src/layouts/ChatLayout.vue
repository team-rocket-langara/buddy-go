<template>
  <q-layout view="hHh lpR fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header bordered class="header">
      <q-toolbar>
        <q-toolbar-title>
          <img src="../assets/logo-top.svg">
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" behavior="mobile" elevated>
      <q-list>
        <q-item 
        clickable
        to="/MyAccount">
          <q-item-label>
            Account
          </q-item-label>
        </q-item>
      </q-list>

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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="chat-text-box">
      <q-toolbar>
        <q-input
        v-model="text"
        placeholder=""
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
export default {
  name: 'ChatLayout',
  data () {
    return {
      right: false
    }
  }
}
</script>
