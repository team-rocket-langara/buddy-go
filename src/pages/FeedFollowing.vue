<template>
  <q-page>
    <!-- Feed Item -->
    <div v-for="feedItem in feedItems" v-bind:key="feedItem.id" class="feed-item">

      <!-- Feed Header -->
      <header>

        <!-- Feed Item Avatar -->
        <div class="feed-item-avatar">
          <q-btn to="/ProfilePage">
              <q-img
              :src="feedItem.feedAvatar"
              :ratio="1"
              />
          </q-btn>            
        </div>
        <!-- /Feed Item Avatar -->

        <!-- Feed Item Info -->
        <div class="feed-item-info">
            <q-item clickable to="/ProfilePage">
                <q-item-label>{{ feedItem.feedName }}</q-item-label>
            </q-item>
            <p>{{ feedItem.feedCheckIn }}</p>
        </div>
        <!-- /Feed Item Info -->

      </header>
      <!-- /Feed Header -->

      <!-- Feed Item Title -->
      <div class="feed-item-title">
        <h1>{{ feedItem.feedTitle }}</h1>
      </div>
      <!-- /Feed Item Title -->

      <!-- Feed Item Pic -->
      <div class="feed-item-pic">
        <q-img 
        :src="feedItem.feedPicture"
        :ratio="1"
        />
      </div>
      <!-- /Feed Item Pic -->

      <!-- Feed Item Btns -->
      <div class="feed-item-btns">
        <span class="btn-like">
          <img src="~assets/paw-like.svg">
          <span class="like-counter">{{ feedItem.feedLike }}</span>
        </span>
        <span class="btn-msg">
          <img src="~assets/message-feed.svg">
          <span class="msg-counter">{{ feedItem.feedComments }}</span>
        </span>
      </div>
      <!-- /Feed Item Btns -->

    </div>
    <!-- /Feed Item -->
  </q-page>
</template>

<script>
export default {
  name: 'FeedFollowing',
  data() {
    return {
      feedItems: [
        {
          feedAvatar: 'https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          feedName: 'Charlie',
          feedCheckIn: 'Stanley Park',
          feedTitle: "Hello, Buddies! Here I'm enjoying the summer. It would be great if you could be here with me!",
          feedPicture: "https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
          feedLike: '25',
          feedComments: '38'
        },
        {
          feedAvatar: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          feedName: 'Lorie',
          feedCheckIn: 'Trout Lake Park',
          feedTitle: "Happy vibes!",
          feedPicture: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          feedLike: '12',
          feedComments: '25'
        }
      ]
    }
  }
}
</script>
