<template>
  <q-page>
    <p class="adopt-page-title">Be my buddy!</p>
    <p class="adopt-page-subtitle">Some of us were rescued and are looking for a new home.</p>

    <!-- Adopt Item -->
    <div v-for="AdoptItem in AdoptItems" v-bind:key="AdoptItem.id" class="adopt-item">

      <!-- Adopt Header -->
      <header>

        <!-- Adopt Item Info -->
        <div class="adopt-item-info">
          <q-item clickable to="/ProfilePage">
            <q-item-label>{{ AdoptItem.AdoptName }}</q-item-label>
          </q-item>
        </div>
        <!-- /Adopt Item Info -->

      </header>
      <!-- /Adopt Header -->

      <!-- Adopt Item Pic -->
      <div class="adopt-item-pic">
        <q-img 
        :src="AdoptItem.AdoptPicture"
        :ratio="1"
        />
      </div>
      <!-- /Adopt Item Pic -->

      <!-- Adopt Item Title -->
      <div class="adopt-item-title">
        <h1>{{ AdoptItem.AdoptTitle }}</h1>
      </div>
      <!-- /Adopt Item Title -->

    </div>
    <!-- /Adopt Item -->
  </q-page>
</template>

<script>
export default {
  name: 'AdoptPage',
  data() {
    return {
      AdoptItems: [
        {
          AdoptName: 'Charlie',
          AdoptTitle: "I'm very cute and very friendly, don't you want to be my friend?",
          AdoptPicture: "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          AdoptName: 'Scott, Princess and Nala',
          AdoptTitle: "We are looking for a new friend that can play with us!",
          AdoptPicture: "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        }
      ]
    }
  }
}
</script>
