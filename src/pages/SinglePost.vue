<template>
  <q-page class="post-list">

    <!-- Post Item -->
    <div class="post-list-item">

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
            src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
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
              <q-item-label overline>Charlie</q-item-label>
              <q-item-label caption>Stanley Park</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- /Post Item Info -->

      </header>
      <!-- /Post Header -->

      <!-- Post Item Title -->
      <div class="post-list-title">
        <h1>Hello, Buddies! Here I'm enjoying the summer. It would be great if you could be here with me!</h1>
      </div>
      <!-- /Post Item Title -->

      <!-- Post Item Pic -->
      <q-img
      src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
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
        <p class="counter">00</p>
      </div>
      <!-- /Post Item Btns -->

      <!-- Post Item Comments -->
      <div class="post-list-comments-wrapper">
        <ul>
          <li>
            <span class="name">Charlie:</span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae repellat blanditiis tenetur esse, pariatur asperiores similique repellendus, quidem doloremque praesentium maxime molestias!
            <br>
            <span class="date">Aug 1, 2020 00:00</span>
          </li>
          <li>
            <span class="name">Charlie:</span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae repellat blanditiis tenetur esse, pariatur asperiores similique repellendus, quidem doloremque praesentium maxime molestias!
            <br>
            <span class="date">Aug 1, 2020 00:00</span>
          </li>
        </ul>
      </div>
      <!-- /Post Item Comments -->

    </div>
    <!-- /Post Item -->

  </q-page>
</template>

<script>
export default {
  name: 'SinglePost',
}
</script>
