<script setup>
  import { onMounted } from 'vue';
  import { logout } from '../_services/authService';

  defineProps(['isUserLoggedIn'])

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
import { getToken } from '../_services/authService';

  const projectName = "Online Cake shop";

  const search = ref("");
  const router = useRouter();

  const searchByText = (e) => {
    e.preventDefault();
    router.push({
      path: 'search',
      query: {
        q: search.value
      }
    })
  }

  const logoutUser = async () => {
    await logout();
    router.push("/login");
  }
</script>


<style>
</style>

<template>
<div class="mb-5">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">{{projectName}}</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!-- <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> -->
        <li class="nav-item">
          <router-link class="nav-link active" to="/add-cake">Add Cake</router-link>
        </li>
        <!-- <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> -->
      </ul>
      <form class="d-flex"> 
        <input v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success me-2" @click="searchByText" type="submit">Search</button> <!-- @click="joinMeeting" -->
        <router-link v-if="!isUserLoggedIn" class="btn btn-primary" to="/login">Login</router-link> <!-- @click="joinMeeting" -->
        <button type="button" v-if="isUserLoggedIn" class="btn btn-danger" @click="logoutUser">Logout</button> <!-- @click="joinMeeting" -->
      </form>
    </div>
  </div>
</nav></div>
</template>