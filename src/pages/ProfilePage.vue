<template>
  <q-page>
    
    <header class="profile-header">
        <div class="profile-avatar">
            <q-img src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" :ratio="1" />
        </div>
        <div class="profile-info">
            <h1>Lorem.</h1>
            <p>000 Followers &bull; 000 Following</p>
            <q-item
            clickable
            to="/AboutMe"
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
      <q-btn to="/PostSingle">
        <q-img src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" :ratio="1" />
      </q-btn>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'ProfilePage'
   }
</script>
