<template>
  <q-layout>

    <!-- My Profile Btn -->
    <q-item
    class="absolute-top btn-my-profile"
    clickable
    to="/UserProfile"
    >
      <!-- Drawer Avatar -->
      <q-avatar
      size="56px"
      class="q-mb-sm"
      >

        <q-img
        src="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        :ratio="1"
        />

      </q-avatar>
      <!-- /Drawer Avatar -->

      <!-- My Profile Btn Label -->
      <div class="btn-my-profile-label">
        <p>Razvan Stoenescu</p>
        <p>View Profile</p>
      </div>
      <!-- /My Profile Btn Label -->

    </q-item>
    <!-- /My Profile Btn -->

    <!-- Drawer List Menu -->
    <q-list>

      <q-item>
        <q-item-label>
          Account
        </q-item-label>
      </q-item>

      <q-item
      clickable
      @click="logginOut()"
      >
        <q-item-label>
          Logout
        </q-item-label>
      </q-item>

    </q-list>
    <!-- /Drawer List Menu -->

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SideMenuContent',
  methods: {
    ...mapActions('login', ['logOut']),
    logginOut() {
      this.logOut()
    }
  }
}
</script>
