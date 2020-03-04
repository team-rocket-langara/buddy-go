<template>
  <q-page>
    <header class="profile-header">
        <div class="profile-avatar">
            <img src="../assets/avatar.jpg">
        </div>
        <div class="profile-info">
            <h1>Lorem.</h1>
            <p>000 Followers &bull; 000 Following</p>
            <q-item
            clickable
            to="/about"
            class="btn-about"
            >
              <q-item-label>
                About me
              </q-item-label>
            </q-item>
        </div>
    </header>
    <div class="follow-area">
      <q-btn>
        Follow
      </q-btn>
    </div>
    <div class="profile-feed">
      <q-item
      clickable
      to="/postsingle"
      >
        <q-item-label>
          <img src="../assets/picture.jpg">
        </q-item-label>
      </q-item>
      <q-item
      clickable
      to="/postsingle"
      >
        <q-item-label>
          <img src="../assets/picture.jpg">
        </q-item-label>
      </q-item>
      <q-item
      clickable
      to="/postsingle"
      >
        <q-item-label>
          <img src="../assets/picture.jpg">
        </q-item-label>
      </q-item>
      <q-item
      clickable
      to="/postsingle"
      >
        <q-item-label>
          <img src="../assets/picture.jpg">
        </q-item-label>
      </q-item>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ProfilePage'
   }
</script>
