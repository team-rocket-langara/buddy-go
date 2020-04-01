<template>
  <q-layout class="explore">

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

    <!-- Picture Tiles -->
    <div class="picture-tiles-wrapper">
      <q-btn
      class="btn-picture"
      v-for="postItem in postsList" v-bind:key="postItem.id"
      :to="postItem.postUrl"
      >
        <q-img
        :src="postItem.picture"
        :ratio="1"
        placeholder-src="../assets/layout/placeholder_01.png"
        />
      </q-btn>
    </div>
    <!-- /Picture Tiles -->

    <q-scroll-area
    class="search-list"
    v-if="showSearchList === true && searchList.length > 0"
    >
      <q-item
      clickable      
      v-for="searchItem in searchList" v-bind:key="searchItem.id"
      :to="'/UserProfile/' + searchItem[0]"
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

  </q-layout>
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"

export default {
  name: 'Explore',
  watch: {
    search: "searchUsers"
  },
  created(){
    this.genList()
  },
  mounted() {
    this.getUsers()
  },
  data(){
    return {
      postsList: [],
      search: '',
      userList: [],
      showSearchList: false,
      searchList: []
    }
  },
  methods: {
    genList(){

      firebaseDb.collection('posts-feed').limit(30).get()
      .then(response => {
        response.forEach(doc => {
          let newObj = {
            postUrl: '/SinglePost/' + doc.id + '/' + doc.data().user,
            picture: doc.data().picture
          }
          this.postsList.push(newObj)
        })
      })
      
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
  }
}
</script>

<style lang="scss" scoped>
@import '../css/palette';

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

.picture-tiles{

  &-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .btn-picture{
      width: calc(20% - .1rem);
      margin-bottom: .1rem;
      margin-right: .1rem;

      &:nth-child(5n){
        margin-right: 0;
      }
    }
  }
}
</style>
