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
      
      <q-slide-item
      @right="onRight"
      v-for="chatItem in chatItems"
      v-bind:key="chatItem.id"
      >

        <template v-slot:right>
          <q-icon name="delete_forever" />
        </template>

        <q-item
        clickable
        :to="chatItem.userId"
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

      </q-slide-item>

    </q-list>
    <!-- /Chat List Conversations -->

    <q-scroll-area
    class="search-list"
    v-if="showSearchList === true && testList.length > 0"
    >
      <q-item
      clickable      
      v-for="testL in testList" v-bind:key="testL.id"
      :to="'/ChatRoom/' + testL[0]"
      >
        <q-item-section avatar>
          <q-avatar
          size="45px"
          >
            <q-img
            :src="testL[2]"
            :ratio="1"
            placeholder-src="../assets/layout/placeholder_01.png"
            />
          </q-avatar>
        </q-item-section>
        
        <q-item-section>
          <q-item-label overline>{{ testL[1] }}</q-item-label>
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
      testList: []
    }
  },
  methods: {
    genList(){
      let currentUser = firebaseAuth.currentUser.uid
      firebaseDb.collection('have-chat').doc(currentUser).collection('with').get()
      .then(docs => {
        docs.forEach(doc => {
          firebaseDb.collection('users-info').doc(doc.id).get()
          .then(response => {
            let newArr = {}
            newArr.name = response.data().name
            newArr.userId = '/ChatRoom/' + doc.id
            // !FOR DEV
            // newArr.avatar = doc.data().avatar
            // !FOR DEV
            newArr.lastMsg = 'Test'
            // !FOR DEV
            // this.chatItems.push(newArr)

            // !FOR REAL WORLD BEGIN
            var storageRef = firebase.storage().ref()
            var avatarImagesRef = storageRef.child(`avatars/${doc.id}`)      

            avatarImagesRef.getDownloadURL().then(url => {

              newArr.avatar = url

              this.chatItems.push(newArr)

            })
            .catch(err => {
              console.log(err)
            })
            // !FOR REAL WORLD END
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

    onRight ({ reset }) {
      this.$q.notify({
        position: 'top',
        caption: 'Chat Deleted',
        color: 'negative',
        timeout: 1000
      })
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    },

    getUsers(){
      firebaseDb.collection('users-info').get()
      .then(docs => {
        docs.forEach(doc => {

            // !FOR REAL WORLD BEGIN
            var storageRef = firebase.storage().ref()
            var avatarImagesRef = storageRef.child(`avatars/${doc.id}`)      

            avatarImagesRef.getDownloadURL().then(url => {
              
              let user = doc.id + '*' + doc.data().name + '*' + url

            this.userList.push(user)

            })
            .catch(err => {
              console.log(err)
            })
            // !FOR REAL WORLD END
        })
      })
    },

    searchUsers(){
      let currentUser = firebaseAuth.currentUser.uid
      let a = this.userList
      let list = a.filter(item => item.toLowerCase().indexOf(this.search) > -1);
      if(this.search != ''){
        this.testList = []
        list.forEach(user => {
          let newT = user.split('*')
          if(newT[0] != currentUser){
            this.testList.push(newT)
          }
        })
        this.showSearchList = true
      } else {
        this.testList = []
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
