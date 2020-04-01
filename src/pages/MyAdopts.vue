<template>
  <q-page class="chat-list page">

    <q-btn
    class="btn-purple btn-big btn-round btn-this"
    label="Create a Post"
    to="/PostAdopt"
    />

    <!-- Chat List Conversations -->
    <q-list>

      <q-item
      v-for="item in list"
      v-bind:key="item.id"
      clickable
      :to="item.url"
      class="this-adopt"
      >
        <q-item-section avatar>
          <q-avatar
          size="52px"
          >
            <q-img
            :src="item.picture"
            :ratio="1"
            placeholder-src="../assets/layout/placeholder_01.png"
            />
          </q-avatar>
        </q-item-section>
        
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
    <!-- /Chat List Conversations -->

  </q-page>
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'

export default {
  name: 'MyAdopts',
  data() {
    return {
      list: []
    }
  },
  methods: {
    getAdopts(){
      let userId = firebaseAuth.currentUser.uid
      firebaseDb.collection('adopt-feed').where('userId', '==', userId).get()
      .then(response => {
        response.forEach(doc => {
          let newObj = {
            url: '/AdoptProfile/' + doc.id,
            name: doc.data().name,
            picture: doc.data().picture
          }
          this.list.push(newObj)
        })
      })
    }
  },
  mounted() {
    this.getAdopts()
  }
}
</script>

<style lang="scss">
.btn-this{
  margin-left: 18%;
  margin-top: 2rem;
}

.this-adopt{
  margin-top: .5rem;
  padding-bottom: .5rem;
}
</style>