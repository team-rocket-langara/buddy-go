<template>
  <div>

    <q-list>

      <q-item 
      clickable
      to="/MyAccount">

        <q-item-label>
          Account
        </q-item-label>

      </q-item>

    </q-list>

      <q-item
        clickable
        to="/MyProfile"
        class="profile-btn-area"
      >

      <div class="absolute-top avatar-area">

        <q-avatar size="56px" class="q-mb-sm">
          <q-img src="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" :ratio="1" />
        </q-avatar>

        <div class="user-name">
          <p>Razvan Stoenescu</p>
          <p>View Profile</p>
        </div>

      </div>

    </q-item>

  </div>
</template>

<script>
export default {
  name: 'SideMenuContent'
}
</script>
