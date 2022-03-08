<script setup>
  import { useUserStore } from '../stores/user';

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Basket from './Basket.vue';

  defineProps(['isUserLoggedIn'])

  const projectName = "Online Cake shop";

  const userStore = useUserStore();

  const search = ref("");
  const router = useRouter();
  const searchByText = (e) => {
    e.preventDefault();
    router.push({
      path: '/search',
      query: {
        q: search.value
      }
    })
  }

  const logout = async () => {
    await userStore.logoutUser();
    localStorage.clear();
    window.location.href ="/";
  }
</script>


<style>
</style>

<template>
<div class="mb-5 mx-auto">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <router-link class="navbar-brand" to="/">{{projectName}}</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" to="/add-cake">Add Cake</router-link>
        </li>
      </ul>
      <form class="d-flex"> 
        <input v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success me-2" @click="searchByText" type="submit">Search</button>
        <Basket />
        <router-link v-if="!isUserLoggedIn" class="btn btn-primary" to="/login">Login</router-link> 
        <button type="button" v-if="isUserLoggedIn" class="btn btn-danger" @click="logout">Logout</button>
      </form>
    </div>
  </div>
</nav></div>
</template>