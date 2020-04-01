<template>
  <!-- Q Toolbar -->
  <q-toolbar>

    <!-- Btn Home -->
    <q-item
    clickable
    to="/FeedFollowing"
    class="btn-home"
    exact
    >
      <q-item-label>
        Feed
      </q-item-label>
    </q-item>
    <!-- /Btn Home -->

    <!-- Btn Map -->
    <q-item
    clickable
    to="/Explore"
    class="btn-map"
    exact
    >
      <q-item-label>
        Find
      </q-item-label>
    </q-item>
    <!-- /Btn Map -->

    <!-- Btn Camera -->
    <q-item
    clickable
    to="/Camera"
    class="btn-camera"
    exact
    >
      <q-item-label>
        Post
      </q-item-label>
    </q-item>
    <!-- /Btn Camera -->

    <!-- Btn Adopt -->
    <q-item
    clickable
    to="/FeedAdopt"
    class="btn-adopt"
    exact
    >
      <q-item-label>
        Adopt
      </q-item-label>
    </q-item>
    <!-- /Btn Adopt -->

    <!-- Btn Chat -->
    <q-item
    clickable
    to="/ChatList"
    class="btn-chat"
    exact
    >
      <q-item-label>
        Chat
      </q-item-label>
    </q-item>
    <!-- /Btn Chat -->        

  </q-toolbar>
  <!-- /Q Toolbar -->
</template>

<script>
export default {
  name: 'BottomMenuContent',
}
</script>