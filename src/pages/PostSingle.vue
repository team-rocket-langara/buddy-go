<template>
  <q-page>
      <div class="feed-item">
        <header>
            <div class="feed-item-avatar">
                <q-item clickable to="/profile">
                    <img src="../assets/avatar.jpg" alt="">
                </q-item>            
            </div>
            <div class="feed-item-info">
                <q-item clickable to="/profile">
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
            <img src="../assets/message.svg">
            <span class="msg-counter">00</span>
          </span>
        </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PostSingle'
}
</script>
