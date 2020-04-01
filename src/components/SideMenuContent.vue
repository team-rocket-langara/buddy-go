<template>
  <q-layout>

    <!-- My Profile Btn -->
    <q-item
    class="absolute-top btn-my-profile"
    clickable
    @click="myProfile"
    >
      <!-- Drawer Avatar -->
      <q-avatar
      size="56px"
      class="q-mb-sm"
      >

        <q-img
        :src="userInfo.avatar"
        :ratio="1"
        placeholder-src="../assets/layout/placeholder_01.png"
        />

      </q-avatar>
      <!-- /Drawer Avatar -->

      <!-- My Profile Btn Label -->
      <div class="btn-my-profile-label">
        <p>{{ userInfo.name }}</p>
        <p>View Profile</p>
      </div>
      <!-- /My Profile Btn Label -->

    </q-item>
    <!-- /My Profile Btn -->

    <!-- Drawer List Menu -->
    <q-list>

      <q-item
      clickable
      to="/EditAccount">
        <q-item-label>
          Account
        </q-item-label>
      </q-item>

      <q-item
      clickable
      to="/MyAdopts">
        <q-item-label>
          Adopt Manager
        </q-item-label>
      </q-item>

    </q-list>
    <!-- /Drawer List Menu -->    

    <q-item
    clickable
    @click="logginOut()"
    class="btn-round btn-yellow btn-logout"
    >
      <q-item-label>
        Logout
      </q-item-label>
    </q-item>

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import VueRouter from 'vue-router'

export default {
  name: 'SideMenuContent',
  data(){
    return{
      id: firebaseAuth.currentUser.uid,
      myPic: ''
    }
  },
  methods: {

    logginOut() {

      navigator.notification.confirm(
        'Do you want to Log out?', // message
        this.confirmLog, // callback
        'Logout', // title
      );

    },

    confirmLog(button){
      if(button == 1){
        firebaseAuth.signOut()
        .then((response) => {
          this.$router.push({
            path: '/'
          })
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(`logOut() -> Code: ${errorCode} -- ${errorMessage}`);
        })
      }
    },

    myProfile(){
      this.$router.push({ path: '/UserProfile/' + this.id })
    }
  },
  computed: {
    userInfo(){
      return this.$store.getters['user/getUserInfo']
    }
  }
}
</script>
