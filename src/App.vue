<script setup>
import { onMounted, onUpdated, ref, watch } from 'vue';

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
import { getToken } from './_services/authService';
import { useRouter } from 'vue-router';
import { useUserStore } from './stores/user';
import { storeToRefs } from 'pinia';

const cakes = ref([]);
const router = useRouter();

const fetchCakes = () =>  {
  return getCakes().then(res => cakes.value = res.data?.data, err => {
    console.error(err);
  });
}

const { user, authtoken } = storeToRefs(useUserStore());

const isUserLoggedIn = authtoken;

// router.beforeEach((to, from, next) => {
//   console.log("before route");
//   // isUserLoggedIn.value = getToken();
//   isUserLoggedIn.value = useUserStore().user?.token;
//   next();
// });

// onUpdated(() => {
//   // isUserLoggedIn.value = getToken();
//   isUserLoggedIn.value = useUserStore().user?.token;
// });


</script>

<template>
  <header v-if="isUserLoggedIn">
    <Navbar :isUserLoggedIn="isUserLoggedIn" />
  </header>

  <main>
      <div class="container-xxl">
        <router-view></router-view>
      </div>
  </main>
  
</template>

<style>
@import './assets/base.css';

</style>
