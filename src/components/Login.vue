<script setup>

  import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';

  const router = useRouter();

  const { user, authtoken } = storeToRefs(useUserStore());
  const {loginUser} = useUserStore();
  console.log("hi")

  const routeToHome = () => router.push("/");


  const login = async (e) => {
    e.preventDefault();
    try {
      const data =  await loginUser(user.value);
      data?.token && routeToHome();
      // user.value = {};
    } catch(err) {
      console.error("login error", err);
    }
  }

  onMounted(() => {
    if(Object.keys(user.value).length && authtoken.value) {
      routeToHome();
    }
  })
</script>

<style scoped>
  .login-container {
    position: absolute;
    top: 40vh;
    transform: translateY(-50%);
  }
</style>

<template>
  <section class="login-container">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
          alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form @submit="login" >

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input v-model="user.email" type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" />
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <input v-model="user.password" type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" />
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <router-link to="/forgot-password" class="text-body">Forgot password?</router-link>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <router-link to="/register"
                class="link-danger">Register</router-link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>

</template>