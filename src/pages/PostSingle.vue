<template>
  <q-page>

      <div class="feed-item">

        <header>
            <div class="feed-item-avatar">
              <q-btn to="/ProfilePage">
                <q-img src="https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" :ratio="1" />
              </q-btn>                 
            </div>
            <div class="feed-item-info">
                <q-item clickable to="/ProfilePage">
                    <q-item-label>Lorem.</q-item-label>
                </q-item>
                <p>Stanley Park</p>
            </div>
        </header>

        <div class="feed-item-title">
          <h1>Hello, Buddies! Here I'm enjoying the summer. It would be great if you could be here with me!</h1>
        </div>

        <div class="feed-item-pic">
          <q-img src="https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" :ratio="1" />
        </div>

        <div class="feed-item-btns">
          <span class="btn-like">
            <img src="~assets/paw-like.svg">
            <span class="like-counter">00</span>
          </span>
          <span class="btn-msg">
            <img src="~assets/message-feed.svg">
            <span class="msg-counter">00</span>
          </span>
        </div>

    </div>

    <div class="comment-area">
        <ul>
          <li>
            <a href="#/ProfilePage">Charlie</a> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde officiis repudiandae repellendus enim sit esse, totam modi sed asperiores. Sequi, saepe ea eaque recusandae alias dolore. Aliquam illum quas reprehenderit!
          </li>
          <li>
            <a href="#/ProfilePage">Charlie</a> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde officiis repudiandae repellendus enim sit esse, totam modi sed asperiores. Sequi, saepe ea eaque recusandae alias dolore. Aliquam illum quas reprehenderit!
          </li>
        </ul>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'PostSingle'
}
</script>
