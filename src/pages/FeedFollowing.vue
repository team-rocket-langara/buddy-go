<template>
  <q-page class="post-list">

    <!-- Post Item -->
    <div v-for="postItem in postItems" v-bind:key="postItem.id" class="post-list-item">

      <!-- Post Header -->
      <header>

        <!-- Post Item Avatar -->
        <q-btn
        to="/UserProfile"
        :ripple="false"
        >

          <q-avatar
          size="48px"
          >

            <q-img
            :src="postItem.postAvatar"
            :ratio="1"
            />

          </q-avatar>

        </q-btn>
        <!-- /Post Item Avatar -->

        <!-- Post Item Info -->
        <div class="post-list-info">
          <q-item
          clickable
          to="/UserProfile"
          >
            <q-item-section>
              <q-item-label overline>{{ postItem.postName }}</q-item-label>
              <q-item-label caption>{{ postItem.postCheckIn }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>{{ postItem.postTitle }}</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Post Item Pic -->
      <q-img
      :src="postItem.postPicture"
      ratio="1"
      />
      <!-- /Post Item Pic -->

      <!-- Post Item Btns -->
      <div class="post-list-social">
        <q-btn
        class="btn-social"
        >
          <img src="../assets/layout/paw-icon.svg">
        </q-btn>
        <p class="counter">{{ postItem.postLike }}</p>
        <q-btn
        class="btn-social"
        to="/SinglePost"
        >
          <img src="../assets/layout/comments-icon.svg">
        </q-btn>
        <p class="counter">{{ postItem.postComments }}</p>
      </div>
      <!-- /Post Item Btns -->

    </div>
    <!-- /Post Item -->

  </q-page>
</template>

<script>
export default {
  name: 'FeedFollowing',
  data() {
    return {
      postItems: [
        {
          postAvatar: 'https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          postName: 'Charlie',
          postCheckIn: 'Stanley Park',
          postTitle: "Hello, Buddies! Here I'm enjoying the summer. It would be great if you could be here with me!",
          postPicture: "https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
          postLike: '25',
          postComments: '38'
        },
        {
          postAvatar: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          postName: 'Lorie',
          postCheckIn: 'Trout Lake Park',
          postTitle: "Happy vibes!",
          postPicture: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          postLike: '12',
          postComments: '25'
        }
      ]
    }
  }
}
</script>
