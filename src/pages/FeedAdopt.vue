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
      :src="postItem.postPicture"
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
              <q-item-label overline>{{ postItem.postName }}</q-item-label>
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

      <!-- Btn Area -->
      <div class="global-separator">
        <q-btn
        class="btn-small btn-purple btn-round"
        to="/AdoptProfile"
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
export default {
  name: 'FeedAdopt',
  data() {
    return {
      postItems: [
        {
          postName: 'Charlie',
          postTitle: "Hello, Buddies! Here I'm enjoying the summer. It would be great if you could be here with me!",
          postPicture: "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          postName: 'Charlie',
          postTitle: "Hello, Buddies! Here I'm enjoying the summer. It would be great if you could be here with me!",
          postPicture: "https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        }
      ]
    }
  }
}
</script>
