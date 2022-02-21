<script setup>
import { onMounted, ref } from 'vue';

import Navbar from './components/NavBar.vue'
import Carousal from './components/Carousal.vue';
import CakeCard from './components/CakeCard.vue';
import Login from './components/Login.vue';
import Divider from './components/Divider.vue';

import Users from './components/Users.vue';

// import mock data
// import cakes from "./_db/cakes.json"
import { getCakes } from "./_services/cakeService";
import Register from './components/Register.vue';

const cakes = ref([]);

const fetchCakes = () =>  {
  return getCakes().then(res => cakes.value = res.data?.data, err => {
    console.error(err);
  });
}


const isUserLoggedIn = ref(false);

onMounted(() => {
  // fetchCakes();
});

</script>

<template>
  <header>
    <Navbar :isUserLoggedIn="isUserLoggedIn" />
  </header>

  <main>
    <div class="container">
      <!-- Register -->
      <!-- <Register /> -->

      <!-- Login -->
      <Login />

      <!-- <Carousal /> -->
      <Divider />

      <!-- <div class="row">
        Cake listing 
        <CakeCard v-for="cake in cakes" :key="cake.name" :cake="cake" />
      </div> -->

      <!-- user listing -->
      <!-- <Users /> -->
    </div>
  </main>
  
</template>

<style>
@import './assets/base.css';

</style>
