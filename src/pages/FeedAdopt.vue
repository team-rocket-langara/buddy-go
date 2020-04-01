<template>
  <q-page class="post-list adopt-page page">

    <div class="adopt-page-name">
      <p class="adopt-page-title">Be my buddy!</p>
      <p class="adopt-page-subtitle">Some of us were rescued and are looking for a new home.</p>
    </div>

    <!-- Post Item -->
    <div v-for="postItem in postItems" v-bind:key="postItem.id" class="post-list-item">

      <!-- Post Item Pic -->
      <q-img
      :src="postItem.picture"
      ratio="1"
      />
      <!-- /Post Item Pic -->

      <!-- Post Header -->
      <header>

        <!-- Post Item Info -->
        <div class="post-list-info">
          <q-item
          clickable
          to="/UserProfile"
          >
            <q-item-section>
              <q-item-label overline>{{ postItem.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>{{ postItem.desc }}</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Btn Area -->
      <div class="global-separator">
        <q-btn
        class="btn-small btn-purple btn-round"
        :to="'/AdoptProfile/' + postItem.id"
        >
        Details
        </q-btn>
      </div>
      <!-- /Btn Area -->

    </div>
    <!-- /Post Item -->

  </q-page>
</template>

<script>
import { firebaseDb } from '../boot/firebase'
export default {
  name: 'FeedAdopt',
  data() {
    return {
      postItems: []
    }
  },
  methods: {
    getAdoptPosts(){
      firebaseDb.collection('adopt-feed').orderBy('timestamp').get()
      .then(docs => {
        docs.forEach(doc => {
          let newObj = {
            name: doc.data().name,
            picture: doc.data().picture,
            desc: this.lastMsgLimit(doc.data().desc),
            id: doc.id
          }

          this.postItems.push(newObj);
        })
      })
      .catch(err => {
        console.log(err)
      })
    },

    lastMsgLimit(lastMsg){
      var limitMsg = '';
      var msgMax = lastMsg.length;

      if(lastMsg.length > 100){
        msgMax = 100;
      }

      for(var i = 0; i < msgMax; i++){
        limitMsg += lastMsg[i];
      }

      if(msgMax == 100){
        limitMsg += '...';
      }

      return limitMsg;
    }
  },
  created(){
    this.getAdoptPosts()
  }
}
</script>
