<template>
  <q-page>
      <div class="feed-item">
        <header>
          <div class="feed-item-avatar">
            <q-item clickable to="/ProfilePage">
                <img src="../assets/avatar.jpg" alt="">
            </q-item>            
          </div>
          <div class="feed-item-info">
              <q-item clickable to="/ProfilePage">
                  <q-label>Lorem.</q-label>
              </q-item>
              <p>0.8km</p>
          </div>
        </header>
        <div class="feed-item-pic">
          <img src="../assets/picture.jpg">
        </div>
        <div class="feed-item-btns">
          <span class="btn-like">
            <img src="../assets/paw-like.svg">
            <span class="like-counter">00</span>
          </span>
          <span class="btn-msg">
            <img src="../assets/message-feed.svg">
            <span class="msg-counter">00</span>
          </span>
        </div>
        <div class="feed-item-title">
          <h1>Lorem, ipsum dolor.</h1>
        </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'FeedFollowing'
}
</script>
