<script setup>
import Navbar from './components/NavBar.vue'
import Carousal from './components/Carousal.vue';
import CakeCard from './components/CakeCard.vue';
import Login from './components/Login.vue';
import Divider from './components/Divider.vue';

// import mock data
import cakes from "./_db/cakes.json"

import { ref } from 'vue';
import Users from './components/Users.vue';

const isUserLoggedIn = ref(false);

</script>

<template>
  <header>
    <Navbar :isUserLoggedIn="isUserLoggedIn" />
  </header>

  <main>
    <div class="container">
      <!-- <Login /> -->

      <!-- <Carousal /> -->
      <Divider />

      <!-- <div class="row">
        Cake listing 
        <CakeCard v-for="cake in cakes" :key="cake.name" :cake="cake" />
      </div> -->

      <!-- user listing -->
      <Users />
    </div>
  </main>
  
</template>

<style>
@import './assets/base.css';

</style>
