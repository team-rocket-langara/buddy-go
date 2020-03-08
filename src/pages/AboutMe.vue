<template>
  <q-layout class="about-me">

    <q-btn class="btn-back" flat @click="$router.go(-1)">
      <img src="../assets/layout/arrow-icon.svg">
    </q-btn>

    <q-img
    src="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    :ratio="1" 
    />

    <h1>Charlie</h1>
    <h2>000 followers &bull; 000 following</h2>
    
    <ul>
      <li><span>Breed:</span> Labrador</li>
      <li><span>Gender:</span> Male</li>
      <li><span>Birthday:</span> Aug 1 2010</li>
      <li><span>Favourite Food:</span> Beef and Pumpkin</li>
      <li><span>Favourite Toy:</span> Pink Rubber Bat</li>
      <li><span>Hometown:</span> Vancouver</li>
      <li><span>Bio:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste vel nostrum inventore quos natus laudantium culpa quas expedita nesciunt atque.</li>
    </ul>

  </q-layout>
</template>

<script>
export default {
  name: 'AboutMe',
}
</script>
