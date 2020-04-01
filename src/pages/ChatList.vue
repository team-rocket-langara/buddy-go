<template>
  <q-page class="chat-list page">
    
    <!-- Chat List Search -->
    <q-input
    v-model="search"
    placeholder="Search"
    dense
    >      
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <!-- /Chat List Search -->

    <!-- Chat List Conversations -->
    <q-list>

        <q-item
        clickable
        :to="chatItem.roomUrl"
        v-for="chatItem in chatItems"
        v-bind:key="chatItem.id"
        >
        <q-item-section avatar>
          <q-avatar
          size="52px"
          >
            <q-img
            :src="chatItem.avatar"
            :ratio="1"
            placeholder-src="../assets/layout/placeholder_01.png"
            />
          </q-avatar>
        </q-item-section>
        
        <q-item-section>
          <q-item-label overline>{{ chatItem.name }}</q-item-label>
          <q-item-label caption>{{ lastMsgLimit(chatItem.lastMsg) }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
    <!-- /Chat List Conversations -->

    <q-scroll-area
    class="search-list"
    v-if="showSearchList === true && searchList.length > 0"
    >
      <q-item
      clickable      
      v-for="searchItem in searchList" v-bind:key="searchItem.id"
      :to="'/ChatRoom/' + searchItem[0]"
      >
        <q-item-section avatar>
          <q-avatar
          size="45px"
          >
            <q-img
            :src="searchItem[2]"
            :ratio="1"
            placeholder-src="../assets/layout/placeholder_01.png"
            />
          </q-avatar>
        </q-item-section>
        
        <q-item-section>
          <q-item-label overline>{{ searchItem[1] }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-scroll-area>

  </q-page>
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'

export default {
  name: 'ChatList',
  watch: {
    search: "searchUsers"
  },
  created() {
    this.genList()
  },
  mounted() {
    this.getUsers()
  },
  data() {
    return {
      chatItems: [],
      search: '',
      userList: [],
      showSearchList: false,
      searchList: []
    }
  },
  methods: {
    genList(){
      let currentUser = firebaseAuth.currentUser.uid
      firebaseDb.collection('have-chat').doc(currentUser).collection('with').get()
      .then(response => {
        response.forEach(doc => {
          firebaseDb.collection('users-info').doc(doc.id).get()
          .then(response => {
            const newObj = {
              name: response.data().name,
              roomUrl: '/ChatRoom/' + doc.id,
              lastMsg: this.lastMsgLimit(doc.data().msg),
              // !FOR REAL WORLD
              avatar: response.data().avatar
              // !FOR DEV
              // avatar: 'https://images.pexels.com/photos/3608618/pexels-photo-3608618.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
            }
            this.chatItems.push(newObj)
          })
        })
      })
      
    },
    
    lastMsgLimit(lastMsg){
      var limitMsg = '';
      var msgMax = lastMsg.length;

      if(lastMsg.length > 25){
        msgMax = 30;
      }

      for(var i = 0; i < msgMax; i++){
        limitMsg += lastMsg[i];
      }

      if(msgMax == 30){
        limitMsg += '...';
      }

      return limitMsg;
    },

    getUsers(){
      firebaseDb.collection('users-info').limit(50).get()
      .then(docs => {
        docs.forEach(doc => {

            // ! FOR REAL WORLD
            let user = doc.id + '*' + doc.data().name + '*' + doc.data().avatar

            // !FOR DEV
            // let user = doc.id + '*' + doc.data().name + '*' + 'https://images.pexels.com/photos/3608618/pexels-photo-3608618.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

            this.userList.push(user)

        })
      })
    },

    searchUsers(){
      let currentUser = firebaseAuth.currentUser.uid
      let a = this.userList
      let list = a.filter(item => item.toLowerCase().indexOf(this.search) > -1);
      if(this.search != ''){
        this.searchList = []
        list.forEach(user => {
          let newT = user.split('*')
          if(newT[0] != currentUser){
            this.searchList.push(newT)
          }
        })
        this.showSearchList = true
      } else {
        this.searchList = []
        this.showSearchList = false
      }
    }
  },

  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss">
.search-list{
  position: fixed;
  top: 150px;
  padding: 0 1rem;
  left: 0;
  right: 0;
  bottom: 20%;
  background: white;
  max-height: 70%;
  z-index: 9999;

  .q-item{
    margin-bottom: 1rem;
  }
}
</style>
