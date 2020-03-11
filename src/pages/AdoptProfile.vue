<template>
  <q-page>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      infinite
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide :name="1">
        <q-img
        src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        ratio="1" />
      </q-carousel-slide>
      <q-carousel-slide :name="2">
        <q-img
        src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        ratio="1" />
      </q-carousel-slide>
      <q-carousel-slide :name="3">
        <q-img
        src="https://images.pexels.com/photos/434090/pexels-photo-434090.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        ratio="1" />
      </q-carousel-slide>
      <q-carousel-slide :name="4">
        <q-img
        src="https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        ratio="1" />
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
export default {
  name: 'PageName',
  data () {
    return {
      slide: 1
    }
  }
}
</script>
