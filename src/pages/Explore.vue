<template>
  <q-layout>
    <ul>
      <li v-for="user in users" v-bind:key="user.id">
        <q-btn
        :to="user.userUrl"
        :label="user.userName"
        />
      </li>
    </ul>
  </q-layout>
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"

export default {
  name: 'Explore',
  created(){
    this.genList()
  },
  data(){
    return {
      users: []
    }
  },
  methods: {
    genList(){
      firebaseDb.collection('users-info').get()
      .then(docs => {
        docs.forEach(doc => {
          let newArr = {
            userUrl: '/UserProfile/' + doc.id,
            userName: doc.data().name
          }
          this.users.push(newArr)
        })
      })
    }
  }
}
</script>
