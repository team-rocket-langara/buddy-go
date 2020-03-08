<template>
  <q-page class="user-profile">
    
    <!-- User Info -->
    <div class="user-profile-info">

      <!-- User Avatar -->
      <q-avatar
      size="72px"
      >

        <q-img
        src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        :ratio="1"
        />

      </q-avatar>
      <!-- /User Avatar -->

      <!-- User Name & Info -->
      <div class="user-profile-name">
        <q-item>
          <q-item-section>
            <q-item-label overline>Charlie</q-item-label>
            <q-item-label caption>000 Followers &bull; 000 Following</q-item-label>

            <q-list>

              <q-item
              clickable
              to="/AboutMe"
              class="btn-text"
              >
                <q-item-label>
                  About Me
                </q-item-label>
              </q-item>

              &bull;

              <q-item
              clickable
              to="/LINK-HERE"
              class="btn-text"
              >
                <q-item-label>
                  Edit Profile
                </q-item-label>
              </q-item>

            </q-list>

          </q-item-section>
        </q-item>
      </div>
      <!-- User Name & Info -->

    </div>
    <!-- /User Info -->

    <!-- Btn Follow Area -->
    <div class="global-separator">
      <q-btn
      class="btn-small btn-purple btn-round"
      >
      Follow
      </q-btn>
    </div>
    <!-- /Btn Follow Area -->

    <!-- Picture Tiles -->
    <div class="picture-tiles-wrapper">
      <q-btn
      class="btn-picture"
      to="/SinglePost"
      >
        <q-img
        src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        :ratio="1"
        />
      </q-btn>
    </div>
    <!-- /Picture Tiles -->

  </q-page>
</template>

<script>
export default {
  name: 'UserProfile',
}
</script>
